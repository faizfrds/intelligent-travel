import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Image } from "openai/resources/images.mjs";
const { getJson } = require("serpapi");

type Message = {
  location: string;
  image?: string;
}

// type RecImage = {
//   results: {
//     urls: {
//       regular: string;
//     }
//   }[]
// }

type ImageResults = {
  images_results: { 
    original: string
  }[];
}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { selectedCategories, selectedContinent, extraCat } = body;

  // Here you can handle the received data, e.g., store it in a database
  console.log("Selected Categories:", selectedCategories, " continent: ", selectedContinent, " extra category: ", extraCat);

  const openai = new OpenAI({
    apiKey: `${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
  });

  let message: Message | null;
  let image: string = "";
  let updatedMessage;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a travel assistant. Write your responses in pure JSON format (no ```json) with location (e.g. San Diego, United States), description, and top 5 attractions along with their name and description.",
      },
      {
        role: "user",
        content: `Where is good to go for someone who wants to go somewhere in ${selectedContinent} and also likes these: ${selectedCategories}, ${extraCat}`,
      },
    ],
    model: "gpt-4o-mini",
  });
  // console.log(completion.choices[0].message.content);
  message = JSON.parse(completion.choices[0].message.content!);
  console.log(message)

  if (message){
    const query = message.location;

    const imageRes = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&page=1&query=${query}`);
    const data = await imageRes.json()
    image = data.results[0].urls.regular;

  }

  updatedMessage = {
    ...message,
    image: image,
  }

  console.log(image, "IMAGE LINK")

  // console.log("IMAGES", image!);

  // console.log(updatedMessage)

  return NextResponse.json({
    updatedMessage,
  });
}
