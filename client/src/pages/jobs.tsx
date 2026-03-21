import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, Briefcase, Clock, UserCircle, MessageSquare, Briefcase as JobIcon, Handshake, Heart, Star, Mail, Linkedin, ClipboardList, Tag, ArrowRight } from "lucide-react";
import { useStore, Job, Referral, WorkCulture, Interview, HrFeedback } from "@/lib/store";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JobsPage() {
  const { jobs, referrals, cultures, interviews, hrFeedbacks } = useStore();
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4 md:px-6 max-w-6xl">
        <div className="mb-12 border-b-4 border-foreground pb-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase">Explore Insights</h1>
          <p className="text-foreground/80 mt-4 text-xl font-medium uppercase tracking-wider border-l-4 border-foreground pl-4">
            Find jobs, request referrals, and read real reviews.
          </p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-12">
          <TabsList className="flex flex-wrap w-full justify-start h-auto bg-transparent p-0 gap-4 border-none">
            <TabsTrigger value="jobs" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
              <JobIcon className="h-5 w-5" /> Jobs
            </TabsTrigger>
            <TabsTrigger value="referrals" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
              <Handshake className="h-5 w-5" /> Referrals
            </TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Interviews
            </TabsTrigger>
            <TabsTrigger value="culture" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
              <Heart className="h-5 w-5" /> Culture
            </TabsTrigger>
            <TabsTrigger value="hrfeedback" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> HR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="m-0 space-y-6">
            {jobs.length === 0 ? (
              <EmptyState title="No Jobs Yet" description="Be the first to post a job opening or walk-in drive!" link="/contribute?tab=job" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 space-y-6">
            {referrals.length === 0 ? (
              <EmptyState title="No Referrals Yet" description="Be the first to offer a referral at your company!" link="/contribute?tab=referral" />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {referrals.map(ref => <ReferralCard key={ref.id} referral={ref} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 space-y-6">
            {interviews.length === 0 ? (
              <EmptyState title="No Interviews Yet" description="Share your interview experience to help others." link="/contribute?tab=interview" />
            ) : (
              <div className="space-y-8">
                {interviews.map(int => <InterviewCard key={int.id} interview={int} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="culture" className="m-0 space-y-6">
            {cultures.length === 0 ? (
              <EmptyState title="No Culture Reviews Yet" description="Share what it's like to work at your company." link="/contribute?tab=culture" />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {cultures.map(culture => <CultureCard key={culture.id} culture={culture} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hrfeedback" className="m-0 space-y-6">
            {hrFeedbacks.length === 0 ? (
              <EmptyState title="No HR Feedback Yet" description="Share your experiences with recruiters and hiring processes." link="/contribute?tab=hrfeedback" />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {hrFeedbacks.map(feedback => <HrFeedbackCard key={feedback.id} feedback={feedback} />)}
              </div>
            )}
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}

function EmptyState({ title, description, link }: { title: string, description: string, link: string }) {
  return (
    <div className="text-center py-20 border-4 border-dashed border-foreground bg-background">
      <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">{title}</h3>
      <p className="text-foreground/70 font-medium uppercase tracking-wider mb-8">{description}</p>
      <Link href={link}>
        <Button className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">
          Contribute Now
        </Button>
      </Link>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-background">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="p-6 flex-1 border-b-2 border-foreground">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold uppercase tracking-tight">{job.title}</h3>
            {job.isWalkin && <Badge variant="outline" className="border-2 border-foreground rounded-none uppercase font-bold bg-foreground text-background">Walk-in</Badge>}
          </div>
          
          <div className="space-y-2 text-sm font-medium uppercase tracking-wider mb-6">
            <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {job.company}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.type}</span>
            {job.experienceRequired && <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {job.experienceRequired}</span>}
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((s, i) => <Badge key={i} variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-[10px]">{s}</Badge>)}
            </div>
          )}

          {job.description && (
            <p className="text-sm font-medium border-l-4 border-foreground pl-3 py-1 line-clamp-3 italic opacity-80">{job.description}</p>
          )}
        </div>
        
        <div className="p-4 bg-muted/20 flex items-center justify-between">
          <div className="text-xs uppercase font-bold tracking-widest">
            <span className="block opacity-60">Posted By</span>
            {job.authorName} <span className="opacity-60 font-normal">({job.authorExperience})</span>
          </div>
          <Button className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all" asChild>
            <a href={job.url || "#"} target="_blank" rel="noopener noreferrer">Apply <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ReferralCard({ referral }: { referral: Referral }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-background">
      <CardContent className="p-0">
        <div className="bg-foreground text-background p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Referral: {referral.company}</h3>
            <p className="font-medium uppercase tracking-wider mt-1 opacity-80">{referral.role}</p>
          </div>
          <Handshake className="h-8 w-8 opacity-50" />
        </div>
        
        <div className="p-6 border-b-2 border-foreground space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm font-medium uppercase tracking-wider">
            <div>
              <span className="block opacity-60 text-xs mb-1">Target Experience</span>
              {referral.experienceRequired || "Not specified"}
            </div>
            <div>
              <span className="block opacity-60 text-xs mb-1">Location</span>
              {referral.location}
            </div>
          </div>

          <div>
            <span className="block opacity-60 text-xs uppercase tracking-widest mb-2 font-bold">Preferred Skills</span>
            <div className="flex flex-wrap gap-2">
              {referral.skillsRequired?.map((s, i) => <Badge key={i} variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-[10px]">{s}</Badge>)}
            </div>
          </div>

          <div className="bg-muted/30 p-4 border-l-4 border-foreground">
            <span className="block opacity-60 text-xs uppercase tracking-widest mb-1 font-bold">Instructions</span>
            <p className="text-sm font-medium leading-relaxed">{referral.instructions}</p>
          </div>
        </div>

        <div className="p-6 bg-muted/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 border-2 border-foreground flex items-center justify-center font-bold text-xl uppercase bg-background">
              {referral.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-sm">{referral.authorName}</p>
              <p className="text-xs uppercase font-medium opacity-60">{referral.authorExperience} @ {referral.authorCompany}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {referral.contactEmail && (
              <Button variant="outline" className="flex-1 rounded-none border-2 border-foreground font-bold uppercase tracking-widest hover:bg-foreground hover:text-background" asChild>
                <a href={`mailto:${referral.contactEmail}`}><Mail className="mr-2 h-4 w-4" /> Email</a>
              </Button>
            )}
            {referral.contactLinkedin && (
              <Button variant="outline" className="flex-1 rounded-none border-2 border-foreground font-bold uppercase tracking-widest hover:bg-foreground hover:text-background" asChild>
                <a href={referral.contactLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> Connect</a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CultureCard({ culture }: { culture: WorkCulture }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-background">
       <CardContent className="p-0">
         <div className="p-6 border-b-2 border-foreground flex justify-between items-start">
           <div>
             <h3 className="text-2xl font-black uppercase tracking-tighter">{culture.company}</h3>
             <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">Review by {culture.authorName}</p>
           </div>
           <div className="bg-foreground text-background px-4 py-2 font-black text-xl border-2 border-transparent">
             {culture.rating}<span className="text-sm opacity-80">/5</span>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-foreground border-b-2 border-foreground">
           <div className="p-6 bg-muted/10">
             <h4 className="font-black uppercase tracking-widest text-lg mb-3 flex items-center gap-2"><Heart className="h-5 w-5" /> Pros</h4>
             <p className="text-sm font-medium leading-relaxed italic border-l-2 border-foreground pl-3">{culture.pros || "Not provided"}</p>
           </div>
           <div className="p-6 bg-muted/10">
             <h4 className="font-black uppercase tracking-widest text-lg mb-3 flex items-center gap-2">Cons</h4>
             <p className="text-sm font-medium leading-relaxed italic border-l-2 border-foreground pl-3">{culture.cons || "Not provided"}</p>
           </div>
         </div>

         <div className="grid grid-cols-2 divide-x-2 divide-foreground p-6">
           <div className="pr-4">
             <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-60">Work-Life Balance</span>
             <p className="text-sm font-bold uppercase">{culture.workLifeBalance || "Not provided"}</p>
           </div>
           <div className="pl-4">
             <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-60">Management</span>
             <p className="text-sm font-bold uppercase">{culture.management || "Not provided"}</p>
           </div>
         </div>
       </CardContent>
    </Card>
  )
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-background">
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="bg-foreground text-background p-6 md:w-1/3 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-foreground">
          <div>
            <div className="flex gap-2 mb-6">
              <Badge variant="secondary" className="rounded-none uppercase font-bold text-[10px] bg-background text-foreground">{interview.difficulty}</Badge>
              <Badge variant="outline" className="rounded-none border-background text-background uppercase font-bold text-[10px]">{interview.outcome}</Badge>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">{interview.role}</h3>
            <p className="font-bold uppercase tracking-wider opacity-80">{interview.company}</p>
            <p className="text-xs uppercase mt-1 opacity-60">Level: {interview.level}</p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-background/20">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Overall Experience</p>
            <p className="font-black uppercase text-lg">{interview.experience}</p>
          </div>
        </div>

        <div className="p-6 md:w-2/3 space-y-6">
          <div>
            <span className="text-sm font-black uppercase tracking-widest mb-2 block border-b-2 border-foreground pb-2">Interview Process</span>
            <p className="text-sm font-medium leading-relaxed bg-muted/20 p-4 border-l-4 border-foreground">{interview.process}</p>
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-widest mb-2 block border-b-2 border-foreground pb-2">Questions Asked</span>
            <p className="text-sm font-medium leading-relaxed bg-muted/20 p-4 border-l-4 border-foreground whitespace-pre-wrap font-mono text-xs">{interview.questions}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t-2 border-foreground/20">
            <div className="text-xs font-bold uppercase tracking-widest">
              Shared By {interview.authorName} <span className="opacity-60 block mt-1">({interview.authorExperience})</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">{interview.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function HrFeedbackCard({ feedback }: { feedback: HrFeedback }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-background">
      <CardContent className="p-0">
        <div className="p-6 border-b-2 border-foreground flex justify-between items-start bg-muted/20">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">{feedback.company}</h3>
            <p className="font-bold uppercase tracking-widest text-sm mt-1">HR / Recruiter: <span className="underline">{feedback.hrName}</span></p>
          </div>
          <div className="flex gap-2">
             {feedback.hrEmail && (
               <Button variant="outline" size="icon" className="rounded-none border-2 border-foreground h-10 w-10" asChild>
                 <a href={`mailto:${feedback.hrEmail}`}><Mail className="h-4 w-4" /></a>
               </Button>
             )}
             {feedback.hrLinkedin && (
               <Button variant="outline" size="icon" className="rounded-none border-2 border-foreground h-10 w-10" asChild>
                 <a href={feedback.hrLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
               </Button>
             )}
          </div>
        </div>

        <div className="p-6">
          <span className="text-sm font-black uppercase tracking-widest mb-3 block flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Feedback
          </span>
          <p className="text-sm font-medium leading-relaxed italic border-l-4 border-foreground pl-4 whitespace-pre-wrap">{feedback.comments}</p>
        </div>

        <div className="p-6 border-t-2 border-foreground bg-muted/10 space-y-4">
          {feedback.companyTags && feedback.companyTags.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 block mb-2">Company Tags</span>
              <div className="flex flex-wrap gap-2">
                {feedback.companyTags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {feedback.hrTags && feedback.hrTags.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 block mb-2">HR Tags</span>
              <div className="flex flex-wrap gap-2">
                {feedback.hrTags.map((tag, i) => (
                  <Badge key={i} className="rounded-none bg-foreground text-background uppercase font-bold text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}