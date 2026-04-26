import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import toast from "react-hot-toast";

export default function EmployeeTable({ refresh, onEdit, selectedEmployee }) {
  const [page, setPage] = useState(1);

  // 🔍 Filters
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["employees", page, refresh, name, country, jobTitle],
    queryFn: async () => {
      const res = await api.get("/employees", {
        params: {
          page,
          per_page: 10,
          name,
          country,
          job_title: jobTitle,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // ❗ Error toast
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch employees");
    }
  }, [isError]);

  if (isLoading) return <p>Loading...</p>;

  const employees = data?.employees || [];
  const meta = data?.meta || {};

  return (
    <div className="space-y-4">

      {/* 🔍 FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Name</label>
          <input
            placeholder="Search employee..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg w-56 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Country</label>
          <input
            placeholder="India"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg w-40 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Job Title */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Job Title</label>
          <input
            placeholder="Engineer"
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg w-40 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setName("");
            setCountry("");
            setJobTitle("");
            setPage(1);
          }}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
        >
          Reset
        </button>
      </div>

      {/* 📋 TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Employees</h2>
          <span className="text-sm text-gray-500">
            {meta.total_count} results
          </span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Name</th>
              <th>Job</th>
              <th>Country</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr
                key={e.id}
                onClick={() => onEdit(e)}
                className={`border-b cursor-pointer transition ${
                  selectedEmployee?.id === e.id
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <td>{e.full_name}</td>
                <td>{e.job_title}</td>
                <td>{e.country}</td>
                <td>₹ {e.salary}</td>
                <td>
                  <button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onEdit(e);
                    }}
                    className="text-blue-600 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📄 PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {meta.current_page} of {meta.total_pages}
          </span>

          <button
            disabled={page === meta.total_pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* 🔄 Fetching indicator */}
        {isFetching && (
          <p className="text-xs text-gray-500 mt-2">Updating...</p>
        )}
      </div>
    </div>
  );
}