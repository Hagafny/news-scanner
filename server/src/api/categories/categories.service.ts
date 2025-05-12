import fs from "fs";
import path from "path";

const categoriesFilePath = path.join(__dirname, "../../db/categories.json");

console.log(categoriesFilePath);

const getCategories = async () => {
  try {
    const data = await fs.promises.readFile(categoriesFilePath, "utf-8");
    const categories = JSON.parse(data);
    return categories;
  } catch (error) {
    console.error("Error reading categories from file:", error);
    throw new Error("Could not retrieve categories");
  }
};

export default {
  getCategories,
};
