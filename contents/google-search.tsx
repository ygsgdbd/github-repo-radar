import type { PlasmoCSConfig } from "plasmo"
import cssText from "data-text:~style.css"
import { GitHubRepoInfo } from "~components/github-repo-info"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*", "https://www.google.com.hk/*"],
  world: "MAIN"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
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

const GoogleSearchContent = ({ anchor }) => {
  const element = anchor.element
  if (!element) return null

  const url = element.getAttribute("data-github-url")
  if (!url) return null

  return <GitHubRepoInfo url={url} />
}

export default GoogleSearchContent

