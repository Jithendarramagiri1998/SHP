import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, Briefcase, Clock, Handshake, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DUMMY_JOBS = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechCorp", location: "San Francisco, CA (Hybrid)", type: "Full-time", salary: "$140k - $180k", posted: "2 days ago", tags: ["React", "TypeScript"], isWalkin: false, hasReferral: true },
  { id: 2, title: "Product Manager Walk-in Drive", company: "Innovate Inc", location: "New York, NY", type: "Full-time", salary: "$130k - $160k", posted: "1 day ago", tags: ["Agile", "SaaS"], isWalkin: true, hasReferral: false },
  { id: 3, title: "Data Scientist", company: "DataFlow", location: "Remote", type: "Contract", salary: "$120k - $150k", posted: "5 hours ago", tags: ["Python", "Machine Learning"], isWalkin: false, hasReferral: true },
  { id: 4, title: "UX Designer", company: "DesignStudio", location: "London, UK", type: "Full-time", salary: "£80k - £110k", posted: "3 days ago", tags: ["Figma", "User Research"], isWalkin: false, hasReferral: false },
  { id: 5, title: "Backend Developer Walk-in", company: "CloudSys", location: "Bangalore, IN", type: "Full-time", salary: "₹20L - ₹35L", posted: "Today", tags: ["Java", "Spring Boot", "AWS"], isWalkin: true, hasReferral: true },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
            <p className="text-muted-foreground mt-1">Find your next role, walk-in drives, and referral opportunities.</p>
          </div>
          <Button className="w-full md:w-auto">Post a Job / Referral</Button>
        </div>

        {/* Search */}
        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Job title, skills, or company" className="pl-9" />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="City, state, or Remote" className="pl-9" />
            </div>
            <Button className="md:w-32">Search</Button>
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
            {DUMMY_JOBS.map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
          
          <TabsContent value="walkins" className="m-0 space-y-4">
            {DUMMY_JOBS.filter(j => j.isWalkin).map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 space-y-4">
            {DUMMY_JOBS.filter(j => j.hasReferral).map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: any }) {
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

            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
              ))}
              <span className="text-sm font-medium text-green-600 ml-2">{job.salary}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {job.posted}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Button className="w-full">Apply Now</Button>
              {job.hasReferral && (
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary">
                  <Handshake className="h-4 w-4" /> Ask for Referral
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}