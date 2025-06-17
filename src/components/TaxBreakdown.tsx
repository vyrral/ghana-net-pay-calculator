import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

type BreakdownEntry = { label: string; amount: number; };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: {
    gross: number;
    ssnit: number;
    tier2: number;
    taxable: number;
    incomeTax: number;
    netIncome: number;
    breakdown: BreakdownEntry[];
  };
}

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const downloadPDF = (results: Props["results"]) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Tax Breakdown", 14, 16);

  doc.setFontSize(12);
  let y = 28;
  doc.text("See how your monthly salary tax is calculated.", 14, y);

  y += 10;
  doc.text(`Gross Income: ${ghcFormat(results.gross)}`, 14, y);
  y += 8;
  doc.text(`SSNIT (Tier 1, 5.5%): ${ghcFormat(results.ssnit)}`, 14, y);
  y += 8;
  doc.text(`Tax Relief: ${ghcFormat(results.gross - results.ssnit - results.taxable)}`, 14, y);
  y += 8;
  doc.text(`Taxable Income (for PAYE): ${ghcFormat(results.taxable)}`, 14, y);
  y += 8;
  doc.text(`Pension (Tier 2, 5%): ${ghcFormat(results.tier2)}`, 14, y);

  y += 12;
  doc.setFont(undefined, "bold");
  doc.text("Tax Band Application:", 14, y);
  doc.setFont(undefined, "normal");
  y += 8;

  doc.text("Band", 14, y);
  doc.text("Amount", 80, y);
  y += 6;

  results.breakdown.forEach((b) => {
    doc.text(b.label, 14, y);
    doc.text(ghcFormat(b.amount), 80, y);
    y += 6;
  });

  y += 8;
  doc.setFont(undefined, "bold");
  doc.text(`Net Income: ${ghcFormat(results.netIncome)}`, 14, y);

  doc.save("tax_breakdown.pdf");
};

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
          <span className="text-gray-600">SSNIT (Tier 1, 5.5%)</span>
          <span className="font-medium">{ghcFormat(results.ssnit)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Tax Relief</span>
          <span className="font-medium">{ghcFormat(results.gross - results.ssnit - results.taxable)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Taxable Income (for PAYE)</span>
          <span className="font-medium">{ghcFormat(results.taxable)}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-gray-600">Pension (Tier 2, 5%)</span>
          <span className="font-medium">{ghcFormat(results.tier2)}</span>
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
      <div className="flex justify-end mt-6 gap-2">
        <Button
          variant="outline"
          onClick={() => downloadPDF(results)}
        >
          Download PDF
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);

export default TaxBreakdown;
