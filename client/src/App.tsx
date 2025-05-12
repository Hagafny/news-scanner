import "./App.css";
import { useEffect, useState } from "react";
import { CategorySelect, Option } from "./components/CategorySelect";
import httpClient from "./http-client";
import { QueryInput } from "./components/QueryInput";
import { NewsDisplay } from "./components/NewsDisplay";
import { FetchNewsButton } from "./components/FetchNewsButton";
import type { Article } from "./types";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const handleFetchNews = async () => {
    try {
      const response = await httpClient.get("/api/news", {
        params: {
          q: searchTerm,
          category: selectedCategory,
        },
      });

      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await httpClient.get("/api/categories");

      const categories = response.data.map((category: string) => ({
        displayName: category,
        value: category,
      }));

      console.log(categories);

      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="app">
      <div className="filters">
        <QueryInput value={searchTerm} onChange={setSearchTerm} />
        <CategorySelect
          options={categories}
          selectedOptions={selectedCategory}
          onChange={setSelectedCategory}
        />
        <FetchNewsButton onClick={handleFetchNews} />
      </div>
      <NewsDisplay articles={articles} />
    </div>
  );
}

export default App;
