import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function EmployeeTable({ refresh }) {
  const { data, isLoading } = useQuery({
    queryKey: ["employees", refresh],
    queryFn: async () => {
      const res = await api.get("/employees");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

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
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="border-b">
              <td>{e.full_name}</td>
              <td>{e.job_title}</td>
              <td>{e.country}</td>
              <td>{e.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}