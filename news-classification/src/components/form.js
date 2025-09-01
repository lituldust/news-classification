'use client'
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: ""
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    console.log("API_URL:", API_URL);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePredictClick = (event) => {
    event.preventDefault();
    
    if (!formData.title.trim() || !formData.text.trim()) {
        setError("Please fill out both the title and content fields.");
        setResult(""); 
        return;
    }

    setIsLoading(true);
    setError(""); 
    setResult(""); 

    fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.Prediction && data.Prediction.length > 0) {
            console.log("Prediction received:", data.Prediction[0]);
            setResult(data.Prediction[0]);
        } else if (data.error) {
            setError(`An error occurred: ${data.error}`);
        } 
        else {
            setError("Received an unexpected format from the server.");
        }
    })
    .catch(err => {
        console.error("Fetch Error:", err);
        setError("Failed to connect to the prediction service. Please ensure the backend server is running.");
    })
    .finally(() => {
        setIsLoading(false); 
    });
  };

  return (
    <div className="flex justify-center min-h-screen w-full items-center p-1 overflow-hidden">
      <div className="w-full max-w-2xl bg-slate-600 rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-400">News Classifier</h1>
          <p className="text-slate-400 mt-2">Enter news details below to predict its category.</p>
        </div>

        <form onSubmit={handlePredictClick} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              News Title
            </label>
            <input 
              type="text" 
              id="title" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., 'Global Summit Addresses Climate Change'"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-slate-300 mb-2">
              News Content
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Enter the full news article content here..."
              rows="6"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </>
            ) : (
              'Predict Category'
            )}
          </button>
        </form>

        {/* Results Section */}
        {(result || error) && (
          <div className="mt-6 p-5 rounded-lg bg-slate-700/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Result:</h3>
            {error && <p className="text-red-400 font-medium">{error}</p>}
            {result && (
                <p className="text-2xl font-bold text-emerald-400 capitalize">{result}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;