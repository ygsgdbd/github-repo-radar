import type { FC } from "react"
import { useState, useEffect } from "react"

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

  const baseUrl = `https://img.shields.io/github/${type}/${repo}?style=flat`
  const shieldUrl = color ? `${baseUrl}&color=${color}` : baseUrl

  return (
    <a href={getUrl()} target="_blank" rel="noopener noreferrer">
      <img
        src={shieldUrl}
        alt={`${type} count`}
        style={{ cursor: 'pointer' }}
      />
    </a>
  )
}

interface GitHubRepoInfoProps {
  url: string
}

export const GitHubRepoInfo: FC<GitHubRepoInfoProps> = ({ url }) => {
  const [repoPath, setRepoPath] = useState<string>("")

  useEffect(() => {
    if (!url) return

    const match = url.match(/github\.com\/([^/]+\/[^/]+)/)
    if (match) {
      setRepoPath(match[1])
    }
  }, [url])

  if (!repoPath) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2 mt-1">
      <div className="flex items-center gap-1 flex-wrap">
        <ShieldBadge 
          type="stars"
          repo={repoPath}
          color="e4a935"
        />
        <ShieldBadge 
          type="forks"
          repo={repoPath}
          color="2cbe4e"
        />
        <ShieldBadge 
          type="languages/top"
          repo={repoPath}
          color="2188ff"
        />
        <ShieldBadge 
          type="license"
          repo={repoPath}
          color="7057ff"
        />
        <ShieldBadge 
          type="last-commit"
          repo={repoPath}
          color="26a641"
        />
      </div>
    </div>
  )
}
