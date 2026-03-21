import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, Briefcase, Clock, Handshake, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore, Job } from "@/lib/store";
import { useState } from "react";

export default function JobsPage() {
  const { jobs } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
            <p className="text-muted-foreground mt-1">Find your next role, walk-in drives, and referral opportunities.</p>
          </div>
          <Link href="/contribute?tab=job">
            <Button className="w-full md:w-auto">Post a Job / Referral</Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Job title, skills, or company" 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="City, state, or Remote" 
                className="pl-9" 
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">All Jobs</TabsTrigger>
            <TabsTrigger value="walkins" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
              Walk-in Drives
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
              Need Referral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0 space-y-4">
            {filteredJobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No jobs found matching your criteria.</p>
            ) : (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>
          
          <TabsContent value="walkins" className="m-0 space-y-4">
            {filteredJobs.filter(j => j.isWalkin).length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No walk-in drives found.</p>
            ) : (
              filteredJobs.filter(j => j.isWalkin).map(job => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 space-y-4">
            {filteredJobs.filter(j => j.hasReferral).length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No referral opportunities found.</p>
            ) : (
              filteredJobs.filter(j => j.hasReferral).map(job => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="space-y-3 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors cursor-pointer">{job.title}</h3>
                {job.isWalkin && <Badge variant="destructive" className="text-[10px]">Walk-in</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-foreground"><Building2 className="h-4 w-4" /> {job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
              </div>
            </div>

            {job.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{job.description}</p>
            )}
          </div>
          
          <div className="flex flex-col items-start md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 min-w-[200px]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {job.posted}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Button className="w-full" asChild>
                <a href={job.url || "#"} target="_blank" rel="noopener noreferrer">Apply Now</a>
              </Button>
              {job.hasReferral && (
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary">
                  <Handshake className="h-4 w-4" /> Request Referral
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}