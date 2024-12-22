import type { PlasmoCSConfig } from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*", "https://www.google.com.hk/*"]
}

// 使用新的注入策略
export const getStyle = () => {
  return {
    position: "relative",
    zIndex: 1000
  }
}

// 使用 afterElement 策略
export const getInlineAnchorList = () => {
  const results = document.querySelectorAll(".g")
  
  return Array.from(results).filter(element => {
    // 使用自定义属性来标记已处理的元素
    if ((element as HTMLElement).getAttribute("data-github-info-added")) return false
    
    const link = element.querySelector("a")
    const isGitHub = link?.href?.includes("github.com")
    
    if (isGitHub) {
      (element as HTMLElement).setAttribute("data-github-info-added", "true")
    }
    
    return isGitHub
  })
}

interface RepoInfo {
  stars: string
  forks: string
  language: string
}

const InfoItem: FC<{
  icon: string
  value: string | number
  color: string
}> = ({ icon, value, color }) => (
  <div className="inline-flex items-center gap-1 rounded bg-gray-100/80 px-2 py-0.5 hover:bg-gray-200/80 transition-colors">
    <span className={color}>{icon}</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
)

const GoogleSearchContent: FC = () => {
  const [repoInfo] = useState<RepoInfo>({
    stars: "1.2k",
    forks: "234",
    language: "TypeScript"
  })
  
  return (
    <div className="mt-2 flex items-center gap-2">
      <InfoItem icon="⭐" value={repoInfo.stars} color="text-yellow-500" />
      <InfoItem icon="🍴" value={repoInfo.forks} color="text-gray-500" />
      <InfoItem icon="💻" value={repoInfo.language} color="text-blue-500" />
    </div>
  )
}

export default GoogleSearchContent
