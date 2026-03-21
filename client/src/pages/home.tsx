import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase, Clock, Handshake, AlertCircle, MessageSquare, TrendingUp, Users, UserCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export default function Home() {
  const { jobs, salaries, interviews } = useStore();

  const recentJobs = [...jobs].reverse().slice(0, 5);
  const recentInterviews = [...interviews].reverse().slice(0, 5);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Minimal Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Your Gateway to a <span className="text-primary">Better Career</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover community-contributed job openings, verify your worth with salary insights, and prepare with real interview experiences.
          </p>
        </div>
      </section>

      {/* Main Content Grid (Recent & Top Only) */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Recent Job Openings
                </h2>
              </div>
              <div className="space-y-4">
                {recentJobs.length > 0 ? (
                  recentJobs.map(job => (
                    <Card key={job.id} className="hover:shadow-md transition-all border-border/60">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <div className="flex gap-2">
                              {job.isWalkin && <Badge variant="destructive" className="text-[10px]">Walk-in</Badge>}
                              {job.hasReferral && <Badge variant="default" className="text-[10px]">Referral</Badge>}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground"><Building2 className="h-4 w-4" /> {job.company}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                          </div>
                          {job.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{job.description}</p>
                          )}

                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2 bg-muted/20 p-2 rounded-md">
                            <span className="flex items-center gap-1"><UserCircle className="h-3 w-3" /> {job.authorName}</span>
                            <span>•</span>
                            <span>{job.authorExperience} at {job.authorCompany}</span>
                          </div>

                          <div className="pt-3 border-t flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {job.posted}</span>
                            <Button size="sm" variant={job.hasReferral ? "outline" : "default"}>
                              {job.hasReferral ? "Request Referral" : "Apply"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 border rounded-xl bg-card text-muted-foreground">
                    No recent jobs posted.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Interviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  Latest Interview Insights
                </h2>
              </div>
              <div className="space-y-4">
                {recentInterviews.length > 0 ? (
                  recentInterviews.map(interview => (
                    <Card key={interview.id} className="hover:shadow-md transition-all border-border/60">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{interview.role}</h3>
                              <p className="text-sm font-medium text-foreground flex items-center gap-1 mt-1">
                                <Building2 className="h-4 w-4" /> {interview.company} ({interview.level})
                              </p>
                            </div>
                            <Badge variant={interview.difficulty === 'Hard' ? 'destructive' : 'secondary'}>{interview.difficulty}</Badge>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-md border text-sm text-muted-foreground line-clamp-3">
                            <span className="font-semibold text-foreground mr-1">Process:</span> 
                            {interview.process}
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2 bg-muted/20 p-2 rounded-md">
                            <span className="flex items-center gap-1"><UserCircle className="h-3 w-3" /> {interview.authorName}</span>
                            <span>•</span>
                            <span>{interview.authorExperience} at {interview.authorCompany}</span>
                          </div>

                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 border rounded-xl bg-card text-muted-foreground">
                    No recent interview insights.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Paying Companies */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                Top Paying Companies
              </h2>
            </div>
            <Card className="border-border/60 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {topPayingCompanies.length > 0 ? (
                    topPayingCompanies.map((co, i) => (
                      <div key={co.name} className="flex flex-col p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-muted-foreground font-bold text-sm">#{i + 1}</span>
                          <span className="font-semibold text-lg">{co.name}</span>
                        </div>
                        <span className="font-bold text-2xl text-green-600">{co.pay}</span>
                        <span className="text-xs text-muted-foreground mt-1">Avg Total Comp</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-6 text-muted-foreground">
                      Contribute salary details to see top paying companies here.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}