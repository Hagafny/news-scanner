import { Article } from "../types";

interface NewsDisplayProps {
  articles: Article[];
}

export const NewsDisplay = ({ articles }: NewsDisplayProps) => {
  return (
    <div className="articlesGrid">
      {articles.map((article) => (
        <div className="articleCard" key={article.url}>
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};
