import { useState, useEffect } from "react";
import { api } from "../api/client";

export default function EmployeeForm({ onSuccess, editData }) {
  const [form, setForm] = useState({
    full_name: "",
    job_title: "",
    country: "",
    salary: "",
    department: "",
    email: "",
    hire_date: "",
    employment_type: "Full-time",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (editData) {
      await api.put(`/employees/${editData.id}`, { employee: form });
    } else {
      await api.post("/employees", { employee: form });
    }
    onSuccess();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <h2 className="font-semibold text-lg">
        {editData ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label>Name</label>
          <input className="input" name="full_name" value={form.full_name} onChange={handleChange} />
        </div>

        <div>
          <label>Job Title</label>
          <input className="input" name="job_title" value={form.job_title} onChange={handleChange} />
        </div>

        <div>
          <label>Country</label>
          <input className="input" name="country" value={form.country} onChange={handleChange} />
        </div>

        <div>
          <label>Salary</label>
          <input className="input" name="salary" value={form.salary} onChange={handleChange} />
        </div>

        <div>
          <label>Department</label>
          <input className="input" name="department" value={form.department} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input className="input" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label>Hire Date</label>
          <input type="date" className="input" name="hire_date" value={form.hire_date} onChange={handleChange} />
        </div>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        {editData ? "Update" : "Create"}
      </button>
    </div>
  );
}