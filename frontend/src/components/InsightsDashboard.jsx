import { useState } from "react";
import { api } from "../api/client";
import toast from "react-hot-toast";

export default function InsightsDashboard() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobAvg, setJobAvg] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);

  // 🌍 Country Insights
  const fetchInsights = async () => {
    if (!country) {
      toast.error("Please enter country");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/insights/country", {
        params: { country },
      });
      setData(res.data);
      toast.success("Country insights loaded");
    } catch {
      toast.error("Failed to fetch insights");
    } finally {
      setLoading(false);
    }
  };

  // 💼 Job Title Insights
  const fetchJobInsights = async () => {
    if (!country || !jobTitle) {
      toast.error("Enter both country and job title");
      return;
    }

    setJobLoading(true);
    try {
      const res = await api.get("/insights/job_title", {
        params: { country, job_title: jobTitle },
      });
      setJobAvg(res.data.avg);
      toast.success("Job insights loaded");
    } catch {
      toast.error("Failed to fetch job insights");
    } finally {
      setJobLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg space-y-6">
      
      <h2 className="text-xl font-bold">Salary Insights</h2>

      {/* 🌍 COUNTRY SECTION */}
      <div className="space-y-3">
        <div className="flex gap-3 flex-wrap">
          <input
            className="p-2 rounded text-black w-64"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button
            onClick={fetchInsights}
            className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold"
          >
            {loading ? "Loading..." : "Fetch Country Insights"}
          </button>
        </div>

        {data && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white text-black p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Min Salary</p>
              <p className="text-xl font-bold">
                ₹ {Number(data.min).toFixed(2)}
              </p>
            </div>

            <div className="bg-white text-black p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Max Salary</p>
              <p className="text-xl font-bold">
                ₹ {Number(data.max).toFixed(2)}
              </p>
            </div>

            <div className="bg-white text-black p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Avg Salary</p>
              <p className="text-xl font-bold">
                ₹ {Number(data.avg).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 💼 JOB TITLE SECTION */}
      <div className="space-y-3 border-t border-white/30 pt-4">
        <div className="flex gap-3 flex-wrap">
          <input
            className="p-2 rounded text-black w-64"
            placeholder="Enter Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <button
            onClick={fetchJobInsights}
            className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold"
          >
            {jobLoading ? "Loading..." : "Fetch Job Avg"}
          </button>
        </div>

        {jobAvg !== null && (
          <div className="bg-white text-black p-4 rounded-xl text-center max-w-xs">
            <p className="text-sm text-gray-500">
              Avg Salary ({jobTitle})
            </p>
            <p className="text-xl font-bold">
              ₹ {Number(jobAvg).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}