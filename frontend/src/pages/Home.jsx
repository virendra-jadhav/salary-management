import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import InsightsDashboard from "../components/InsightsDashboard";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <InsightsDashboard />

      {/* Create Button */}
      <button
        onClick={() => setSelectedEmployee({})}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Create Employee
      </button>

      {/* Form */}
      {selectedEmployee && (
        <EmployeeForm
          editData={selectedEmployee}
          onSuccess={() => {
            setSelectedEmployee(null);
            setRefresh(!refresh);
          }}
          onCancel={() => setSelectedEmployee(null)}
        />
      )}

      {/* Table */}
      <EmployeeTable
        refresh={refresh} 
        onEdit={(emp) => setSelectedEmployee(emp)}
        selectedEmployee={selectedEmployee}
        />
    </div>
  );
}