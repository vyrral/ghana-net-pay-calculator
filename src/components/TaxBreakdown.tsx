
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BreakdownEntry = { label: string; amount: number; };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: {
    gross: number;
    ssnit: number;
    taxable: number;
    incomeTax: number;
    netIncome: number;
    breakdown: BreakdownEntry[];
  };
}

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const TaxBreakdown: React.FC<Props> = ({ open, onOpenChange, results }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Tax Breakdown</DialogTitle>
        <DialogDescription>
          See how your monthly salary tax is calculated.
        </DialogDescription>
      </DialogHeader>
      <ul className="divide-y divide-gray-200 mt-4">
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Gross Income</span>
          <span className="font-medium">{ghcFormat(results.gross)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">SSNIT (5.5%)</span>
          <span className="font-medium">{ghcFormat(results.ssnit)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Tax Relief</span>
          <span className="font-medium">{ghcFormat(results.taxable + results.ssnit - results.gross)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Taxable Income</span>
          <span className="font-medium">{ghcFormat(results.taxable)}</span>
        </li>
      </ul>
      <div className="mt-4">
        <div className="font-semibold text-sm mb-2 text-gray-800">Tax Band Application:</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-1 text-left font-medium text-gray-600">Band</th>
              <th className="px-2 py-1 text-right font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {results.breakdown.map((b, i) => (
              <tr key={i}>
                <td className="px-2 py-0.5">{b.label}</td>
                <td className="px-2 py-0.5 text-right">{ghcFormat(b.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);

export default TaxBreakdown;
