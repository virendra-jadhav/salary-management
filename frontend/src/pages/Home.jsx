import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import InsightsDashboard from "../components/InsightsDashboard";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Salary Management</h1>

        <InsightsDashboard />
      <EmployeeForm onSuccess={() => setRefresh(!refresh)} />
      <EmployeeTable refresh={refresh} />
      
    </div>
  );
}