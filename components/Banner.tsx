"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import OpenAI from "openai";

export default function Banner() {
  const [message, setMessage] = useState<string | null>("");

  const openai = new OpenAI({
    apiKey: `${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    dangerouslyAllowBrowser: true// Make sure to replace with your actual API key
  });

  useEffect(() => {
    async function fetchData() {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a travel assistant. Write your responses in JSON format with location and description as keys" },
          { role: "user", content: "Tell me where is good to go for someone who likes warm tropical weather but wants to stay on a budget." },
        ],
        model: "gpt-4o-mini",
      });
      console.log(completion.choices[0].message.content)
      setMessage(completion.choices[0].message.content);
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <p className="text-white font-lg">
        {message!.length !== 0 ? message : "Loading..."}
      </p>
    </div>
  );
}
