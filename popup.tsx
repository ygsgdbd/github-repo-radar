import "./style.css"

function IndexPopup() {
  return (
    <div className="p-4 w-[300px] font-sans">
      <h2 className="text-lg font-medium text-gray-900 mb-3">
        GitHub Repo Radar
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        Display GitHub repository details directly in Google search results.
      </p>
      <div className="text-xs text-gray-600">
        <a 
          href="https://github.com/ygsgdbd/github-repo-radar"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          ygsgdbd/github-repo-radar
        </a>
      </div>
    </div>
  )
}

export default IndexPopup
