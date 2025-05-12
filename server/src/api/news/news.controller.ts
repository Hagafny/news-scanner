import { Request, Response } from "express";
import newsService from "./news.service";

export const getNews = async (req: Request, res: Response) => {
  const { q, category } = req.query;

  try {
    const sources = await newsService.getSources({
      category: category as string,
      language: "en",
      country: "us",
    });

    const sourcesIds = sources.map((source) => source.id).join(",");

    const articles = await newsService.getArticles({
      q: q as string,
      sources: sourcesIds,
    });

    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
