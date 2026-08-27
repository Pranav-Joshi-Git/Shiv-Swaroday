import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import mermaid from 'mermaid'
import './style.css'

const SidebarToggle = defineComponent({
  setup() {
    const collapsed = ref(false)

    onMounted(() => {
      collapsed.value = localStorage.getItem('sidebar-collapsed') === 'true'
      document.body.classList.toggle('sidebar-collapsed', collapsed.value)
    })

    const toggleSidebar = () => {
      collapsed.value = !collapsed.value
      document.body.classList.toggle('sidebar-collapsed', collapsed.value)
      localStorage.setItem('sidebar-collapsed', `${collapsed.value}`)
    }

    return () => h(
      'button',
      {
        type: 'button',
        class: ['sidebar-toggle-button', collapsed.value ? 'is-collapsed' : ''],
        'aria-label': collapsed.value ? 'Show navigation' : 'Hide navigation',
        'aria-pressed': `${collapsed.value}`,
        onClick: toggleSidebar
      },
      h(
        'svg',
        {
          viewBox: '-0.5 -0.5 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          height: '16',
          width: '16',
          'aria-hidden': 'true'
        },
        [
          h('path', {
            d: 'M12.7769375 14.284625H2.2230625c-0.8326875 0 -1.5076875 -0.675 -1.5076875 -1.5076875l0 -10.553875c0 -0.8326875 0.675 -1.5076875 1.5076875 -1.5076875h10.553875c0.8326875 0 1.5076875 0.675 1.5076875 1.5076875v10.553875c0 0.8326875 -0.675 1.5076875 -1.5076875 1.5076875Z',
            stroke: 'currentColor',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '1'
          }),
          h('path', {
            d: 'M3.9192500000000003 5.9923125 2.6 7.5l1.3192499999999998 1.5076875',
            stroke: 'currentColor',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '1'
          }),
          h('path', {
            d: 'M5.615375 14.284625V0.7153750000000001',
            stroke: 'currentColor',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '1'
          })
        ]
      )
    )
  }
})

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(SidebarToggle)
    })
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const setupMermaidFullscreen = () => {
      document.querySelectorAll<HTMLElement>('.mermaid').forEach((diagram) => {
        if (diagram.dataset.viewerReady === 'true') return

        const svg = diagram.querySelector<SVGSVGElement>('svg')
        if (!svg) return

        diagram.dataset.viewerReady = 'true'

        const shell = document.createElement('div')
        shell.className = 'mermaid-viewer-shell'

        const openButton = document.createElement('button')
        openButton.type = 'button'
        openButton.className = 'mermaid-viewer-open'
        openButton.textContent = 'Fullscreen'
        openButton.setAttribute('aria-label', 'Open diagram fullscreen')

        const openViewer = () => {
          const overlay = document.createElement('div')
          overlay.className = 'mermaid-fullscreen'
          overlay.setAttribute('role', 'dialog')
          overlay.setAttribute('aria-modal', 'true')

          const toolbar = document.createElement('div')
          toolbar.className = 'mermaid-fullscreen-toolbar'

          const viewport = document.createElement('div')
          viewport.className = 'mermaid-fullscreen-viewport'

          const clone = svg.cloneNode(true) as SVGSVGElement
          const rect = svg.getBoundingClientRect()
          const baseWidth = svg.viewBox.baseVal.width || rect.width
          const baseHeight = svg.viewBox.baseVal.height || rect.height
          let scale = 1

          const centerDiagram = () => {
            requestAnimationFrame(() => {
              viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2)
              viewport.scrollTop = 0
            })
          }

          const updateScale = () => {
            clone.style.width = `${baseWidth * scale}px`
            clone.style.height = `${baseHeight * scale}px`
            viewport.dataset.zoom = `${Math.round(scale * 100)}%`
          }

          const closeViewer = () => {
            document.removeEventListener('keydown', handleKeydown)
            overlay.remove()
          }

          const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeViewer()
          }

          clone.querySelectorAll('a').forEach((link) => {
            const href = link.getAttribute('href') || link.getAttribute('xlink:href')
            if (!href) return

            link.addEventListener('click', (event) => {
              event.preventDefault()
              closeViewer()

              if (href.startsWith('/')) {
                router.go(href)
                return
              }

              window.location.href = href
            })
          })

          const controls = [
            { label: '+', title: 'Zoom in', action: () => { scale = Math.min(scale + 0.2, 2.6) } },
            { label: '-', title: 'Zoom out', action: () => { scale = Math.max(scale - 0.2, 0.5) } },
            { label: 'Reset', title: 'Reset zoom', action: () => { scale = 1 } },
            { label: 'Close', title: 'Close fullscreen diagram', action: closeViewer }
          ]

          controls.forEach((control) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'mermaid-viewer-button'
            button.textContent = control.label
            button.title = control.title
            button.setAttribute('aria-label', control.title)
            button.addEventListener('click', () => {
              control.action()
              updateScale()
              centerDiagram()
            })
            toolbar.appendChild(button)
          })

          viewport.appendChild(clone)
          overlay.appendChild(toolbar)
          overlay.appendChild(viewport)
          overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeViewer()
          })
          document.addEventListener('keydown', handleKeydown)
          document.body.appendChild(overlay)
          updateScale()
          centerDiagram()
        }

        openButton.addEventListener('click', openViewer)
        shell.addEventListener('click', (event) => {
          const target = event.target as HTMLElement
          if (target.closest('a') || target.closest('button')) return
          openViewer()
        })

        const parent = diagram.parentElement
        if (!parent) return

        parent.replaceChild(shell, diagram)
        shell.appendChild(openButton)
        shell.appendChild(diagram)
      })
    }
    
    const renderMermaid = async () => {
      await nextTick()
      
      // Find all mermaid code blocks
      const mermaidBlocks = document.querySelectorAll('.language-mermaid')
      
      mermaidBlocks.forEach((block, index) => {
        // Extract the raw mermaid code from the syntax-highlighted HTML
        const codeElement = block.querySelector('code')
        if (!codeElement) return
        
        // Get the text content (removes all HTML tags)
        const mermaidCode = codeElement.textContent || ''
        
        // Create a new div to hold the mermaid diagram
        const mermaidDiv = document.createElement('div')
        mermaidDiv.className = 'mermaid'
        mermaidDiv.textContent = mermaidCode
        mermaidDiv.id = `mermaid-${index}-${Date.now()}`
        
        // Replace the code block with the mermaid div
        block.parentElement?.replaceChild(mermaidDiv, block)
      })
      
      // Initialize and render mermaid diagrams
      if (mermaidBlocks.length > 0) {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose'
        })
        await mermaid.run()
        setupMermaidFullscreen()
      }
    }

    onMounted(() => {
      renderMermaid()
    })

    watch(
      () => route.path,
      () => renderMermaid()
    )
  }
}
