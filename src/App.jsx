import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("Ping the Go API to see a response.");
  const [isLoading, setIsLoading] = useState(false);

  const handlePing = async () => {
    setIsLoading(true);
    setMessage("Pinging...");

    try {
      const res = await fetch("/api/ping");
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const text = await res.text();
      setMessage(text);
    } catch (error) {
      setMessage(error.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100">
      <div className="w-full max-w-lg rounded-2xl bg-slate-800/80 backdrop-blur shadow-2xl p-10 border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6">Hello, 2 2world!</h1>
        <p className="text-center text-slate-300 mb-8">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={handlePing}
            disabled={isLoading}
            className="px-6 py-3 rounded-full bg-emerald-500 text-slate-900 font-semibold shadow-lg hover:bg-emerald-400 disabled:opacity-60 transition-colors"
          >
            {isLoading ? "Waiting..." : "Ping API"}
          </button>
        </div>
      </div>
    </div>
  );
}
