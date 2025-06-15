
import React from "react";

interface Props {
  netIncome: number;
  incomeTax: number;
  ssnit: number;
}

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const NetIncomeResult: React.FC<Props> = ({ netIncome, incomeTax, ssnit }) => (
  <div className="w-full flex flex-col items-center gap-1">
    <div className="text-center text-sm font-medium text-purple-700">Net Income (take home)</div>
    <div className="text-3xl font-extrabold text-purple-700 tracking-wider mb-2">{ghcFormat(netIncome)}</div>
    <div className="flex flex-row justify-center gap-8 mt-2">
      <div className="text-xs text-gray-600 flex flex-col items-center">
        <span>Income Tax</span>
        <span className="text-base font-bold text-blue-700">{ghcFormat(incomeTax)}</span>
      </div>
      <div className="text-xs text-gray-600 flex flex-col items-center">
        <span>SSNIT</span>
        <span className="text-base font-bold text-blue-700">{ghcFormat(ssnit)}</span>
      </div>
    </div>
  </div>
);

export default NetIncomeResult;
