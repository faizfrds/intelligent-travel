import React from "react";

export default function Form() {
  return (
    <div className="my-5 max-w-3xl mx-auto">
      <form className="max-w-sm mx-auto flex justify-start">
        <select
          id="countries"
          className="bg-gray-50 border border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option>Asia</option>
          <option>Europe</option>
          <option>North America</option>
          <option>South America</option>
          <option>Africa</option>
          <option>Australia</option>
          <option>No Preference</option>
        </select>
      </form>
    </div>
  );
}
