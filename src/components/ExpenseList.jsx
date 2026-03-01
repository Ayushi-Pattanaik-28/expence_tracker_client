import { useState, useMemo } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(""); 

  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
  });

  const filteredExpenses = useMemo(() => {
    if (!selectedMonth) return expenses;

    return expenses.filter((exp) => {
      const expenseDate = new Date(exp.date);
      const year = expenseDate.getFullYear();
      const month = String(expenseDate.getMonth() + 1).padStart(2, "0");

      const expenseMonth = `${year}-${month}`;
      return expenseMonth === selectedMonth;
    });
  }, [expenses, selectedMonth]);

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
      toast("Transaction updated successfully");
      setEditingId(null);
      refresh();
    } catch (error) {
      toast("Failed to update transaction");
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-zinc-800">
      <h3 className="font-bold mb-6 text-white text-center text-2xl tracking-wide">
        Transactions
      </h3>

      {/* ✅ Month Filter */}
      <div className="mb-6 flex justify-center">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {selectedMonth && (
          <button
            onClick={() => setSelectedMonth("")}
            className="ml-3 bg-zinc-600 hover:bg-zinc-500 text-white px-3 py-2 rounded-lg text-sm"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-zinc-400">
            No transactions for selected month.
          </p>
        ) : (
          filteredExpenses.map((exp) => (
            <div
              key={exp._id}
              className="bg-white/5 border border-zinc-700 rounded-xl p-4 hover:bg-zinc-750 transition"
            >
              {editingId === exp._id ? (
                <div className="grid md:grid-cols-5 gap-3 items-center">
                  <select
                    className="bg-zinc-900 border border-zinc-700 text-white p-2 rounded-lg"
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
                    className="bg-zinc-900 border border-zinc-700 text-white p-2 rounded-lg"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />

                  <input
                    className="bg-zinc-900 border border-zinc-700 text-white p-2 rounded-lg"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />

                  <input
                    className="bg-zinc-900 border border-zinc-700 text-white p-2 rounded-lg"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(exp._id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-zinc-600 hover:bg-zinc-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {exp.category}
                    </p>
                    <p className="text-sm text-zinc-400">{exp.description}</p>
                    <p className="text-xs text-zinc-500">
                      {new Date(exp.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-bold ${
                        exp.type === "income"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      ₹ {exp.amount}
                    </span>

                    <button
                      onClick={() => startEdit(exp)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => +handleDelete(exp._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
