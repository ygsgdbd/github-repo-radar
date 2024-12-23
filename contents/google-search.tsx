import type { PlasmoCSConfig, PlasmoRender } from "plasmo"
import cssText from "data-text:~style.css"
import { GitHubRepoInfo } from "~components/github-repo-info"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*", "https://www.google.com.hk/*"],
  world: "MAIN"
}

export const getInlineAnchorList = () => {
  const results = document.querySelectorAll("#search .g")
  return Array.from(results)
    .filter(element => {
      if (element.closest('.g .g')) return false
      if (element.hasAttribute("data-github-info-added")) return false

      const link = element.querySelector("a")
      if (!link?.href?.includes("github.com")) return false

      if (link.href.includes('/topics/') || 
          link.href.includes('/trending/') ||
          link.href.includes('/search')) return false

      const match = link.href.match(/github\.com\/([^/]+\/[^/]+)(?:\/|$)/)
      if (!match) return false

      element.setAttribute("data-github-info-added", "true")
      element.setAttribute("data-github-url", link.href)
      return true
    })
}

// 自定义渲染函数
export const render: PlasmoRender<HTMLElement> = async ({
  anchor,
  createRootContainer
}) => {
  const element = anchor.element
  const url = element.getAttribute("data-github-url")
  if (!url) return

  // 创建 Shadow Host
  const host = document.createElement("div")
  
  // 创建 Shadow DOM
  const shadow = host.attachShadow({ mode: "open" })
  
  // 添加样式
  const style = document.createElement("style")
  style.textContent = cssText
  shadow.appendChild(style)
  
  // 将 host 添加到搜索结果中
  element.appendChild(host)

  // 直接在 shadow root 中渲染组件
  const root = createRoot(shadow)
  root.render(<GitHubRepoInfo url={url} />)
}

// 这个组件不会被使用，因为我们使用了自定义渲染
const GoogleSearchContent = () => null
export default GoogleSearchContent

