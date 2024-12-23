import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"
import type { FC } from "react"
import cssText from "data-text:~style.css"
import { GitHubRepoInfo } from "~components/github-repo-info"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*", "https://www.google.com.hk/*"],
  world: "MAIN"
}

export const getInlineAnchorList = () => {
  const results = document.querySelectorAll("#search .g")
  const anchors: Element[] = []
  
  results.forEach(element => {
    if (element.closest('.g .g')) return
    
    if (element.hasAttribute("data-github-info-added")) return

    const link = element.querySelector("a")
    if (!link?.href?.includes("github.com")) return

    element.setAttribute("data-github-info-added", "true")
    element.setAttribute("data-github-url", link.href)

    const lastChild = Array.from(element.children).pop()
    if (lastChild) {
      anchors.push(lastChild)
    }
  })

  return anchors
}

export const getMountPoint = () => "append"

const GoogleSearchContent: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const element = anchor.element.closest('.g')
  const url = element?.getAttribute("data-github-url")
  
  if (!url) {
    return null
  }

  return <GitHubRepoInfo url={url} />
}

export default GoogleSearchContent
