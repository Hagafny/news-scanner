
# News Legal Scanner

One of the many things we do at Darrow is scan news for legal violations. In this exercise, we will aim to create a news legal scanner page, displaying recent news and using an LLM to detect legal violations. We will fetch the news articles from newsapi.org.

<Insert image of the final product. not this ugly wireframe>

## Step 1: QueryInput

`<QueryInput />` is a simple input controlled component. It accepts a value and an onChange method from the outside.

<Show an image of the QueryInput (Without CategorySelect working) that shows how something is typed inside it (“Violation”)>

## Step 2: CategorySelect

Implement the category filter (show just the news of the selected category). The available categories should be fetched from the server.

## Step 3: NewsDisplay

<Show an image of the News Grid>

What do we see here:

Clicking on “Fetch News” should fetch news from our API and display them in a grid. In our assignment, let’s type “Violation” inside our `<QuerySelect />` component.

### Server

For the category you chose (Step 2), fetch all sources that are in English that come from the United States. Filter to use only the first 5 sources. Fetch all news (Not headlines) from these 5 sources. Fetch 6 articles per page.

### Client

For each article we will show a news box containing:

- Image
- Title
- Description
- Source
- AI Summary Button (To be discussed in Step 4)

We want to implement an endless scroll. Once the user reaches the end of the scroll, fetch the next 6 items, until there are no more items.

## Step 4: AI Summary

<Show an image of a model/drawer showing an AI summary and the violation>

Clicking on the “AI Summary” will open up a drawer to the right of the screen that will show more details regarding the news article. We want to create a new API endpoint that accepts the content of the article, injects the content into an LLM and gets back:

- A short summary of the article
- 1-line of what type of violation the article was referring to

We will show the new data according to the Figma design.

## Additional Notes

- External libraries are okay.
- The design should be pixel-perfect as shown on Figma.
- Think about security, we do not want the repo to share any sensitive API Keys.

## Code Template

To start, we’ll be working with a Fullstack template code which we provide you here:

<Link to the exercise repo>

The starter template includes:

### Client (React)
a. includes `<CategorySelect />`, `<QueryInput />` and `<FetchNewsButton />` components.
b. basic css styling files
c. http-client.ts - an axios instance for making api calls. The base URL (localhost:5000) is already configured so you only need to import it and pass the api URL. For example: axiosInstance.get(‘/api/news’)

### Server (ExpressJS)
a. includes mock “Categories” file

## Getting Started

To run the project, follow these steps:

1. Install dependencies:
   ```
   npm run install:all
   ```

2. Start both the server and the client:
   ```
   npm run start
   ```

Good luck!
