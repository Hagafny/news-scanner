export type Article = {
  content: string;
  description: string;
  source: { id: string; name: string };
  url: string;
  title: string;
  urlToImage: string;
  summary?: string;
  violation?: string;
};
