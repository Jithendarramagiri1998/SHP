import { Link, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, Clock, MessageSquare, Handshake, Heart, Mail, Linkedin, ClipboardList, ArrowRight } from "lucide-react";
import { useStore, Job, Referral, WorkCulture, Interview, HrFeedback } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function JobsPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const defaultTab = searchParams.get('tab') || "jobs";
  
  const { jobs, referrals, cultures, interviews, hrFeedbacks } = useStore();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      
      <main className="container mx-auto py-24 px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">Explore <span className="gradient-text">Insights</span></h1>
          <p className="text-foreground/60 text-lg md:text-xl font-medium">
            Discover real opportunities, genuine interview experiences, and authentic company cultures shared by the community.
          </p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="space-y-12">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent p-0 gap-2 border-none mb-12">
            {[
              { id: 'jobs', icon: Briefcase, label: 'Jobs' },
              { id: 'referrals', icon: Handshake, label: 'Referrals' },
              { id: 'interviews', icon: MessageSquare, label: 'Interviews' },
              { id: 'culture', icon: Heart, label: 'Culture' },
              { id: 'hrfeedback', icon: ClipboardList, label: 'HR Feedback' },
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="glass rounded-full px-6 py-3 font-medium data-[state=active]:bg-white/10 data-[state=active]:text-foreground text-foreground/70 hover:text-foreground transition-all flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="jobs" className="m-0 focus-visible:outline-none">
            {jobs.length === 0 ? (
              <EmptyState title="No Jobs Yet" description="Be the first to post a job opening or walk-in drive." link="/contribute?tab=job" />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 focus-visible:outline-none">
            {referrals.length === 0 ? (
              <EmptyState title="No Referrals Yet" description="Be the first to offer a referral at your company." link="/contribute?tab=referral" />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {referrals.map(ref => <ReferralCard key={ref.id} referral={ref} />)}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 focus-visible:outline-none">
            {interviews.length === 0 ? (
              <EmptyState title="No Interviews Yet" description="Share your interview experience to help others." link="/contribute?tab=interview" />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {interviews.map(int => <InterviewCard key={int.id} interview={int} />)}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="culture" className="m-0 focus-visible:outline-none">
            {cultures.length === 0 ? (
              <EmptyState title="No Culture Reviews Yet" description="Share what it's like to work at your company." link="/contribute?tab=culture" />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cultures.map(culture => <CultureCard key={culture.id} culture={culture} />)}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="hrfeedback" className="m-0 focus-visible:outline-none">
            {hrFeedbacks.length === 0 ? (
              <EmptyState title="No HR Feedback Yet" description="Share your experiences with recruiters and hiring processes." link="/contribute?tab=hrfeedback" />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hrFeedbacks.map(feedback => <HrFeedbackCard key={feedback.id} feedback={feedback} />)}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}

function EmptyState({ title, description, link }: { title: string, description: string, link: string }) {
  return (
    <div className="text-center py-24 glass-panel rounded-3xl max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-3 tracking-tight">{title}</h3>
      <p className="text-foreground/60 font-medium mb-8 max-w-md mx-auto">{description}</p>
      <Link href={link}>
        <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-12 font-medium">
          Contribute Now
        </Button>
      </Link>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full group">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
          {job.isWalkin && <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-foreground border-none font-medium rounded-full text-[10px]">Walk-in</Badge>}
        </div>
        
        <div className="space-y-3 text-sm font-medium text-foreground/60 mb-6">
          <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {job.company}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
          <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.type}</span>
          {job.experienceRequired && <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {job.experienceRequired}</span>}
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.skills.map((s, i) => <Badge key={i} variant="outline" className="rounded-full border-white/10 bg-white/5 font-medium text-[10px] text-foreground/70">{s}</Badge>)}
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-foreground/80">
            {job.authorName.charAt(0)}
          </div>
          <div className="text-xs font-medium">
            <span className="text-foreground/80 block">{job.authorName}</span>
          </div>
        </div>
        <Button className="rounded-full h-8 px-4 text-xs bg-white/10 hover:bg-white/20 text-foreground" asChild>
          <a href={job.url || "#"} target="_blank" rel="noopener noreferrer">Apply <ArrowRight className="ml-1.5 h-3 w-3" /></a>
        </Button>
      </div>
    </div>
  );
}

function ReferralCard({ referral }: { referral: Referral }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Badge variant="outline" className="rounded-full border-white/10 bg-white/5 font-medium text-[10px] text-foreground/70 mb-3">{referral.company}</Badge>
          <h3 className="text-xl font-semibold tracking-tight leading-tight">{referral.role}</h3>
        </div>
        <div className="h-10 w-10 rounded-full neu-pressed flex items-center justify-center">
          <Handshake className="h-4 w-4 text-foreground/60" />
        </div>
      </div>
      
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-foreground/60">
          <div className="neu-pressed p-3 rounded-xl border-none">
            <span className="block text-[10px] uppercase tracking-wider mb-1 opacity-60">Experience</span>
            <span className="text-foreground/90">{referral.experienceRequired || "Not specified"}</span>
          </div>
          <div className="neu-pressed p-3 rounded-xl border-none">
            <span className="block text-[10px] uppercase tracking-wider mb-1 opacity-60">Location</span>
            <span className="text-foreground/90">{referral.location}</span>
          </div>
        </div>

        {referral.skillsRequired && referral.skillsRequired.length > 0 && (
          <div>
            <span className="block text-xs font-medium text-foreground/50 mb-2">Preferred Skills</span>
            <div className="flex flex-wrap gap-2">
              {referral.skillsRequired.map((s, i) => <Badge key={i} variant="outline" className="rounded-full border-white/10 bg-white/5 font-medium text-[10px] text-foreground/70">{s}</Badge>)}
            </div>
          </div>
        )}

        <div className="bg-white/5 p-4 rounded-xl text-sm font-medium text-foreground/80 leading-relaxed border border-white/5">
          {referral.instructions}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
            {referral.authorName.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-sm">{referral.authorName}</p>
            <p className="text-[10px] font-medium text-foreground/50">{referral.authorExperience} @ {referral.authorCompany}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {referral.contactEmail && (
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-foreground" asChild>
              <a href={`mailto:${referral.contactEmail}`}><Mail className="h-3.5 w-3.5" /></a>
            </Button>
          )}
          {referral.contactLinkedin && (
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-foreground" asChild>
              <a href={referral.contactLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-3.5 w-3.5" /></a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CultureCard({ culture }: { culture: WorkCulture }) {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{culture.company}</h3>
          <p className="text-xs font-medium text-foreground/50 mt-1">Review by {culture.authorName}</p>
        </div>
        <div className="neu-pressed px-3 py-1 font-bold text-sm text-foreground/90 rounded-full flex items-center gap-1">
          {culture.rating} <Heart className="h-3 w-3 fill-primary/50 text-primary/50" />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="neu-pressed p-4 rounded-xl border-none">
          <h4 className="text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2 flex items-center gap-2">Pros</h4>
          <p className="text-sm font-medium text-foreground/80 leading-relaxed">{culture.pros || "Not provided"}</p>
        </div>
        <div className="neu-pressed p-4 rounded-xl border-none">
          <h4 className="text-xs font-semibold text-red-400/80 uppercase tracking-wider mb-2 flex items-center gap-2">Cons</h4>
          <p className="text-sm font-medium text-foreground/80 leading-relaxed">{culture.cons || "Not provided"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm font-medium bg-white/5 p-4 rounded-xl border border-white/5">
        <div>
          <span className="text-[10px] uppercase tracking-wider block mb-1 opacity-50">Work-Life Balance</span>
          <span className="text-foreground/90">{culture.workLifeBalance || "Not provided"}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider block mb-1 opacity-50">Management</span>
          <span className="text-foreground/90">{culture.management || "Not provided"}</span>
        </div>
      </div>
    </div>
  )
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <div className="glass-card flex flex-col md:flex-row overflow-hidden p-2 gap-2">
      <div className="neu-pressed p-6 md:w-1/3 flex flex-col justify-between border-none rounded-2xl">
        <div>
          <div className="flex gap-2 mb-6">
            <Badge variant="secondary" className="rounded-full bg-white/5 text-foreground/70 font-medium text-[10px] border border-white/10">{interview.difficulty}</Badge>
            <Badge variant="outline" className={`rounded-full border-none font-medium text-[10px] ${interview.outcome === 'Offer' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-foreground/80'}`}>{interview.outcome}</Badge>
          </div>
          <h3 className="text-2xl font-bold tracking-tight leading-none mb-3">{interview.role}</h3>
          <p className="font-medium text-foreground/80">{interview.company}</p>
          <p className="text-xs font-medium text-foreground/50 mt-2">Level: {interview.level}</p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-1 font-medium">Overall Experience</p>
          <p className="font-semibold text-lg">{interview.experience}</p>
        </div>
      </div>

      <div className="p-6 md:w-2/3 space-y-6 flex flex-col">
        <div className="flex-1 space-y-6">
          <div>
            <span className="text-xs font-semibold text-foreground/50 tracking-wider uppercase mb-3 block">Interview Process</span>
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">{interview.process}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-foreground/50 tracking-wider uppercase mb-3 block">Questions Asked</span>
            <p className="text-sm font-medium text-foreground/80 leading-relaxed whitespace-pre-wrap bg-white/5 p-4 rounded-xl border border-white/5 font-mono">{interview.questions}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                {interview.authorName.charAt(0)}
             </div>
             <div>
                <span className="text-sm font-medium block">{interview.authorName}</span>
                <span className="text-[10px] font-medium text-foreground/50 block">{interview.authorExperience}</span>
             </div>
          </div>
          <span className="text-xs font-medium text-foreground/40">{interview.date}</span>
        </div>
      </div>
    </div>
  )
}

function HrFeedbackCard({ feedback }: { feedback: HrFeedback }) {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{feedback.company}</h3>
          <p className="font-medium text-sm text-foreground/60 mt-1">HR: <span className="text-foreground/90">{feedback.hrName}</span></p>
        </div>
        <div className="flex gap-2">
           {feedback.hrEmail && (
             <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10" asChild>
               <a href={`mailto:${feedback.hrEmail}`}><Mail className="h-3.5 w-3.5" /></a>
             </Button>
           )}
           {feedback.hrLinkedin && (
             <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10" asChild>
               <a href={feedback.hrLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-3.5 w-3.5" /></a>
             </Button>
           )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-foreground/80 leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5">"{feedback.comments}"</p>
      </div>

      <div className="space-y-4">
        {feedback.companyTags && feedback.companyTags.length > 0 && (
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50 block mb-2">Company Tags</span>
            <div className="flex flex-wrap gap-2">
              {feedback.companyTags.map((tag, i) => (
                <Badge key={i} variant="outline" className="rounded-full border-white/10 bg-white/5 font-medium text-[10px] text-foreground/70">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {feedback.hrTags && feedback.hrTags.length > 0 && (
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50 block mb-2">HR Tags</span>
            <div className="flex flex-wrap gap-2">
              {feedback.hrTags.map((tag, i) => (
                <Badge key={i} className="rounded-full bg-white/10 hover:bg-white/20 text-foreground font-medium text-[10px]">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}