import NewsAPInitiator, { NewsSource, NewsArticle } from "newsapi";

type getSourceProps = {
  category: string;
  language: string;
  country: string;
};

export const getSources = async ({
  category,
  language,
  country,
}: getSourceProps): Promise<NewsSource[]> => {
  try {
    const newsapi = NewsAPI.getInstance();
    const sourcesResponse = await newsapi.v2.sources({
      language,
      country,
      category,
    });

    return sourcesResponse.sources;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch sources");
  }
};

const getArticles = async ({
  q,
  sources,
}: {
  q: string;
  sources: string;
}): Promise<NewsArticle[]> => {
  const newsapi = NewsAPI.getInstance();
  const articlesResponse = await newsapi.v2.everything({ q, sources });
  return articlesResponse.articles;
};

export default {
  getSources,
  getArticles,
};

class NewsAPI {
  private static instance: NewsAPInitiator;

  private constructor() {}

  public static getInstance(): NewsAPInitiator {
    if (!NewsAPI.instance) {
      NewsAPI.instance = new NewsAPInitiator(process.env.NEWS_API_KEY || "");
    }
    return NewsAPI.instance;
  }
}
