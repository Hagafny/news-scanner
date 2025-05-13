import NewsAPI, { NewsSource, NewsArticle } from "newsapi";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const NewsSummary = z.object({
  summary: z.string(),
  violation: z.string(),
});

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
    const newsapi = NewsAPIWrapper.getInstance();
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
  const newsapi = NewsAPIWrapper.getInstance();
  const articlesResponse = await newsapi.v2.everything({ q, sources });
  return articlesResponse.articles;
};

const getSummary = async ({
  content,
}: {
  content: string;
}): Promise<string | null> => {
  const systemPrompt = `
  You are a news summarizer.
  You will be given a news article.
  You will need to summarize the article in a few sentences.
  You will also need to summarize the violation mentioned in the article in one sentence.
  Your response should be in JSON format. 
  The JSON should have the following fields:
  - summary: The summary of the article
  - violation: The violation mentioned in the article
  `;

  const userPrompt = `
  Article: ${content}
  `;

  const openai = OpenAPIWrapper.getInstance();

  const summaryResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: zodResponseFormat(NewsSummary, "summary"),
  });

  const response = JSON.parse(
    summaryResponse.choices[0].message.content || "{}"
  );

  return response;
};

export default {
  getSources,
  getArticles,
  getSummary,
};

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

class OpenAPIWrapper {
  private static instance: OpenAI;

  private constructor() {}

  public static getInstance(): OpenAI {
    if (!OpenAPIWrapper.instance) {
      OpenAPIWrapper.instance = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return OpenAPIWrapper.instance;
  }
}
