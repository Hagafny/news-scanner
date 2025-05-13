import NewsAPI from "newsapi";

class NewsAPIWrapper {
  private static instance: NewsAPI;

  private constructor() {}

  public static getInstance(): NewsAPI {
    if (!NewsAPIWrapper.instance) {
      NewsAPIWrapper.instance = new NewsAPI(process.env.NEWS_API_KEY || "");
    }
    return NewsAPIWrapper.instance;
  }
}

export default NewsAPIWrapper;
