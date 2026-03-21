import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase, Clock, UserCircle, Users, Handshake, Star, TrendingUp, ClipboardList, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { Link } from "wouter";

export default function Home() {
  const { jobs, salaries, interviews, referrals, cultures, hrFeedbacks } = useStore();

  const recentJobs = [...jobs].reverse().slice(0, 5);
  const recentInterviews = [...interviews].reverse().slice(0, 5);
  const recentReferrals = [...referrals].reverse().slice(0, 5);
  const recentCultures = [...cultures].reverse().slice(0, 5);
  const recentHrFeedbacks = [...hrFeedbacks].reverse().slice(0, 5);

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

  const SectionHeader = ({ title, icon: Icon, link }: { title: string, icon: any, link: string }) => (
    <div className="flex items-center justify-between mb-8 border-b-2 border-foreground pb-4">
      <h2 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-wider">
        <Icon className="h-6 w-6" />
        {title}
      </h2>
      <Link href={link}>
        <Button variant="ghost" className="gap-2 uppercase text-xs tracking-widest font-bold hover:bg-foreground hover:text-background rounded-none">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Brutalist Hero Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 border-b-4 border-foreground bg-background pattern-grid">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-none uppercase">
              The Truth <br/>About Tech <br/><span className="text-background bg-foreground px-4 italic block w-max mt-2">Careers</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl font-medium border-l-4 border-foreground pl-6 py-2 uppercase tracking-wide">
              Real jobs. Real salaries. Real interview experiences. By the community, for the community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl space-y-24">
          
          {/* JOBS SECTION */}
          <div>
            <SectionHeader title="Latest Job Openings" icon={Briefcase} link="/jobs?tab=jobs" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentJobs.length > 0 ? (
                recentJobs.map(job => (
                  <Card key={job.id} className="border-2 border-foreground rounded-none hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-background">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full justify-between gap-6">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight">{job.title}</h3>
                            {job.isWalkin && <Badge variant="outline" className="border-2 border-foreground rounded-none uppercase text-[10px] font-bold">Walk-in</Badge>}
                          </div>
                          <div className="space-y-2 text-sm font-medium uppercase tracking-wide">
                            <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {job.company}</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t-2 border-foreground/20 flex justify-between items-center">
                          <div className="text-xs uppercase tracking-wider font-bold">
                            By {job.authorName}
                          </div>
                          <Button size="sm" className="rounded-none uppercase font-bold text-xs tracking-widest">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No jobs posted yet.</div>
              )}
            </div>
          </div>

          {/* INTERVIEWS SECTION */}
          <div>
            <SectionHeader title="Interview Insights" icon={Users} link="/jobs?tab=interviews" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentInterviews.length > 0 ? (
                recentInterviews.map(interview => (
                  <Card key={interview.id} className="border-2 border-foreground rounded-none bg-background">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="bg-foreground text-background p-6 sm:w-1/3 flex flex-col justify-between">
                          <div>
                            <Badge variant="secondary" className="rounded-none uppercase font-bold text-xs bg-background text-foreground mb-4">{interview.difficulty}</Badge>
                            <h3 className="text-xl font-bold uppercase">{interview.role}</h3>
                            <p className="mt-2 font-medium opacity-80">{interview.company}</p>
                          </div>
                          <div className="mt-8 font-bold uppercase text-sm tracking-widest">
                            {interview.outcome}
                          </div>
                        </div>
                        <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-2">Process</h4>
                            <p className="text-sm font-medium leading-relaxed line-clamp-3 mb-4">{interview.process}</p>
                          </div>
                          <div className="pt-4 border-t-2 border-foreground/10 text-xs font-bold uppercase tracking-wider">
                            Shared by {interview.authorName}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No interviews posted yet.</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* REFERRALS SECTION */}
            <div>
              <SectionHeader title="Referrals" icon={Handshake} link="/jobs?tab=referrals" />
              <div className="space-y-4">
                {recentReferrals.length > 0 ? (
                  recentReferrals.map(ref => (
                    <Card key={ref.id} className="border-2 border-foreground rounded-none bg-background">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold uppercase">{ref.company}</h3>
                          <p className="text-sm font-medium uppercase tracking-wider mt-1 opacity-80">Role: {ref.role}</p>
                          <p className="text-xs font-bold mt-4 tracking-widest">REF BY: {ref.authorName}</p>
                        </div>
                        <Button variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-xs">
                          Request
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No referrals available.</div>
                )}
              </div>
            </div>

            {/* CULTURE SECTION */}
            <div>
              <SectionHeader title="Company Culture" icon={Star} link="/jobs?tab=culture" />
              <div className="space-y-4">
                {recentCultures.length > 0 ? (
                  recentCultures.map(culture => (
                    <Card key={culture.id} className="border-2 border-foreground rounded-none bg-background">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold uppercase">{culture.company}</h3>
                          <div className="bg-foreground text-background font-bold px-3 py-1 text-sm">{culture.rating}/5</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                          <div className="border-l-2 border-foreground pl-3">
                            <span className="uppercase text-xs font-bold tracking-widest block mb-1">Pros</span>
                            <span className="line-clamp-2">{culture.pros}</span>
                          </div>
                          <div className="border-l-2 border-foreground pl-3">
                            <span className="uppercase text-xs font-bold tracking-widest block mb-1">Cons</span>
                            <span className="line-clamp-2">{culture.cons}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No culture reviews yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* HR FEEDBACK SECTION */}
            <div>
              <SectionHeader title="HR Feedback" icon={ClipboardList} link="/jobs?tab=hrfeedback" />
              <div className="space-y-4">
                {recentHrFeedbacks.length > 0 ? (
                  recentHrFeedbacks.map(feedback => (
                    <Card key={feedback.id} className="border-2 border-foreground rounded-none bg-background">
                      <CardContent className="p-6">
                        <div className="mb-4 pb-4 border-b-2 border-foreground/20">
                          <h3 className="text-lg font-bold uppercase">{feedback.company}</h3>
                          <p className="text-sm font-medium uppercase tracking-wider mt-1 opacity-80">HR: {feedback.hrName}</p>
                        </div>
                        <p className="text-sm font-medium line-clamp-2 italic">"{feedback.comments}"</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No HR feedback yet.</div>
                )}
              </div>
            </div>

            {/* TOP PAYING COMPANIES */}
            <div>
              <SectionHeader title="Top Salaries" icon={TrendingUp} link="/jobs" />
              <div className="space-y-4">
                {topPayingCompanies.length > 0 ? (
                  topPayingCompanies.map((co, i) => (
                    <div key={co.name} className="flex items-center justify-between p-6 border-2 border-foreground bg-background">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-transparent" style={{ WebkitTextStroke: '1px hsl(var(--foreground))' }}>0{i + 1}</span>
                        <span className="font-bold text-lg uppercase tracking-wider">{co.name}</span>
                      </div>
                      <span className="font-black text-2xl">{co.pay}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No salaries reported yet.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
