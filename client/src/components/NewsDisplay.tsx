import { Article } from "../types";
import { Button } from "@mui/material";
import httpClient from "../http-client";
import { useState } from "react";
import { useArticles } from "../articlesContext";
interface NewsDisplayProps {
  articles: Article[];
}

interface ArticleCardProps {
  article: Article;
  onSummaryClick: (article: Article) => void;
}

export const NewsDisplay = ({ articles }: NewsDisplayProps) => {
  console.log(articles);
  const { updateArticle } = useArticles();
  const handleSummaryClick = async (article: Article) => {
    try {
      const response = await httpClient.post("/api/summary", {
        content: article.content,
      });

      const { summary, violation } = response.data;

      const updatedArticle = {
        ...article,
        summary,
        violation,
      };

      updateArticle(updatedArticle);
    } catch (error) {
      console.error("Error getting summary:", error);
      alert("Failed to get summary");
    }
  };

  return (
    <div className="articlesGrid">
      {articles.map((article) => (
        <ArticleCard
          key={article.url}
          article={article}
          onSummaryClick={handleSummaryClick}
        />
      ))}
    </div>
  );
};

const ArticleCard = ({ article, onSummaryClick }: ArticleCardProps) => {
  return (
    <div className="articleCard">
      <img src={article.urlToImage} alt={article.title} />
      <h3>{article.title}</h3>
      <div className="articleCardDescription">
        <p>Description: {article.description}</p>
        <p>Source: {article.source.name}</p>
      </div>

      {article.summary ? (
        <div>
          <p>Summary: {article.summary}</p>
          <p>Violation: {article.violation}</p>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSummaryClick(article)}
          sx={{
            backgroundColor: "#7F56D9",
          }}
        >
          AI Summary
        </Button>
      )}
    </div>
  );
};
