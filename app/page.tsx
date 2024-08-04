import Banner from "@/components/Banner";
import Form from "@/components/Form";
import CategorySelector from "@/components/Selection";
import OpenAI from "openai";
import { Location } from "@/types";

export default function Home() {

  return (
    <div className="p-6 max-w-3xl mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">Select Continent</h1>
        <Form />
        <h1 className="text-2xl font-bold mb-4">Select Categories</h1> */}
        <h1 className="text-center text-3xl text-teal-900 mt-5 mb-20 p-5 bg-slate-100 rounded-md font-extrabold font-mono">Intelligent Travel</h1>
        <CategorySelector/>
    </div>
  );
}
