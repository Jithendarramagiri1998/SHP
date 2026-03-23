import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase, Clock, UserCircle, Users, Handshake, Star, TrendingUp, ClipboardList, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-between mb-8 border-b-2 border-foreground pb-4"
    >
      <h2 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-wider">
        <Icon className="h-6 w-6" />
        {title}
      </h2>
      <Link href={link}>
        <Button variant="ghost" className="gap-2 uppercase text-xs tracking-widest font-bold hover:bg-foreground hover:text-background rounded-none group overflow-hidden relative">
          <span className="relative z-10 flex items-center gap-2">View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
        </Button>
      </Link>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Brutalist Hero Section with Animations */}
      <section className="py-24 px-4 md:px-6 lg:px-8 border-b-4 border-foreground bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-30"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-none uppercase">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="block"
              >
                The Truth
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="block"
              >
                About Tech
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                className="text-background bg-foreground px-4 italic block w-max mt-2 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-2 transition-transform cursor-default"
              >
                Careers
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-foreground/80 max-w-2xl font-medium border-l-4 border-foreground pl-6 py-2 uppercase tracking-wide bg-background/80 backdrop-blur-sm"
            >
              Real jobs. Real salaries. Real interview experiences. By the community, for the community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl space-y-24">
          
          {/* JOBS SECTION */}
          <div>
            <SectionHeader title="Latest Job Openings" icon={Briefcase} link="/jobs?tab=jobs" />
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {recentJobs.length > 0 ? (
                recentJobs.map(job => (
                  <motion.div variants={itemVariants} key={job.id}>
                    <Card className="border-2 border-foreground rounded-none hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-background h-full group">
                      <CardContent className="p-6 flex flex-col h-full justify-between gap-6">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">{job.title}</h3>
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
                          <Button size="sm" className="rounded-none uppercase font-bold text-xs tracking-widest border-2 border-foreground hover:bg-background hover:text-foreground transition-colors">
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No jobs posted yet.</div>
              )}
            </motion.div>
          </div>

          {/* INTERVIEWS SECTION */}
          <div>
            <SectionHeader title="Interview Insights" icon={Users} link="/jobs?tab=interviews" />
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {recentInterviews.length > 0 ? (
                recentInterviews.map(interview => (
                  <motion.div variants={itemVariants} key={interview.id}>
                    <Card className="border-2 border-foreground rounded-none bg-background shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row h-full">
                          <div className="bg-foreground text-background p-6 sm:w-1/3 flex flex-col justify-between group-hover:bg-background group-hover:text-foreground group-hover:border-r-2 group-hover:border-foreground transition-colors">
                            <div>
                              <Badge variant="secondary" className="rounded-none uppercase font-bold text-xs bg-background text-foreground mb-4 group-hover:bg-foreground group-hover:text-background">{interview.difficulty}</Badge>
                              <h3 className="text-xl font-bold uppercase">{interview.role}</h3>
                              <p className="mt-2 font-medium opacity-80">{interview.company}</p>
                            </div>
                            <div className="mt-8 font-bold uppercase text-sm tracking-widest">
                              {interview.outcome}
                            </div>
                          </div>
                          <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">Process <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h4>
                              <p className="text-sm font-medium leading-relaxed line-clamp-3 mb-4">{interview.process}</p>
                            </div>
                            <div className="pt-4 border-t-2 border-foreground/10 text-xs font-bold uppercase tracking-wider">
                              Shared by {interview.authorName}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No interviews posted yet.</div>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* REFERRALS SECTION */}
            <div>
              <SectionHeader title="Referrals" icon={Handshake} link="/jobs?tab=referrals" />
              <motion.div 
                variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="space-y-4"
              >
                {recentReferrals.length > 0 ? (
                  recentReferrals.map(ref => (
                    <motion.div variants={itemVariants} key={ref.id}>
                      <Card className="border-2 border-foreground rounded-none bg-background hover:bg-foreground hover:text-background transition-colors group">
                        <CardContent className="p-6 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold uppercase">{ref.company}</h3>
                            <p className="text-sm font-medium uppercase tracking-wider mt-1 opacity-80 group-hover:text-background">Role: {ref.role}</p>
                            <p className="text-xs font-bold mt-4 tracking-widest group-hover:text-background">REF BY: {ref.authorName}</p>
                          </div>
                          <Button variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-xs group-hover:bg-background group-hover:text-foreground group-hover:border-background">
                            Request
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No referrals available.</div>
                )}
              </motion.div>
            </div>

            {/* CULTURE SECTION */}
            <div>
              <SectionHeader title="Company Culture" icon={Star} link="/jobs?tab=culture" />
              <motion.div 
                variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="space-y-4"
              >
                {recentCultures.length > 0 ? (
                  recentCultures.map(culture => (
                    <motion.div variants={itemVariants} key={culture.id}>
                      <Card className="border-2 border-foreground rounded-none bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold uppercase">{culture.company}</h3>
                            <div className="bg-foreground text-background font-black px-3 py-1 text-sm">{culture.rating}/5</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                            <div className="border-l-2 border-foreground pl-3">
                              <span className="uppercase text-xs font-bold tracking-widest block mb-1 opacity-60">Pros</span>
                              <span className="line-clamp-2">{culture.pros}</span>
                            </div>
                            <div className="border-l-2 border-foreground pl-3">
                              <span className="uppercase text-xs font-bold tracking-widest block mb-1 opacity-60">Cons</span>
                              <span className="line-clamp-2">{culture.cons}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No culture reviews yet.</div>
                )}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* HR FEEDBACK SECTION */}
            <div>
              <SectionHeader title="HR Feedback" icon={ClipboardList} link="/jobs?tab=hrfeedback" />
              <motion.div 
                variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="space-y-4"
              >
                {recentHrFeedbacks.length > 0 ? (
                  recentHrFeedbacks.map(feedback => (
                    <motion.div variants={itemVariants} key={feedback.id}>
                      <Card className="border-2 border-foreground rounded-none bg-background border-l-8 hover:pl-2 transition-all">
                        <CardContent className="p-6">
                          <div className="mb-4 pb-4 border-b-2 border-foreground/20">
                            <h3 className="text-lg font-bold uppercase">{feedback.company}</h3>
                            <p className="text-sm font-medium uppercase tracking-wider mt-1 opacity-80">HR: {feedback.hrName}</p>
                          </div>
                          <p className="text-sm font-medium line-clamp-2 italic">"{feedback.comments}"</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No HR feedback yet.</div>
                )}
              </motion.div>
            </div>

            {/* TOP PAYING COMPANIES */}
            <div>
              <SectionHeader title="Top Salaries" icon={TrendingUp} link="/jobs" />
              <motion.div 
                variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="space-y-4"
              >
                {topPayingCompanies.length > 0 ? (
                  topPayingCompanies.map((co, i) => (
                    <motion.div variants={itemVariants} key={co.name}>
                      <div className="group flex items-center justify-between p-6 border-2 border-foreground bg-background hover:bg-foreground transition-colors cursor-default">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-transparent group-hover:text-background transition-colors" style={{ WebkitTextStroke: '1px hsl(var(--foreground))' }}>0{i + 1}</span>
                          <span className="font-bold text-lg uppercase tracking-wider group-hover:text-background transition-colors">{co.name}</span>
                        </div>
                        <span className="font-black text-2xl group-hover:text-background transition-colors">{co.pay}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-foreground/50 text-center font-bold uppercase tracking-widest text-foreground/50">No salaries reported yet.</div>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
