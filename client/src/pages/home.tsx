import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Briefcase, Clock, UserCircle, Users, Handshake, Star, TrendingUp, ClipboardList, ArrowRight, ChevronRight, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { jobs, salaries, interviews, referrals, cultures, hrFeedbacks } = useStore();

  const [searchCompany, setSearchCompany] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchService, setSearchService] = useState("all");

  const matchSearch = (item: any) => {
    const qCompany = searchCompany.toLowerCase();
    const qLocation = searchLocation.toLowerCase();
    const qSkills = searchSkills.toLowerCase();
    
    if (qCompany && !((item.company || item.title || item.role || '')?.toLowerCase().includes(qCompany))) return false;
    if (qLocation && !((item.location || '')?.toLowerCase().includes(qLocation))) return false;
    if (qSkills) {
       const hasSkill = (item.skills || item.skillsRequired || item.questions || item.process || '')?.toString().toLowerCase().includes(qSkills);
       if (!hasSkill) return false;
    }
    return true;
  };

  const recentJobs = useMemo(() => jobs.filter(matchSearch).reverse().slice(0, 5), [jobs, searchCompany, searchLocation, searchSkills]);
  const recentInterviews = useMemo(() => interviews.filter(matchSearch).reverse().slice(0, 5), [interviews, searchCompany, searchLocation, searchSkills]);
  const recentReferrals = useMemo(() => referrals.filter(matchSearch).reverse().slice(0, 5), [referrals, searchCompany, searchLocation, searchSkills]);
  const recentCultures = useMemo(() => cultures.filter(matchSearch).reverse().slice(0, 5), [cultures, searchCompany, searchLocation, searchSkills]);
  const recentHrFeedbacks = useMemo(() => hrFeedbacks.filter(matchSearch).reverse().slice(0, 5), [hrFeedbacks, searchCompany, searchLocation, searchSkills]);

  const topPayingCompanies = useMemo(() => {
    const companyAverages: Record<string, { total: number, count: number }> = {};
    salaries.filter(matchSearch).forEach(s => {
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
  }, [salaries, searchCompany, searchLocation, searchSkills]);

  const SectionHeader = ({ title, icon: Icon, link }: { title: string, icon: any, link: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-between mb-8"
    >
      <h2 className="text-2xl font-bold flex items-center gap-3 tracking-tight">
        <div className="p-2 glass rounded-xl"><Icon className="h-5 w-5 text-red-500" /></div>
        {title}
      </h2>
      <Link href={link}>
        <Button variant="ghost" className="gap-2 text-sm font-medium hover:bg-red-500/10 hover:text-red-500 rounded-full group overflow-hidden relative">
          <span className="relative z-10 flex items-center gap-2 text-foreground/80 group-hover:text-red-500 transition-colors">View All <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
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

  const showJobs = searchService === 'all' || searchService === 'jobs';
  const showInterviews = searchService === 'all' || searchService === 'interviews';
  const showReferrals = searchService === 'all' || searchService === 'referrals';
  const showCulture = searchService === 'all' || searchService === 'culture';
  const showHr = searchService === 'all' || searchService === 'hr';
  const showSalaries = searchService === 'all' || searchService === 'salaries';

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Abstract blur circles for background depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Community Driven Insights
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
              The <span className="gradient-text">Truth</span> About <br />
              Tech Careers.
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-medium"
            >
              Real jobs. Real salaries. Real interview experiences. Skip the fluff and discover what it's really like to work at top companies.
            </motion.p>

            {/* Comprehensive Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="glass-panel p-4 rounded-3xl mt-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input 
                  placeholder="Company, Role..." 
                  className="pl-9 h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-red-500"
                  value={searchCompany}
                  onChange={(e) => setSearchCompany(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input 
                  placeholder="Location..." 
                  className="pl-9 h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-red-500"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input 
                  placeholder="Skill (e.g. React)..." 
                  className="pl-9 h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-red-500"
                  value={searchSkills}
                  onChange={(e) => setSearchSkills(e.target.value)}
                />
              </div>
              <Select value={searchService} onValueChange={setSearchService}>
                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl md:w-[180px]">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent className="glass-panel border-white/10">
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="jobs">Jobs & Walk-ins</SelectItem>
                  <SelectItem value="interviews">Interviews</SelectItem>
                  <SelectItem value="referrals">Referrals</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="hr">HR Feedback</SelectItem>
                  <SelectItem value="salaries">Salaries</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <Link href="/jobs?tab=jobs">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-white/90 transition-all font-medium text-base">
                  Explore Insights
                </Button>
              </Link>
              <Link href="/contribute">
                <Button variant="outline" className="h-12 px-8 rounded-full glass border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all font-medium text-base">
                  Share Experience
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-4 md:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-7xl space-y-32">
          
          {/* JOBS SECTION */}
          {showJobs && (
            <div>
              <SectionHeader title="Latest Opportunities" icon={Briefcase} link="/jobs?tab=jobs" />
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
                      <div className="glass-card h-full flex flex-col p-6">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold tracking-tight text-foreground/90">{job.title}</h3>
                            {job.isWalkin && <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-none font-medium rounded-full text-[10px]">Walk-in</Badge>}
                          </div>
                          <div className="space-y-3 text-sm text-foreground/60 font-medium">
                            <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {job.company}</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
                          </div>
                        </div>
                        <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                              {job.authorName.charAt(0)}
                            </div>
                            <span className="text-xs font-medium text-foreground/60">{job.authorName}</span>
                          </div>
                          <Button size="sm" className="rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-foreground border border-white/5 font-medium text-xs">
                            View Role
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No opportunities matching search.</div>
                )}
              </motion.div>
            </div>
          )}

          {/* INTERVIEWS SECTION */}
          {showInterviews && (
            <div>
              <SectionHeader title="Interview Intel" icon={Users} link="/jobs?tab=interviews" />
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
                      <div className="glass-card flex flex-col sm:flex-row h-full overflow-hidden p-1 gap-1">
                        <div className="neu-pressed p-6 sm:w-1/3 flex flex-col justify-between border-none">
                          <div>
                            <Badge variant="outline" className="rounded-full font-medium text-[10px] border-white/10 bg-white/5 text-foreground/80 mb-4">{interview.difficulty}</Badge>
                            <h3 className="text-lg font-semibold tracking-tight leading-tight">{interview.role}</h3>
                            <p className="mt-2 text-sm font-medium text-foreground/60">{interview.company}</p>
                          </div>
                          <div className="mt-6">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${interview.outcome === 'Offer' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-foreground/80'}`}>
                              {interview.outcome}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-semibold text-foreground/50 tracking-wider uppercase mb-2">Process</h4>
                            <p className="text-sm font-medium text-foreground/80 leading-relaxed line-clamp-3 mb-4">{interview.process}</p>
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                             <UserCircle className="h-4 w-4 text-foreground/40" />
                             <span className="text-xs font-medium text-foreground/50">Shared by {interview.authorName}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No interview intel matching search.</div>
                )}
              </motion.div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* REFERRALS SECTION */}
            {showReferrals && (
              <div>
                <SectionHeader title="Referral Network" icon={Handshake} link="/jobs?tab=referrals" />
                <motion.div 
                  variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="space-y-4"
                >
                  {recentReferrals.length > 0 ? (
                    recentReferrals.map(ref => (
                      <motion.div variants={itemVariants} key={ref.id}>
                        <div className="glass-card p-6 flex items-center justify-between group cursor-pointer">
                          <div>
                            <h3 className="text-lg font-semibold tracking-tight">{ref.company}</h3>
                            <p className="text-sm font-medium text-foreground/60 mt-1">{ref.role}</p>
                            <div className="flex items-center gap-2 mt-3 text-xs text-foreground/50 font-medium">
                              <UserCircle className="h-3 w-3" /> {ref.authorName}
                            </div>
                          </div>
                          <div className="h-10 w-10 rounded-full neu-pressed flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                            <ArrowRight className="h-4 w-4 text-foreground/60 group-hover:text-red-500" />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No referrals matching search.</div>
                  )}
                </motion.div>
              </div>
            )}

            {/* CULTURE SECTION */}
            {showCulture && (
              <div>
                <SectionHeader title="Culture Reality" icon={Star} link="/jobs?tab=culture" />
                <motion.div 
                  variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="space-y-4"
                >
                  {recentCultures.length > 0 ? (
                    recentCultures.map(culture => (
                      <motion.div variants={itemVariants} key={culture.id}>
                        <div className="glass-card p-6">
                          <div className="flex justify-between items-start mb-6">
                            <h3 className="text-lg font-semibold tracking-tight">{culture.company}</h3>
                            <div className="neu-pressed px-3 py-1 font-bold text-sm text-foreground/90 rounded-full flex items-center gap-1">
                              {culture.rating} <Star className="h-3 w-3 fill-red-500/50 text-red-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6 text-sm">
                            <div>
                              <span className="text-xs font-semibold text-green-400/80 uppercase tracking-wider block mb-2">Pros</span>
                              <span className="line-clamp-2 text-foreground/70 font-medium">{culture.pros}</span>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-red-400/80 uppercase tracking-wider block mb-2">Cons</span>
                              <span className="line-clamp-2 text-foreground/70 font-medium">{culture.cons}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No culture reviews matching search.</div>
                  )}
                </motion.div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* HR FEEDBACK SECTION */}
            {showHr && (
              <div>
                <SectionHeader title="HR Feedback" icon={ClipboardList} link="/jobs?tab=hrfeedback" />
                <motion.div 
                  variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="space-y-4"
                >
                  {recentHrFeedbacks.length > 0 ? (
                    recentHrFeedbacks.map(feedback => (
                      <motion.div variants={itemVariants} key={feedback.id}>
                        <div className="glass-card p-6 relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-red-900/50"></div>
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold tracking-tight">{feedback.company}</h3>
                            <p className="text-sm font-medium text-foreground/60 mt-1">HR: {feedback.hrName}</p>
                          </div>
                          <p className="text-sm font-medium text-foreground/80 line-clamp-2">"{feedback.comments}"</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No HR feedback matching search.</div>
                  )}
                </motion.div>
              </div>
            )}

            {/* TOP PAYING COMPANIES */}
            {showSalaries && (
              <div>
                <SectionHeader title="Top Comp" icon={TrendingUp} link="/jobs" />
                <motion.div 
                  variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="space-y-4"
                >
                  {topPayingCompanies.length > 0 ? (
                    topPayingCompanies.map((co, i) => (
                      <motion.div variants={itemVariants} key={co.name}>
                        <div className="glass-card flex items-center justify-between p-5 group cursor-default">
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full neu-pressed flex items-center justify-center text-xs font-bold text-foreground/50">
                              {i + 1}
                            </div>
                            <span className="font-semibold text-foreground/90 tracking-tight">{co.name}</span>
                          </div>
                          <span className="font-bold text-lg tracking-tight text-red-400/90">{co.pay}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 neu-flat text-center font-medium text-foreground/50 rounded-3xl">No salaries matching search.</div>
                  )}
                </motion.div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}