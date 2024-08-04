"use client";
import React, { useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

const categories = [
  "Budget-friendly",
  "Beaches",
  "Mountains",
  "Kids-friendly",
  "Entertainment",
  "Sports",
  "Food",
  "Festivals",
  "Adventure",
  "Road Trips",
];

type Location = {
  location: string;
  description: string;
  image?: string;
  top_attractions: { name: string; description: string }[];
};

export default function CategorySelector() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [extraCat, setExtraCat] = useState<string>("");
  const [selectedContinent, setSelectedContinent] =
    useState<string>("Any continent");
  const [result, setResult] = useState<Location>();

  const handleClick = (category: string) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category) //remove the element from the list if already selected
          : [...prevSelected, category] //otherwise add it
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedCategories, extraCat, selectedContinent }),
    });

    if (response.ok) {
      const data = await response.json();
      const res = data.updatedMessage;
      setResult(res);
      // parentFunc(res);
      // console.log(result);
      setSelectedCategories([]);
      setExtraCat("");
      setSelectedContinent("Anywhere!");
      setLoading(false);
    } else {
      console.error("Failed to submit data");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Area of Interest</h1>
      <form className="max-w-full mx-auto my-5">
        <select
          id="countries"
          className="bg-gray-50 border border-teal-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          onChange={(e) => setSelectedContinent(e.target.value)}
          value={selectedContinent}
        >
          {[
            "Anywhere!",
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Africa",
            "Australia and Oceania",
          ].map((loc, key) => (
            <option key={key}>{loc}</option>
          ))}
          {/* <option>Anywhere!</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>North America</option>
          <option>South America</option>
          <option>Africa</option>
          <option>Australia and Oceania</option> */}
        </select>
      </form>
      <h1 className="text-2xl font-bold mb-4">Select Categories</h1>
      <div className="my-2">
        {/* <h2 className="text-xl font-semibold">Selected Categories:</h2> */}
        <div className="flex flex-wrap mt-2 gap-x-2 gap-y-2">
          {selectedCategories.map((category, index) => (
            <div
              key={index}
              className="bg-teal-600 text-white border border-teal-800 p-1 rounded-lg flex  justify-center align-middle gap-x-2"
            >
              <p>{category}</p>
              <button>
                <IoMdClose onClick={() => handleClick(category)} size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {categories
          .filter((e) => !selectedCategories.includes(e))
          .map((category) => (
            <div
              key={category}
              className={`p-4 border rounded cursor-pointer transition-colors duration-300 bg-white text-teal-700 border-gray-300 hover:bg-teal-200 hover:border-teal-400`}
              // ${
              //   selectedCategories.includes(category)
              //     ? "bg-teal-500 text-white border-teal-700"
              //     : "bg-white text-teal-700 border-gray-300"
              // }
              // hover:bg-teal-200 hover:border-teal-400`}
              onClick={() => handleClick(category)}
            >
              {category}
            </div>
          ))}
      </div>
      <div className="my-6">
        <input
          type="text"
          id="default-input"
          onChange={(e) => setExtraCat(e.target.value)}
          value={extraCat}
          placeholder="Any other preferences? (e.g. warm tropical weather)"
          className="bg-gray-50 border border-gray-300 text-teal-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        />
      </div>

      <div>
        {loading ? (
          <button disabled className="flex justify-center items-center border border-red-300 rounded-lg p-4 text-black w-full my-4">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
            Loading your next adventure
          </button>
        ) : result ? (
          <div>
            <button
              onClick={handleSubmit}
              className="border bg-teal-500  rounded-lg p-4 text-white w-full my-4 hover:bg-white hover:text-teal-400 hover:border-teal-400"
            >
              Search Again
            </button>
            <div className="text-2xl" id="result-find">
              <h1 className="my-2 text-xl font-bold">Location:</h1>
              <h2 className="my-2 font-bold text-2xl text-teal-800">
                {result.location}
              </h2>
              <div className="w-full lg:h-32 h-24">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={result.image}
                />
              </div>
              <p className="text-sm my-6">{result.description}</p>
              <h1 className="my-3 text-lg font-bold">
                Highly rated attractions:
              </h1>
              {result.top_attractions?.map((item, index) => (
                <div
                  key={index}
                  className="text-sm p-2 mb-7 rounded-md bg-slate-100/40"
                >
                  <p className="font-semibold mb-3">{item.name}</p>
                  <p>{item.description}</p>
                </div>
              ))}
              <div className="justify-center flex flex-col text-sm my-5">
                <p className="text-slate-400 text-center">
                  Not your kind of flow? Try to include stronger keywords in
                  your search
                </p>
                <button
                  className="text-teal-500 font-bold"
                  onClick={() => scrollTo(0, 0)}
                >
                  Search again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="border bg-teal-500  rounded-lg p-4 text-white w-full my-4 hover:bg-white hover:text-teal-400 hover:border-teal-400 flex justify-center items-center"
          >
            <IoMdSearch className="ml-2" size={20} />
            Search dream destination
          </button>
        )}
      </div>
    </div>
  );
}
