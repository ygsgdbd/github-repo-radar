import type { PlasmoCSConfig } from "plasmo"
import type { FC } from "react"
import { useState, useEffect } from "react"
import { githubService, type RepoInfo } from "./services/github"

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

const InfoItem: FC<{
  icon: string
  value: string | number
  color: string
  tooltip?: string
}> = ({ icon, value, color, tooltip }) => (
  <div 
    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs cursor-help hover:bg-gray-50 rounded"
    title={tooltip}
  >
    <span className={color}>{icon}</span>
    <span className="font-medium text-[#555] text-[11px] leading-[13px]">{value}</span>
  </div>
)

const TopicTag: FC<{ topic: string }> = ({ topic }) => (
  <span className="px-1.5 py-0.5 text-[10px] text-blue-600 bg-blue-50 rounded-full">
    {topic}
  </span>
)

const RepoStats: FC<{ url: string }> = ({ url }) => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        const data = await githubService.getRepoInfo(url)
        if (mounted && data) {
          setRepoInfo(data)
        }
      } catch (error) {
        console.error('Error fetching repo info:', error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [url])

  if (isLoading || !repoInfo) {
    return null
  }

  return (
    <div className="flex w-full flex-row items-center gap-4">
      <InfoItem 
          icon="⭐" 
          value={formatNumber(repoInfo.stars)} 
          color="text-amber-500" 
          tooltip="Stars"
        />
        <InfoItem 
          icon="🍴" 
          value={formatNumber(repoInfo.forks)} 
          color="text-gray-500" 
          tooltip="Forks"
        />
        <InfoItem 
          icon="👀" 
          value={formatNumber(repoInfo.watchers)} 
          color="text-emerald-500" 
          tooltip="Watchers"
        />
    </div>
  )
}

const GoogleSearchContent: FC = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const element = document.querySelector("[data-github-info-added='true']")?.closest('.g')
    const githubUrl = element?.getAttribute("data-github-url")
    if (githubUrl) {
      setUrl(githubUrl)
    }
  }, [])

  if (!url) {
    return null
  }

  return <RepoStats url={url} />
}

export default GoogleSearchContent
