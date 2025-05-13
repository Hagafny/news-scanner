import { Request, Response } from "express";
import newsService from "./news.service";
import { z } from "zod";

const getSummarySchema = z.object({
  content: z.string().min(1, "Content is required"),
});

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

export const getSummary = async (req: Request, res: Response) => {
  try {
    const parseResult = getSummarySchema.safeParse(req.body);

    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: parseResult.error.errors[0].message });
    }

    const { content } = parseResult.data;

    const summary = await newsService.getSummary({ content });
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
