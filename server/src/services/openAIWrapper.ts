import OpenAI from "openai";

class OpenAIWrapper {
  private static instance: OpenAI;

  private constructor() {}

  public static getInstance(): OpenAI {
    if (!OpenAIWrapper.instance) {
      OpenAIWrapper.instance = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return OpenAIWrapper.instance;
  }
}

export default OpenAIWrapper;
