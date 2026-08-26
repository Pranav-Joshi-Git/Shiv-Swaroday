import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mermaid from 'mermaid'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
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
