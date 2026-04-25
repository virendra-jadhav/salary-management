import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function EmployeeTable({ refresh }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["employees", page, refresh],
    queryFn: async () => {
      const res = await api.get("/employees", {
        params: {
          page,
          per_page: 10,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;

  const employees = data?.employees || [];
  const meta = data?.meta || {};

  console.log("Data", data)
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Employees</h2>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Job</th>
            <th>Country</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-b">
              <td>{e.full_name}</td>
              <td>{e.job_title}</td>
              <td>{e.country}</td>
              <td>{e.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <div className="text-sm">
          Page {meta.current_page} of {meta.total_pages}
        </div>

        <button
          disabled={page === meta.total_pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Loading indicator */}
      {isFetching && <p className="text-sm mt-2">Fetching...</p>}
    </div>
  );
}