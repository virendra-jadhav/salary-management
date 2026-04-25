import { useState, useEffect } from "react";
import { api } from "../api/client";

export default function EmployeeForm({ editData, onSuccess, onCancel }) {
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
    if (editData && editData.id) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (editData?.id) {
        await api.put(`/employees/${editData.id}`, { employee: form });
      } else {
        await api.post("/employees", { employee: form });
      }
      onSuccess();
    } catch {
      alert("Error saving employee");
    }
  };

  const handleDelete = async () => {
    if (!editData?.id) return;

    if (window.confirm("Are you sure?")) {
      await api.delete(`/employees/${editData.id}`);
      onSuccess();
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">
        {editData?.id ? "Edit Employee" : "Create Employee"}
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

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editData?.id ? "Update" : "Create"}
        </button>

        {editData?.id && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        )}

        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}