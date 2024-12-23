import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"
import type { FC } from "react"
import { useState, useEffect } from "react"
import { githubService, type RepoInfo } from "./services/github"
import cssText from "data-text:~style.css"

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

    // 标记已处理
    element.setAttribute("data-github-info-added", "true")
    element.setAttribute("data-github-url", link.href)

    // 使用最后一个子元素作为注入点
    const lastChild = Array.from(element.children).pop()
    if (lastChild) {
      anchors.push(lastChild)
    }
  })

  return anchors
}

export const getMountPoint = () => "append"

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

const ShieldBadge: FC<{
  type: string
  repo: string
  color?: string
}> = ({ type, repo, color }) => {
  const getUrl = () => {
    const baseUrl = `https://github.com/${repo}`
    switch (type) {
      case 'stars':
        return `${baseUrl}/stargazers`
      case 'forks':
        return `${baseUrl}/network/members`
      case 'watchers':
        return `${baseUrl}/watchers`
      case 'languages/top':
        return `${baseUrl}/search?l=language`
      case 'license':
        return `${baseUrl}/blob/master/LICENSE`
      case 'last-commit':
        return `${baseUrl}/commits`
      default:
        return baseUrl
    }
  }

  const getShieldUrl = () => {
    const baseUrl = `https://img.shields.io/github/${type}/${repo}?style=flat`
    if (color) {
      return `${baseUrl}&color=${color}`
    }
    return baseUrl
  }

  return (
    <a href={getUrl()} target="_blank" rel="noopener noreferrer">
      <img
        src={getShieldUrl()}
        alt={`${type} count`}
        style={{ cursor: 'pointer' }}
      />
    </a>
  )
}

const TopicTag: FC<{ topic: string }> = ({ topic }) => (
  <span className="px-1.5 py-0.5 text-[10px] text-blue-600 bg-blue-50 rounded-full">
    {topic}
  </span>
)

const GoogleSearchContent: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const [repoPath, setRepoPath] = useState<string>("")

  useEffect(() => {
    const element = anchor.element.closest('.g')
    const url = element?.getAttribute("data-github-url")
    if (!url) return

    // 从 URL 中提取仓库路径 (owner/repo)
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/)
    if (match) {
      setRepoPath(match[1])
    }
  }, [anchor])

  if (!repoPath) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2 mt-1">
      <div className="flex items-center gap-1 flex-wrap">
        <ShieldBadge 
          type="stars"
          repo={repoPath}
          color="dfb317"
        />
        <ShieldBadge 
          type="forks"
          repo={repoPath}
          color="97ca00"
        />
        <ShieldBadge 
          type="watchers"
          repo={repoPath}
          color="68b7f9"
        />
        <ShieldBadge 
          type="languages/top"
          repo={repoPath}
          color="007ec6"
        />
        <ShieldBadge 
          type="license"
          repo={repoPath}
          color="9c27b0"
        />
        <ShieldBadge 
          type="last-commit"
          repo={repoPath}
          color="4c1"
        />
      </div>
    </div>
  )
}

export default GoogleSearchContent
