import type { PlasmoCSConfig } from "plasmo"
import type { FC } from "react"
import { useState, useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*", "https://www.google.com.hk/*"]
}

const parseGitHubUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    const [, owner, repo] = urlObj.pathname.split('/')
    return { owner, repo }
  } catch (e) {
    return null
  }
}

export const getInlineAnchorList = () => {
  const results = document.querySelectorAll("#search .g:not(.g .g)")
  
  return Array.from(results).filter(element => {
    if ((element as HTMLElement).getAttribute("data-github-info-added")) {
      return false
    }
    
    const link = element.querySelector("a")
    const isGitHub = link?.href?.includes("github.com")
    
    if (isGitHub) {
      (element as HTMLElement).setAttribute("data-github-info-added", "true")
      if (link?.href) {
        (element as HTMLElement).setAttribute("data-github-url", link.href)
      }
    }
    
    return isGitHub
  })
}

export const getMountPoint = () => "append"

interface RepoInfo {
  stars: number
  forks: number
  language: string
  description: string
  isLoading: boolean
  error?: string
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const InfoItem: FC<{
  icon: string
  value: string | number
  color: string
  tooltip?: string
}> = ({ icon, value, color, tooltip }) => (
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    padding: "2px 6px",
    borderRadius: "4px",
    backgroundColor: "rgba(0,0,0,0.04)",
    marginRight: "6px",
    fontSize: "12px",
    cursor: tooltip ? "help" : "default"
  }} title={tooltip}>
    <span style={{ color }}>{icon}</span>
    <span style={{ 
      fontWeight: 500, 
      color: "#555",
      fontSize: "11px",
      lineHeight: "15px"
    }}>{value}</span>
  </div>
)

const GoogleSearchContent: FC = () => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo>({
    stars: 0,
    forks: 0,
    language: "",
    description: "",
    isLoading: true
  })

  useEffect(() => {
    const fetchRepoInfo = async () => {
      try {
        const element = document.querySelector("[data-github-info-added='true']")
        const url = element?.getAttribute("data-github-url")
        if (!url) return

        const repoData = parseGitHubUrl(url)
        if (!repoData) return

        const { owner, repo } = repoData
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch repo info')
        }
        
        const data = await response.json()
        setRepoInfo({
          stars: data.stargazers_count,
          forks: data.forks_count,
          language: data.language || "Unknown",
          description: data.description || "",
          isLoading: false
        })
      } catch (error) {
        setRepoInfo(prev => ({
          ...prev,
          isLoading: false,
          error: "Failed to load repository information"
        }))
      }
    }

    fetchRepoInfo()
  }, [])

  if (repoInfo.isLoading) {
    return (
      <div style={{ 
        marginTop: "4px", 
        marginBottom: "4px", 
        color: "#666",
        fontSize: "12px" 
      }}>
        Loading repository information...
      </div>
    )
  }

  if (repoInfo.error) {
    return (
      <div style={{ 
        marginTop: "4px", 
        marginBottom: "4px", 
        color: "#dc2626",
        fontSize: "12px" 
      }}>
        {repoInfo.error}
      </div>
    )
  }

  return (
    <div style={{ 
      marginTop: "4px", 
      marginBottom: "4px",
      fontSize: "12px",
      lineHeight: "1.4"
    }}>
      {repoInfo.description && (
        <p style={{ 
          marginBottom: "4px", 
          color: "#555",
          fontSize: "12px",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {repoInfo.description}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2px" }}>
        <InfoItem 
          icon="⭐" 
          value={formatNumber(repoInfo.stars)} 
          color="#f59e0b" 
          tooltip="Stars"
        />
        <InfoItem 
          icon="🍴" 
          value={formatNumber(repoInfo.forks)} 
          color="#6b7280" 
          tooltip="Forks"
        />
        <InfoItem 
          icon="💻" 
          value={repoInfo.language} 
          color="#3b82f6" 
          tooltip="Primary Language"
        />
      </div>
    </div>
  )
}

export default GoogleSearchContent
