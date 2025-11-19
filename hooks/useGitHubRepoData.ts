import { useState, useEffect } from "react";

interface GitHubRepo {
  updated_at: string;
  size: number;
  // Add other fields as needed
}

interface CachedData {
  data: Record<string, GitHubRepo>;
  timestamp: number;
}

const CACHE_KEY = "github_repo_data";
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const useGitHubRepoData = (repos: { owner: string; name: string }[]) => {
  const [repoData, setRepoData] = useState<Record<string, GitHubRepo>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: CachedData = JSON.parse(cached);
          const now = Date.now();

          // If cache is still valid, use it
          if (now - parsedCache.timestamp < CACHE_DURATION) {
            setRepoData(parsedCache.data);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data from GitHub API
        const fetchPromises = repos.map(async (repo) => {
          const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`);

          if (!response.ok) {
            throw new Error(`Failed to fetch ${repo.name}: ${response.statusText}`);
          }

          const data: GitHubRepo = await response.json();
          return { key: repo.name, data };
        });

        const results = await Promise.all(fetchPromises);

        // Build data object
        const dataMap: Record<string, GitHubRepo> = {};
        results.forEach(({ key, data }) => {
          dataMap[key] = data;
        });

        // Cache the results
        const cacheData: CachedData = {
          data: dataMap,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setRepoData(dataMap);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  return { repoData, loading, error };
};

// Helper function to format GitHub date to MM/DD/YYYY
export const formatGitHubDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Helper function to convert bytes to human-readable size
export const formatRepoSize = (sizeInKB: number): string => {
  if (sizeInKB < 1024) {
    return `${sizeInKB} KB`;
  } else {
    const sizeInMB = (sizeInKB / 1024).toFixed(1);
    return `${sizeInMB} MB`;
  }
};
