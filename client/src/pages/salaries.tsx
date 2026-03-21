import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, DollarSign, Building, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "0-2 Yrs", avg: 90000 },
  { name: "3-5 Yrs", avg: 130000 },
  { name: "6-8 Yrs", avg: 165000 },
  { name: "9+ Yrs", avg: 210000 },
];

export default function SalariesPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Salary Insights</h1>
          <p className="text-muted-foreground mt-1">Make sure you're paid fairly. Compare salaries by role, location, and experience.</p>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Job Title (e.g. Software Engineer)" className="pl-9" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Location" className="pl-9" />
            </div>
            <Button className="w-full">Search Salaries</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Software Engineer Salaries in San Francisco
                </CardTitle>
                <CardDescription>Based on 1,245 reported salaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-secondary/30 rounded-xl">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Base Pay</p>
                    <p className="text-4xl font-bold text-primary mt-1">$145,000</p>
                    <p className="text-sm text-muted-foreground mt-1">/ yr</p>
                  </div>
                  <div className="w-full md:w-1/2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low ($110k)</span>
                      <span className="font-medium text-primary">Avg ($145k)</span>
                      <span className="text-muted-foreground">High ($220k+)</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary/30 w-[20%]"></div>
                      <div className="h-full bg-primary w-[30%]"></div>
                      <div className="h-full bg-primary/30 w-[50%]"></div>
                    </div>
                  </div>
                </div>

                <div className="h-[250px] w-full mt-6">
                  <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Salary by Experience</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Salary']}
                        cursor={{fill: 'rgba(0,0,0,0.05)'}}
                      />
                      <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Top Paying Companies</CardTitle>
                <CardDescription>For Software Engineer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Netflix", pay: "$180k" },
                  { name: "Meta", pay: "$175k" },
                  { name: "Google", pay: "$165k" },
                  { name: "Stripe", pay: "$160k" },
                  { name: "Apple", pay: "$155k" },
                ].map((co, i) => (
                  <div key={co.name} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </div>
                      <span className="font-medium">{co.name}</span>
                    </div>
                    <span className="font-bold text-green-600">{co.pay}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}