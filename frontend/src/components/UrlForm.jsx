import React, { useState } from "react";
import { shortenUrl } from "../services/api.js"; // fixed import name

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await shortenUrl(longUrl); // calling API
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error(error);
      alert("Error shortening URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center">
      <div className="p-8 max-w-md w-full bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Enter your long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Your short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
