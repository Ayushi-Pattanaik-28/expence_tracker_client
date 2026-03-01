import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await api.get("/expense/");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold text-green-600">₹ {balance}</p>
          <div className="flex gap-6 mt-3">
            <p className="text-green-500">Income: ₹ {totalIncome}</p>
            <p className="text-red-500">Expense: ₹ {totalExpense}</p>
          </div>
        </div>

        <ExpenseForm onSuccess={fetchExpenses} />
        <ExpenseList expenses={expenses} refresh={fetchExpenses} />
      </div>
    </div>
  );
}
