import { useState } from "react";
import "./App.css";
import { CategorySelect } from "./components/CategorySelect";
import httpClient from "./http-client";
import { QueryInput } from "./components/QueryInput";
import { NewsDisplay } from "./components/NewsDisplay";
import { FetchNewsButton } from "./components/FetchNewsButton";

type Article = {
  content: string;
  description: string;
  source: string;
  url: string;
  title: string;
  urlToImage: string;
};

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [totalResults, setTotalResults] = useState(0);

  const handleFetchNews = async () => {
    try {
      const data = await httpClient.get("/api/news", {
        params: {
          q: searchTerm,
          category: selectedCategory,
        },
      });

      console.log(data.data.articles[0]);

      setTotalResults(data.data.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="app">
      <div className="filters">
        <QueryInput value={searchTerm} onChange={setSearchTerm} />
        <CategorySelect
          options={[
            {
              displayName: "Technology",
              value: "technology",
            },
            {
              displayName: "Business",
              value: "business",
            },
          ]}
          selectedOptions={selectedCategory}
          onChange={setSelectedCategory}
        />
        <FetchNewsButton onClick={handleFetchNews} />
      </div>
      <div className="totalResults">{totalResults} results found</div>
      <NewsDisplay />
    </div>
  );
}

export default App;
