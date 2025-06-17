
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

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
        <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">Salary Per Hour Converter</h2>
            <p className="text-gray-600 text-center text-sm">Convert your salary to hourly rate and compare different pay structures</p>
          </div>

          <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
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
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Your Hourly Rate</h3>
            <div className="text-4xl font-bold text-purple-700 mb-4">
              {ghcFormat(hourlyRate)}/hour
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Breakdown</CardTitle>
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
                <CardTitle className="text-lg text-purple-700">Work Details</CardTitle>
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
            <h4 className="font-semibold mb-2">💡 Helpful Tips:</h4>
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
      </main>
    </div>
  );
};

export default SalaryPerHour;
