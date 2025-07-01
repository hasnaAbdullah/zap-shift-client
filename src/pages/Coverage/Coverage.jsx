import React, { useState } from "react";
import SearchableMap from "./SearchableMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const [query, setQuery] = useState("");
  const [focusedDistrict, setFocusedDistrict] = useState(null);
  const districts = useLoaderData();
  const handleSubmit = (e) => {
    e.preventDefault();

    const match = districts.find((d) =>
      d.district.toLowerCase().includes(query.toLowerCase())
    );

    setFocusedDistrict(match || null);
  };

  return (
    <section className="w-full px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">We Are in All 64 Districts</h1>

        <form onSubmit={handleSubmit} className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search any district..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#CAEB66] text-black font-semibold rounded-md shadow"
          >
            Go
          </button>
        </form>
      </div>

      <div className="w-full h-[600px] rounded-xl overflow-hidden">
        <SearchableMap
          allDistricts={districts}
          focusedDistrict={focusedDistrict}
        />
      </div>
    </section>
  );
};

export default Coverage;
