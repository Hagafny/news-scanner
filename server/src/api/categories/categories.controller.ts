import { Request, Response } from "express";
import categoriesService from "./categories.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesService.getCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
