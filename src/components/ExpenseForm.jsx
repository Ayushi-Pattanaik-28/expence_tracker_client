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
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Transaction</h3>

      <div className="grid md:grid-cols-4 gap-4">
        <select
          className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 outline-none"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 outline-none"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 outline-none"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 outline-none"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Add Transaction
      </button>
    </div>
  );
}