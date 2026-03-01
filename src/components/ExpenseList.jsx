import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expense/${id}`);
      toast("Transaction deleted successfully");
      refresh();
    } catch (error) {
      toast("Failed to delete transaction");
    }
  };

  const startEdit = (exp) => {
    setEditingId(exp._id);
    setFormData({
      type: exp.type,
      amount: exp.amount,
      category: exp.category,
      description: exp.description,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/expense/${id}`, formData);
      toast("Transaction updated successfully ");
      setEditingId(null);
      refresh();
    } catch (error) {
      toast("Failed to update transaction");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Transactions</h3>

      {expenses.map((exp) => (
        <div key={exp._id} className="border-b py-3">
          {editingId === exp._id ? (
            <div className="grid md:grid-cols-5 gap-2 items-center">
              <select
                className="border p-1 rounded"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <input
                type="number"
                className="border p-1 rounded"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />

              <input
                className="border p-1 rounded"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <input
                className="border p-1 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(exp._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{exp.category}</p>
                <p className="text-sm text-gray-500">{exp.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-bold ${
                    exp.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹ {exp.amount}
                </span>

                <button
                  onClick={() => startEdit(exp)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
