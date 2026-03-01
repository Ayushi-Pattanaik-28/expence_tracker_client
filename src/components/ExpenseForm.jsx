import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!form.amount || !form.category) {
      toast("Amount and Category are required");
      return;
    }

    try {
      await api.post("/expense/", form);

      toast("Transaction added successfully");

      setForm({
        type: "expense",
        amount: "",
        category: "",
        description: "",
      });

      onSuccess();
    } catch (error) {
      toast("Failed to add transaction");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="font-semibold mb-2">Add Transaction</h3>

      <div className="grid md:grid-cols-4 gap-3">
        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}