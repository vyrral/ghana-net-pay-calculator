// LoanCalculator.tsx
import React, { useState } from "react";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(18);
  const [loanTerm, setLoanTerm] = useState(3); // in years

  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  const monthlyPayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));

  const totalRepayment = monthlyPayment * totalPayments;
  const totalInterest = totalRepayment - loanAmount;

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Loan Repayment Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Loan Amount (GHS)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-gray-300 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block font-medium">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-gray-300 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block font-medium">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-gray-300 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 space-y-2">
        <div className="flex justify-between">
          <span>Monthly Payment:</span>
          <span className="font-semibold">GHS {monthlyPayment.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Repayment:</span>
          <span className="font-semibold">GHS {totalRepayment.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Interest:</span>
          <span className="font-semibold text-red-500">GHS {totalInterest.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
