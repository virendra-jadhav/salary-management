import { useState } from "react";
import { api } from "../api/client";
import toast from "react-hot-toast";



export default function InsightsDashboard() {

  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // const fetchInsights = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await api.get("/insights/country", {
  //       params: { country },
  //     });
  //     setData(res.data);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const fetchInsights = async () => {
  setLoading(true);
  try {
    const res = await api.get("/insights/country", {
      params: { country },
    });
    setData(res.data);
    toast.success("Insights loaded");
  } catch {
    toast.error("Failed to fetch insights");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Salary Insights</h2>

      <div className="flex gap-3 mb-4">
        <input
          className="p-2 rounded text-black w-64"
          placeholder="Enter Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={fetchInsights}
          className="bg-white text-indigo-600 px-4 rounded font-semibold"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white text-black p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500">Min Salary</p>
            <p className="text-xl font-bold">₹ {data.min}</p>
          </div>
          <div className="bg-white text-black p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500">Max Salary</p>
            <p className="text-xl font-bold">₹ {data.max}</p>
          </div>
          <div className="bg-white text-black p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500">Avg Salary</p>
            <p className="text-xl font-bold">₹ {data.avg}</p>
          </div>
        </div>
      )}
    </div>
  );
}