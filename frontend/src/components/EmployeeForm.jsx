import { useState, useEffect } from "react";
import { api } from "../api/client";

const initialForm = {
  full_name: "",
  job_title: "",
  country: "",
  salary: "",
  department: "",
  email: "",
  hire_date: "",
  employment_type: "Full-time",
};

export default function EmployeeForm({ editData, onSuccess, onCancel }) {
  const [form, setForm] = useState(initialForm);

//   useEffect(() => {
//     if (editData && editData.id) {
//       setForm(editData);
//     }
//   }, [editData]);
    useEffect(() => {
    if (editData && editData.id) {
        setForm(editData);
    } else {
        setForm(initialForm);
    }
    }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     try {
//       if (editData?.id) {
//         await api.put(`/employees/${editData.id}`, { employee: form });
//       } else {
//         await api.post("/employees", { employee: form });
//       }
//       onSuccess();
//       setForm(initialForm);
//     } catch {
//       alert("Error saving employee");
//     }
//   };
const handleSubmit = async () => {
  try {
    let res;

    if (editData?.id) {
      res = await api.put(`/employees/${editData.id}`, { employee: form });
    } else {
      res = await api.post("/employees", { employee: form });
    }

    const savedEmployee = res.data;

    // 🔥 pass data back to parent
    onSuccess(savedEmployee);

    // Reset form ONLY for create
    if (!editData?.id) {
      setForm(initialForm);
    }
  } catch {
    alert("Error saving employee");
  }
};

//   const handleDelete = async () => {
//     if (!editData?.id) return;

//     if (window.confirm("Are you sure?")) {
//       await api.delete(`/employees/${editData.id}`);
//       onSuccess();
//     }
//   };
const handleDelete = async () => {
  if (!editData?.id) return;

  if (window.confirm("Are you sure?")) {
    await api.delete(`/employees/${editData.id}`);

    // 🔥 tell parent to refresh + clear selection
    onSuccess(null);
  }
};

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        {editData?.id ? "Edit Employee" : "Create Employee"}
      </h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-5">

        {/* FIELD */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            className="input-modern"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Job Title</label>
          <input
            className="input-modern"
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Country</label>
          <input
            className="input-modern"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Salary</label>
          <input
            className="input-modern"
            name="salary"
            value={form.salary}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Department</label>
          <input
            className="input-modern"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="input-modern"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Hire Date</label>
          <input
            type="date"
            className="input-modern"
            name="hire_date"
            value={form.hire_date}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {editData?.id ? "Update" : "Create"}
        </button>

        {editData?.id && (
          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}

        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}