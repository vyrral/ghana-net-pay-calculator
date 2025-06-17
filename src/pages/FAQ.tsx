
import Navigation from "@/components/Navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate are the tax calculations?",
      answer: "Our calculator uses the most current Ghana tax bands and rates as of 2024. However, this tool is for informational purposes only. For official calculations, please consult with a qualified tax professional or the Ghana Revenue Authority."
    },
    {
      question: "What is SSNIT and how is it calculated?",
      answer: "SSNIT (Social Security and National Insurance Trust) is Ghana's social security scheme. It's calculated as 5.5% of your gross monthly income. This contribution helps secure your pension and provides social security benefits."
    },
    {
      question: "What is Tier 2 pension and is it mandatory?",
      answer: "Tier 2 is the mandatory occupational pension scheme in Ghana. It's calculated as 5% of your gross monthly income. Unlike SSNIT, Tier 2 is managed by private pension fund managers approved by the National Pensions Regulatory Authority."
    },
    {
      question: "How do allowances affect my tax calculation?",
      answer: "Allowances are added to your basic salary to calculate your gross income. They are fully taxable and subject to PAYE income tax. Common allowances include housing, transport, and utility allowances."
    },
    {
      question: "What types of tax relief can I claim?",
      answer: "Tax relief reduces your taxable income. Common reliefs include dependent spouse relief, child education relief, disabled dependent relief, and life insurance premium relief. The specific amounts and conditions are set by the Ghana Revenue Authority."
    },
    {
      question: "Why is my net income different from what I expected?",
      answer: "Your net income is calculated as: Gross Income - SSNIT (5.5%) - PAYE Income Tax. Note that Tier 2 (5%) is shown separately but typically deducted by employers. If your calculation differs significantly, check if all allowances and reliefs are correctly entered."
    },
    {
      question: "Can I use this calculator for annual tax calculations?",
      answer: "This calculator is designed for monthly salary calculations. For annual calculations, you would need to multiply the monthly results by 12, but keep in mind that annual tax calculations may have different considerations like annual reliefs and bonuses."
    },
    {
      question: "What are the current tax bands in Ghana?",
      answer: "The 2024 Ghana tax bands are: First GH₵ 494 (0%), Next GH₵ 110 (5%), Next GH₵ 130 (10%), Next GH₵ 3,167 (17.5%), Next GH₵ 356 (25%), and anything above GH₵ 4,257 (30%)."
    },
    {
      question: "Is my personal information stored when I use this calculator?",
      answer: "No, we do not store any personal or financial information you enter into the calculator. All calculations are performed locally in your browser, ensuring your privacy and data security."
    },
    {
      question: "Can I save or print my tax calculation results?",
      answer: "Currently, the calculator displays results on screen. You can take a screenshot or manually record the information. We recommend keeping records of your calculations for personal reference."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions - Ghana Tax Calculator
          </h1>
          
          <p className="text-gray-600 mb-8">
            Find answers to common questions about our Ghana salary calculator, PAYE tax calculations, and SSNIT contributions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Common Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-6 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              If you can't find the answer you're looking for, feel free to contact us directly.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
