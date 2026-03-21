import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COMPANIES = [
  { id: 1, name: "TechCorp", rating: 4.5, reviews: 1200, industry: "Technology", locations: ["San Francisco", "Remote"], benefits: ["401k", "Health", "Remote"] },
  { id: 2, name: "Innovate Inc", rating: 4.2, reviews: 850, industry: "SaaS", locations: ["New York", "London"], benefits: ["Flexible PTO", "Gym"] },
  { id: 3, name: "DataFlow", rating: 3.8, reviews: 420, industry: "AI/ML", locations: ["Remote"], benefits: ["Learning Stipend", "Equity"] },
];

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Company Reviews</h1>
          <p className="text-muted-foreground mt-1">Discover company culture, work-life balance, and employee experiences.</p>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-9" />
            </div>
            <Button className="md:w-32">Search</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES.map(company => (
            <Card key={company.id} className="hover:shadow-md transition-all border-border/60 group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl text-primary">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer">{company.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-foreground">{company.rating}</span>
                        <span>({company.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {company.industry}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.locations.join(", ")}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {company.benefits.map(benefit => (
                    <Badge key={benefit} variant="secondary" className="font-normal text-xs">{benefit}</Badge>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50">
                  <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">View Company Profile →</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}