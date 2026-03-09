export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface SearchParams {
  startDate: string;
  endDate: string;
  minStars: number;
  limit: number;
}

export interface GrowthRepo extends GithubRepo {
  daysOld: number;
  growthRate: number;
}
