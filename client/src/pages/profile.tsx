import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, TrendingUp, Users, MapPin, Clock, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const { jobs, salaries, interviews } = useStore();
  const [activeTab, setActiveTab] = useState("jobs");

  const myJobs = jobs.filter(j => j.author === 'currentUser');
  const mySalaries = salaries.filter(s => s.author === 'currentUser');
  const myInterviews = interviews.filter(i => i.author === 'currentUser');

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Contributions</h1>
          <p className="text-muted-foreground mt-1">Manage the jobs, salaries, and interview insights you've shared with the community.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            <TabsTrigger value="jobs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <Briefcase className="h-4 w-4" /> Jobs ({myJobs.length})
            </TabsTrigger>
            <TabsTrigger value="salaries" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <TrendingUp className="h-4 w-4" /> Salaries ({mySalaries.length})
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <Users className="h-4 w-4" /> Interviews ({myInterviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="m-0 space-y-4">
            {myJobs.length === 0 ? (
              <EmptyState message="You haven't posted any jobs yet." />
            ) : (
              myJobs.map(job => (
                <Card key={job.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          {job.isWalkin && <Badge variant="destructive" className="text-[10px]">Walk-in</Badge>}
                          {job.hasReferral && <Badge variant="default" className="text-[10px]">Offering Referral</Badge>}
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.posted}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="salaries" className="m-0 space-y-4">
             {mySalaries.length === 0 ? (
              <EmptyState message="You haven't shared your salary yet." />
            ) : (
              mySalaries.map(salary => (
                <Card key={salary.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{salary.title} at {salary.company}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                          <span>{salary.yoe} YOE</span>
                          <span>•</span>
                          <span className="font-medium text-green-600">${salary.base.toLocaleString()} Base</span>
                          {salary.bonus > 0 && <span>+ ${salary.bonus.toLocaleString()} Bonus</span>}
                          {salary.stock > 0 && <span>+ ${salary.stock.toLocaleString()} Stock</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 space-y-4">
             {myInterviews.length === 0 ? (
              <EmptyState message="You haven't shared any interview experiences yet." />
            ) : (
              myInterviews.map(interview => (
                <Card key={interview.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{interview.role} at {interview.company}</h3>
                        <Badge variant="outline">{interview.difficulty}</Badge>
                        <Badge variant={interview.outcome === 'Offer' ? 'default' : 'secondary'}>{interview.outcome}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{interview.process}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 border border-dashed rounded-xl bg-card">
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button variant="outline" onClick={() => window.location.href = '/contribute'}>Make a Contribution</Button>
    </div>
  )
}