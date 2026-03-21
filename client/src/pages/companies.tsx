import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo, useState } from "react";

export default function CompaniesPage() {
  const { jobs, salaries, interviews } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Aggregate company data from store
  const aggregatedCompanies = useMemo(() => {
    const companiesMap = new Map();

    const addCompanyInteraction = (companyName: string, location: string) => {
      if (!companyName) return;
      const normalizedName = companyName.trim();
      
      if (!companiesMap.has(normalizedName)) {
        companiesMap.set(normalizedName, {
          name: normalizedName,
          locations: new Set(),
          jobsCount: 0,
          salariesCount: 0,
          interviewsCount: 0,
          totalInteractions: 0
        });
      }
      
      const comp = companiesMap.get(normalizedName);
      if (location) {
        comp.locations.add(location);
      }
      comp.totalInteractions++;
      return comp;
    };

    jobs.forEach(j => {
      const comp = addCompanyInteraction(j.company, j.location);
      if (comp) comp.jobsCount++;
    });

    salaries.forEach(s => {
      const comp = addCompanyInteraction(s.company, s.location);
      if (comp) comp.salariesCount++;
    });

    interviews.forEach(i => {
      // Interviews don't have location in our schema yet, but we track the company
      const comp = addCompanyInteraction(i.company, "");
      if (comp) comp.interviewsCount++;
    });

    return Array.from(companiesMap.values()).map(c => ({
      ...c,
      locations: Array.from(c.locations).slice(0, 3) // Show up to 3 locations
    })).sort((a, b) => b.totalInteractions - a.totalInteractions);

  }, [jobs, salaries, interviews]);

  const filteredCompanies = aggregatedCompanies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-1">Explore companies based on user contributions: jobs, salaries, and interviews.</p>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search companies..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>No companies found.</p>
              <p className="mt-2 text-sm">Contribute jobs, salaries, or interviews to see companies here.</p>
            </div>
          ) : (
            filteredCompanies.map((company, index) => (
              <Card key={index} className="hover:shadow-md transition-all border-border/60 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl text-primary">
                        {company.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer">{company.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{company.totalInteractions} total contributions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.locations.length > 0 && (
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> 
                        {company.locations.join(", ")}
                        {company.locations.length === 3 ? "..." : ""}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {company.jobsCount > 0 && (
                      <Badge variant="secondary" className="font-normal text-xs">{company.jobsCount} Jobs</Badge>
                    )}
                    {company.salariesCount > 0 && (
                      <Badge variant="secondary" className="font-normal text-xs">{company.salariesCount} Salaries</Badge>
                    )}
                    {company.interviewsCount > 0 && (
                      <Badge variant="secondary" className="font-normal text-xs">{company.interviewsCount} Interviews</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}