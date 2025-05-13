import { createContext, useContext, useState, ReactNode } from "react";
import type { Article } from "./types";

interface ArticlesContextType {
  articles: Article[];
  updateArticle: (updatedArticle: Article) => void;
  setArticles: (articles: Article[]) => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const updateArticle = (updatedArticle: Article) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.url === updatedArticle.url ? updatedArticle : article
      )
    );
  };

  return (
    <ArticlesContext.Provider value={{ articles, updateArticle, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
