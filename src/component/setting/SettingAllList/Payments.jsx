
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const Nevigate = useNavigate()
  const [showUPI, setShowUPI] = useState(false)
  const [transactions] = useState([
    {
      id: 1,
      name: "Rahul",
      amount: "₹500",
      type: "Received",
      date: "Today",
    },
    {
      id: 2,
      name: "Amit",
      amount: "₹250",
      type: "Sent",
      date: "Yesterday",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#efeae2]">

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-4 bg-[#008069] px-4 py-4 text-white">

        <button
          onClick={() => Nevigate("/chat")}
          className="text-2xl transition hover:scale-110"
        >
          ←
        </button>

        <div>
          <h1 className="text-lg font-semibold">
            Payments
          </h1>

          <p className="text-xs text-white/80">
            Send and receive money
          </p>
        </div>

      </div>

      {/* UPI Section */}
      <div className="bg-white px-5 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9fdd3] text-2xl">
            ₹
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-800">
              WhatsApp Payments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Secure payments with UPI
            </p>
          </div>

          <span className="text-green-600">
            ✓
          </span>

        </div>

        <button
          onClick={() => setShowUPI(true)}
          className="mt-5 w-full rounded-lg bg-[#008069] py-3 font-semibold text-white transition hover:bg-[#006e5c]"
        >
          Set up UPI
        </button>

      </div>

      {/* Send / Receive */}
      <div className="mt-2 bg-white">

        <div className="grid grid-cols-2 divide-x">

          <button className="flex flex-col items-center gap-2 px-4 py-5 hover:bg-gray-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9fdd3] text-xl">
              ↑
            </div>

            <span className="text-sm font-medium text-gray-700">
              Send Money
            </span>
          </button>

          <button className="flex flex-col items-center gap-2 px-4 py-5 hover:bg-gray-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9fdd3] text-xl">
              ↓
            </div>

            <span className="text-sm font-medium text-gray-700">
              Request Money
            </span>
          </button>

        </div>

      </div>

      {/* Bank Account */}
      <div className="mt-2 bg-white px-5 py-5">

        <p className="mb-4 text-sm font-semibold text-gray-500">
          PAYMENT METHODS
        </p>

        <button className="flex w-full items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-xl">
            🏦
          </div>

          <div className="flex-1 text-left">
            <h3 className="font-medium text-gray-800">
              Bank Account
            </h3>

            <p className="text-xs text-gray-500">
              Add or manage bank account
            </p>
          </div>

          <span className="text-xl text-gray-400">
            ›
          </span>

        </button>

      </div>

      {/* Transaction History */}
      <div className="mt-2 bg-white">

        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-gray-500">
            RECENT TRANSACTIONS
          </p>
        </div>

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-3 border-t px-5 py-4"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              👤
            </div>

            <div className="flex-1">

              <h3 className="font-medium text-gray-800">
                {transaction.name}
              </h3>

              <p className="text-xs text-gray-500">
                {transaction.type} • {transaction.date}
              </p>

            </div>

            <p
              className={`font-semibold ${transaction.type === "Received"
                ? "text-green-600"
                : "text-gray-800"
                }`}
            >
              {transaction.type === "Received"
                ? "+"
                : "-"}
              {transaction.amount}
            </p>

          </div>
        ))}

      </div>

      {/* UPI Modal */}
      {showUPI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-semibold">
                Set up UPI
              </h2>

              <button
                onClick={() => setShowUPI(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>

            </div>

            <div className="mt-6 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#d9fdd3] text-4xl">
                ₹
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Add your bank account to start
                sending and receiving money.
              </p>

            </div>

            <button
              onClick={() => setShowUPI(false)}
              className="mt-6 w-full rounded-full bg-[#008069] py-3 font-semibold text-white"
            >
              Continue
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Payments;

