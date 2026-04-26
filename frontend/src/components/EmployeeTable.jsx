import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import toast from "react-hot-toast";

export default function EmployeeTable({ refresh, onEdit, selectedEmployee }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", page, refresh],
    queryFn: async () => {
      const res = await api.get("/employees", {
        params: { page, per_page: 10 },
      });
      return res.data;
    },
  });

  // ✅ FIX: handle error here
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch employees");
    }
  }, [isError]);

  if (isLoading) return <p>Loading...</p>;

  const employees = data?.employees || [];
  const meta = data?.meta || {};

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Employees</h2>

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
              className={`border-b cursor-pointer ${
                selectedEmployee?.id === e.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <td>{e.full_name}</td>
              <td>{e.job_title}</td>
              <td>{e.country}</td>
              <td>{e.salary}</td>
              <td>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onEdit(e);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Prev
        </button>

        <span>
          Page {meta.current_page} of {meta.total_pages}
        </span>

        <button
          disabled={page === meta.total_pages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}