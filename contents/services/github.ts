interface RepoInfo {
  stars: number
  forks: number
  watchers: number
  language: string
  description: string
  openIssues: number
  topics: string[]
  updatedAt: string
  license?: string
}

class GitHubService {
  private static instance: GitHubService
  private baseUrl = 'https://api.github.com'
  private headers = {
    'Accept': 'application/vnd.github.v3+json'
  }

  private constructor() {}

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService()
    }
    return GitHubService.instance
  }

  private parseGitHubUrl(url: string) {
    try {
      const urlObj = new URL(url)
      const [, owner, repo] = urlObj.pathname.split('/')
      return { owner, repo }
    } catch (e) {
      return null
    }
  }

  async getRepoInfo(url: string): Promise<RepoInfo | null> {
    try {
      const repoData = this.parseGitHubUrl(url)
      if (!repoData) {
        console.error('Invalid GitHub URL:', url)
        return null
      }

      const { owner, repo } = repoData
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: this.headers
      })
      
      if (!response.ok) {
        console.error(`Failed to fetch repo info: ${response.statusText}`)
        return null
      }
      
      const data = await response.json()
      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.subscribers_count,
        language: data.language || "Unknown",
        description: data.description || "",
        openIssues: data.open_issues_count,
        topics: data.topics || [],
        updatedAt: data.updated_at,
        license: data.license?.spdx_id
      }
    } catch (error) {
      console.error('Error fetching repo info:', error)
      return null
    }
  }
}

export const githubService = GitHubService.getInstance()
export type { RepoInfo }
