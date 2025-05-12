import { Router, Request, Response } from "express";
import * as categoriesController from "./categories/categories.controller";
import * as newsController from "./news/news.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Darrow's News API");
});

router.get("/categories", categoriesController.getCategories);
router.get("/news", newsController.getNews);

export default router;
