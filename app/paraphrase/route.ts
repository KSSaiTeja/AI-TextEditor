import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    // Check if the request contains the JSON payload
    if (!request.body || !request.body.textToParaphrase) {
      return response.status(400).json({ error: "Missing 'textToParaphrase' in the request body." });
    }

    // Extract the 'textToParaphrase' from the request body
    const { textToParaphrase } = request.body;

    // Set up the options for the API request
    const options = {
      method: "POST", // Use the correct HTTP method (e.g., POST)
      url: "https://ai-writer1.p.rapidapi.com/text/",
      data: { text: `paraphrase this - \n${textToParaphrase}` }, // Use the 'data' field instead of 'params' for POST
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY, // Set your RapidAPI Key here
        "X-RapidAPI-Host": process.env.RAPID_API_HOST, // Set your RapidAPI Host here
      },
    };

    // Make the API request using axios
    const rapidApiResponse = await axios.request(options);
    const { response: paraphrasedText } = rapidApiResponse.data;

    // Return the paraphrased text as a JSON response
    return response.status(200).json({ aiPrompt: paraphrasedText });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
