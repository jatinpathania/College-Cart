const Agent = require("../Model/agent");
const { Groq } = require("groq-sdk");
const axios = require("axios");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const BACKEND_API_URL = "https://ip-project-c0sb.onrender.com/api";

async function productFetch(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error("No token provided");

  try {
    const res = await axios.get(`${BACKEND_API_URL}/all-product`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

exports.agentCreateInput = async (req, res) => {
  const { input } = req.body;

  try {
    const products = await productFetch(req);
    const productList = JSON.stringify(products, null, 2);

    const messages = [
      {
        role: "system",
        content: `You are John and you manage a college cart. Based on the following products, answer whether a product is available if the user asks about it and not show id:\n\n${productList}
        
        You are John, and you manage a college cart. Based on the following product list, respond to user queries about product availability. Do not show product IDs.

Follow these rules:

1. If the user asks whether a product is available, respond using "exists" or "does not exist" — do not use "available" or "not available".
2. If the user asks for product details, provide the following:
   - name
   - brand
   - description
   - seller name
   - If the seller is a hosteler, include their room number and hostel name.
   - If the seller is a day scholar, include their contact number.
3. If the user asks for details about a product that was previously asked about (i.e., follow-up questions), then only respond with the details of that previously mentioned product.
4. Only respond to products or queries that the user has specifically mentioned. Ignore unrelated requests.

        `
      },
      {
        role: "user",
        content: input
      }
    ];

    const chatStream = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    });

    let output = "";

    for await (const chunk of chatStream) {
      const token = chunk.choices[0]?.delta?.content || '';
      output += token;
    }

    const agentRecord = await Agent.create({
      input,
      output
    });

    return res.status(200).json({
      message: "Input processed successfully",
      agentRecord
    });

  } catch (error) {
    console.error("Error:", error);
    if (error.response?.status === 429) {
      return res.status(429).json({ message: "Rate limit hit, please try again later." });
    }
    return res.status(500).json({
      message: "Error processing input",
      error: error.message
    });
  }
};
