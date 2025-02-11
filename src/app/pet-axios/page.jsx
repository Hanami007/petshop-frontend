"use client";

import { useEffect, useState } from "react";

import axios from "axios";

export default function Page() {
  const [apiResponse, setApiResponse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API

    const fetchData = async () => {
      try {
        // Make a GET request to the API

        const { data: responseData } = await axios.get(
          "http://127.0.0.1:8000/api/pets"
        );

        // Set the API response in state

        setApiResponse(responseData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    // Call the async function

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
  <h1 className="text-3xl font-extrabold text-center text-indigo-600">
    API Response
  </h1>

  <div className="mt-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
    <p className="text-lg font-semibold flex items-center">
      Success:{" "}
      <span
        className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${
          apiResponse.success
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {apiResponse.success ? "Yes" : "No"}
      </span>
    </p>

    <p className="text-gray-700 mt-3">
      <span className="font-semibold text-gray-900">Message:</span>{" "}
      {apiResponse.message}
    </p>
  </div>

  <h2 className="text-2xl font-bold mt-6 border-b-2 border-indigo-300 pb-2">
    Data List
  </h2>

  <ul className="mt-4 space-y-4">
    {apiResponse.data.map((item) => (
      <li
        key={item.id}
        className="p-4 flex items-center bg-white border border-gray-200 shadow-md rounded-lg transition hover:shadow-xl"
      >
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white font-bold text-lg rounded-full shadow-md">
          {item.name.charAt(0).toUpperCase()}
        </div>

        <div className="ml-4">
          <strong className="text-lg text-gray-900">{item.name}</strong>
          <p className="text-gray-600 text-sm">{item.species}</p>
        </div>
      </li>
    ))}
  </ul>
</div>


  );
}
