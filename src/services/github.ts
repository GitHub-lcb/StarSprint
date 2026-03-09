import axios from 'axios';
import dayjs from 'dayjs';
import type { GithubRepo, GrowthRepo, SearchParams } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchFastGrowingRepos = async (
  params: SearchParams,
  token?: string
): Promise<GrowthRepo[]> => {
  const { startDate, endDate, minStars, limit } = params;
  
  const query = `created:${startDate}..${endDate} stars:>=${minStars}`;
  
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/search/repositories`, {
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: Math.min(limit * 2, 100), // Fetch a bit more to calculate growth rate properly
      },
      headers,
    });

    const items: GithubRepo[] = response.data.items;
    const now = dayjs();

    const processedRepos: GrowthRepo[] = items.map((repo) => {
      const createdAt = dayjs(repo.created_at);
      const daysOld = Math.max(1, now.diff(createdAt, 'day'));
      const growthRate = parseFloat((repo.stargazers_count / daysOld).toFixed(2));
      
      return {
        ...repo,
        daysOld,
        growthRate,
      };
    });

    // Sort by growth rate descending
    return processedRepos
      .sort((a, b) => b.growthRate - a.growthRate)
      .slice(0, limit);
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please provide a Token.');
    }
    throw new Error(error.message || 'Failed to fetch repositories');
  }
};
