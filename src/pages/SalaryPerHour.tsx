
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const SalaryPerHour = () => {
  const [salary, setSalary] = useState<string>("");
  const [salaryType, setSalaryType] = useState<string>("monthly");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");

  const parsedSalary = salary === "" ? 0 : +salary;
  const parsedHoursPerWeek = hoursPerWeek === "" ? 40 : +hoursPerWeek;
  const parsedWeeksPerYear = weeksPerYear === "" ? 52 : +weeksPerYear;

  // Convert salary to yearly amount
  let yearlySalary = parsedSalary;
  if (salaryType === "monthly") {
    yearlySalary = parsedSalary * 12;
  } else if (salaryType === "weekly") {
    yearlySalary = parsedSalary * parsedWeeksPerYear;
  } else if (salaryType === "daily") {
    const workDaysPerWeek = parsedHoursPerWeek / 8; // Assuming 8-hour workdays
    yearlySalary = parsedSalary * workDaysPerWeek * parsedWeeksPerYear;
  }

  // Calculate total hours worked per year
  const totalHoursPerYear = parsedHoursPerWeek * parsedWeeksPerYear;
  
  // Calculate hourly rate
  const hourlyRate = totalHoursPerYear > 0 ? yearlySalary / totalHoursPerYear : 0;

  // Additional calculations
  const dailyRate = hourlyRate * (parsedHoursPerWeek / 5); // Assuming 5-day work week
  const weeklyRate = hourlyRate * parsedHoursPerWeek;
  const monthlyRate = yearlySalary / 12;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">
                Ghana Salary to Hourly Rate Converter
              </h1>
              <p className="text-gray-600 text-center text-sm">Convert your salary to hourly rate and compare different pay structures in Ghana</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Salary Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-700 font-medium">Salary amount</label>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-500 mr-2">GH₵</span>
                    <Input
                      type="number"
                      min={0}
                      value={salary}
                      onChange={e => setSalary(e.target.value)}
                      placeholder="0"
                      className="text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700 font-medium">Salary type</label>
                  <Select value={salaryType} onValueChange={setSalaryType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="text-md font-medium text-gray-800 mb-2">Work Schedule</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-700 font-medium">Hours per week</label>
                  <Input
                    type="number"
                    min={1}
                    max={168}
                    value={hoursPerWeek}
                    onChange={e => setHoursPerWeek(e.target.value)}
                    placeholder="40"
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700 font-medium">Working weeks per year</label>
                  <Input
                    type="number"
                    min={1}
                    max={52}
                    value={weeksPerYear}
                    onChange={e => setWeeksPerYear(e.target.value)}
                    placeholder="52"
                    className="text-base"
                  />
                </div>
              </div>
            </form>

            <Separator />

            <div className="text-center">
              <h2 className="text-lg font-semibold text-purple-700 mb-2">Your Hourly Rate</h2>
              <div className="text-4xl font-bold text-purple-700 mb-4">
                {ghcFormat(hourlyRate)}/hour
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Pay Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Hour</span>
                    <span className="font-medium">{ghcFormat(hourlyRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Day</span>
                    <span className="font-medium">{ghcFormat(dailyRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Week</span>
                    <span className="font-medium">{ghcFormat(weeklyRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Month</span>
                    <span className="font-medium">{ghcFormat(monthlyRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Year</span>
                    <span className="font-medium">{ghcFormat(yearlySalary)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Work Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hours per week</span>
                    <span className="font-medium">{parsedHoursPerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weeks per year</span>
                    <span className="font-medium">{parsedWeeksPerYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total hours/year</span>
                    <span className="font-medium">{totalHoursPerYear.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Days off per year</span>
                    <span className="font-medium">{52 - parsedWeeksPerYear} weeks</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800">
              <h3 className="font-semibold mb-2">💡 Helpful Tips for Ghana:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Standard full-time work is typically 40 hours/week, 52 weeks/year</li>
                <li>• Consider vacation time and holidays by reducing weeks per year</li>
                <li>• Freelancers can use this to set competitive hourly rates</li>
                <li>• Compare different job offers by converting them to hourly rates</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This calculator provides estimates based on your inputs. Actual hourly rates may vary based on benefits, overtime, and other factors.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Hourly Rate Calculations in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Converting between salary types is essential for making informed career decisions in Ghana's evolving job market. 
                Our hourly rate converter helps employees, freelancers, and employers understand the true value of different compensation 
                structures, ensuring fair negotiations and transparent employment agreements aligned with 
                <a href="https://fwsc.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> Fair Wages and Salaries Commission</a> guidelines.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Why Calculate Hourly Rates in Ghana?</h3>
              <p>
                Understanding your hourly rate provides crucial insights for career planning and financial management. Whether you're 
                comparing job offers, setting freelance rates, or evaluating part-time opportunities, hourly calculations help you 
                make informed decisions about your time's value and earning potential.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Ghana's Working Hour Standards</h3>
              <p>
                Ghana's Labour Act establishes basic working hour standards that affect hourly rate calculations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Standard Work Week:</strong> 40 hours per week (8 hours per day, 5 days)</li>
                <li><strong>Maximum Work Week:</strong> 48 hours per week with overtime provisions</li>
                <li><strong>Annual Leave:</strong> Minimum 15 working days per year</li>
                <li><strong>Public Holidays:</strong> 13 official public holidays annually</li>
                <li><strong>Overtime Rates:</strong> Time-and-a-half for hours beyond standard schedule</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Different Employment Types and Hourly Calculations</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Full-Time Employment</h4>
              <p>
                Full-time employees typically work 40 hours per week with additional benefits including SSNIT contributions, 
                paid leave, and other statutory benefits. When calculating hourly rates for full-time positions, consider 
                that total compensation includes both salary and benefits value.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Part-Time and Contract Work</h4>
              <p>
                Part-time workers in Ghana may or may not be entitled to proportional benefits depending on their employment 
                contract and hours worked. Contract workers often command higher hourly rates to compensate for lack of benefits 
                and job security.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Freelance and Consultancy Rates</h4>
              <p>
                Freelancers and consultants must factor in business expenses, irregular income, and lack of employee benefits 
                when setting hourly rates. Typical markup ranges from 25-50% above equivalent employee hourly rates to account 
                for these factors.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Factors Affecting Hourly Rate Calculations</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Vacation and Leave Time</h4>
              <p>
                When calculating effective hourly rates, account for paid vacation time, sick leave, and public holidays. 
                Employees typically receive 15-21 days of annual leave plus 13 public holidays, reducing actual working 
                weeks from 52 to approximately 45-47 weeks annually.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Benefits and Total Compensation</h4>
              <p>
                Total compensation includes salary plus benefits like:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSNIT employer contributions (13.5% of gross salary)</li>
                <li>Tier 2 pension contributions</li>
                <li>Health insurance premiums</li>
                <li>Transportation and meal allowances</li>
                <li>Professional development opportunities</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Industry-Specific Hourly Rate Considerations</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Technology and IT Services</h4>
              <p>
                Ghana's growing tech sector offers diverse opportunities with varying hourly rates. Software developers, 
                digital marketers, and IT consultants often command premium rates, especially for specialized skills 
                or international client work.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Healthcare and Professional Services</h4>
              <p>
                Medical professionals, lawyers, and other licensed practitioners typically have higher hourly rates 
                reflecting their education, certification requirements, and professional liability responsibilities.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Education and Training</h4>
              <p>
                Teachers, trainers, and educational consultants may work non-standard schedules requiring careful 
                hourly rate calculations to account for preparation time, grading, and seasonal employment patterns.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tax Implications of Different Pay Structures</h3>
              <p>
                Different payment structures may have varying tax implications under 
                <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> Ghana Revenue Authority</a> regulations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Employee Income:</strong> Subject to PAYE tax deduction by employer</li>
                <li><strong>Consultant Fees:</strong> May require quarterly advance tax payments</li>
                <li><strong>Business Income:</strong> Subject to business income tax rates</li>
                <li><strong>Allowances:</strong> Fully taxable regardless of payment structure</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Negotiating Hourly Rates and Salary Conversions</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Research Market Rates</h4>
              <p>
                Before negotiations, research comparable positions in your industry and location. Consider factors like 
                experience level, education, certifications, and specialized skills when benchmarking rates.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Consider Total Compensation Value</h4>
              <p>
                When comparing offers, calculate the total value including salary, benefits, professional development 
                opportunities, and work-life balance factors. Sometimes a lower hourly rate with better benefits 
                provides superior total compensation.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common Hourly Rate Calculation Mistakes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ignoring Vacation Time:</strong> Using 52 weeks instead of actual working weeks</li>
                <li><strong>Overlooking Benefits:</strong> Comparing only salary without considering total compensation</li>
                <li><strong>Incorrect Hour Estimates:</strong> Not accounting for actual productive vs. total hours</li>
                <li><strong>Tax Confusion:</strong> Mixing gross and net income in calculations</li>
                <li><strong>Overtime Assumptions:</strong> Assuming all extra hours are compensated equally</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Planning for Career Growth</h3>
              <p>
                Use hourly rate calculations to plan career advancement:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Set target hourly rates for different career stages</li>
                <li>Evaluate the ROI of additional training or certification</li>
                <li>Compare internal promotions vs. external opportunities</li>
                <li>Plan transitions from employment to consulting or entrepreneurship</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Benefits of Our Hourly Rate Calculator</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Flexibility:</strong> Convert between any salary types (hourly, daily, weekly, monthly, yearly)</li>
                <li><strong>Customizable:</strong> Adjust working hours and weeks to match your schedule</li>
                <li><strong>Comprehensive:</strong> Shows breakdown across all time periods</li>
                <li><strong>Ghana-Specific:</strong> Considers local working hour standards and practices</li>
                <li><strong>Free and Accessible:</strong> No registration required, works on all devices</li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-800 mb-2">Smart Career Planning</h4>
                <p className="text-blue-700">
                  Regular hourly rate calculations help you track career progress, identify opportunities for growth, 
                  and make informed decisions about job changes, skill development, and work-life balance optimization.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Considerations</h4>
                <p className="text-yellow-700 text-sm">
                  This calculator provides estimates for comparison purposes. Actual compensation may include additional 
                  benefits, bonuses, or deductions not reflected in basic hourly calculations. Consider consulting with 
                  HR professionals or financial advisors for comprehensive compensation analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalaryPerHour;
