import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, DollarSign, Building, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useStore, Salary } from "@/lib/store";
import { useState, useMemo } from "react";

export default function SalariesPage() {
  const { salaries } = useStore();
  const [roleTerm, setRoleTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const filteredSalaries = salaries.filter(s => {
    const matchesRole = s.title.toLowerCase().includes(roleTerm.toLowerCase());
    const matchesLocation = s.location.toLowerCase().includes(locationTerm.toLowerCase());
    return matchesRole && matchesLocation;
  });

  const avgBase = filteredSalaries.length > 0
    ? Math.round(filteredSalaries.reduce((acc, curr) => acc + curr.base, 0) / filteredSalaries.length)
    : 0;

  const lowBase = filteredSalaries.length > 0 ? Math.min(...filteredSalaries.map(s => s.base)) : 0;
  const highBase = filteredSalaries.length > 0 ? Math.max(...filteredSalaries.map(s => s.base)) : 0;

  // Chart data based on YoE
  const chartData = useMemo(() => {
    if (filteredSalaries.length === 0) return [];
    
    const buckets = {
      "0-2 Yrs": [] as number[],
      "3-5 Yrs": [] as number[],
      "6-8 Yrs": [] as number[],
      "9+ Yrs": [] as number[]
    };

    filteredSalaries.forEach(s => {
      if (s.yoe <= 2) buckets["0-2 Yrs"].push(s.base);
      else if (s.yoe <= 5) buckets["3-5 Yrs"].push(s.base);
      else if (s.yoe <= 8) buckets["6-8 Yrs"].push(s.base);
      else buckets["9+ Yrs"].push(s.base);
    });

    return Object.entries(buckets).map(([name, values]) => ({
      name,
      avg: values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0
    })).filter(b => b.avg > 0);
  }, [filteredSalaries]);

  // Compute top paying companies
  const topPayingCompanies = useMemo(() => {
    const companyAverages: Record<string, { total: number, count: number }> = {};
    salaries.forEach(s => {
      if (!companyAverages[s.company]) {
        companyAverages[s.company] = { total: 0, count: 0 };
      }
      companyAverages[s.company].total += (s.base + s.bonus + s.stock);
      companyAverages[s.company].count += 1;
    });

    return Object.entries(companyAverages)
      .map(([name, data]) => ({
        name,
        pay: `$${Math.round(data.total / data.count / 1000)}k`
      }))
      .sort((a, b) => {
        const valA = parseInt(a.pay.replace(/[^0-9]/g, ''));
        const valB = parseInt(b.pay.replace(/[^0-9]/g, ''));
        return valB - valA;
      })
      .slice(0, 5);
  }, [salaries]);

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Salary Insights</h1>
          <p className="text-muted-foreground mt-1">Make sure you're paid fairly. Compare salaries based on real community data.</p>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Job Title (e.g. Software Engineer)" 
                className="pl-9" 
                value={roleTerm}
                onChange={(e) => setRoleTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Location" 
                className="pl-9" 
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {roleTerm ? `${roleTerm} Salaries` : "All Salaries"} {locationTerm && `in ${locationTerm}`}
                </CardTitle>
                <CardDescription>Based on {filteredSalaries.length} reported salaries</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSalaries.length > 0 ? (
                  <>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-secondary/30 rounded-xl">
                      <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Base Pay</p>
                        <p className="text-4xl font-bold text-primary mt-1">${avgBase.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">/ yr</p>
                      </div>
                      <div className="w-full md:w-1/2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Low (${(lowBase/1000).toFixed(0)}k)</span>
                          <span className="font-medium text-primary">Avg (${(avgBase/1000).toFixed(0)}k)</span>
                          <span className="text-muted-foreground">High (${(highBase/1000).toFixed(0)}k)</span>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                          <div className="h-full bg-primary/30 w-[20%]"></div>
                          <div className="h-full bg-primary w-[30%]"></div>
                          <div className="h-full bg-primary/30 w-[50%]"></div>
                        </div>
                      </div>
                    </div>

                    {chartData.length > 0 && (
                      <div className="h-[250px] w-full mt-6">
                        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Salary by Experience</h4>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(value) => `$${value/1000}k`} axisLine={false} tickLine={false} />
                            <Tooltip 
                              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Base Salary']}
                              cursor={{fill: 'rgba(0,0,0,0.05)'}}
                            />
                            <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No salary data available for these filters.</p>
                    <p className="mt-2 text-sm">Be the first to contribute!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Top Paying Companies</CardTitle>
                <CardDescription>Based on total compensation reported by users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPayingCompanies.length > 0 ? (
                  topPayingCompanies.map((co, i) => (
                    <div key={co.name} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {i + 1}
                        </div>
                        <span className="font-medium">{co.name}</span>
                      </div>
                      <span className="font-bold text-green-600">{co.pay}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No data available yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}