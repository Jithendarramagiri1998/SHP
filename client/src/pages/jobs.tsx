import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, Briefcase, Clock, UserCircle, MessageSquare, Briefcase as JobIcon, Handshake, Heart, Star, Mail, Linkedin, ClipboardList, Tag } from "lucide-react";
import { useStore, Job, Referral, WorkCulture, Interview, HrFeedback } from "@/lib/store";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JobsPage() {
  const { jobs, referrals, cultures, interviews, hrFeedbacks } = useStore();
  
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6 max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Explore Opportunities & Insights</h1>
          <p className="text-muted-foreground mt-3 text-lg">Find jobs, request referrals, learn about company culture, or read HR feedback.</p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1.5 bg-card border rounded-2xl shadow-sm">
            <TabsTrigger value="jobs" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-600 transition-all">
              <JobIcon className="h-4 w-4" /> <span className="hidden md:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 transition-all">
              <Handshake className="h-4 w-4" /> <span className="hidden md:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="interviews" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600 transition-all">
              <MessageSquare className="h-4 w-4" /> <span className="hidden md:inline">Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="culture" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-600 transition-all">
              <Heart className="h-4 w-4" /> <span className="hidden md:inline">Culture</span>
            </TabsTrigger>
            <TabsTrigger value="hrfeedback" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 transition-all">
              <ClipboardList className="h-4 w-4" /> <span className="hidden md:inline">HR Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="m-0 space-y-6">
            {jobs.length === 0 ? (
              <EmptyState title="No Jobs Yet" description="Be the first to post a job opening or walk-in drive!" link="/contribute?tab=job" />
            ) : (
              jobs.map(job => <JobCard key={job.id} job={job} />)
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 space-y-6">
            {referrals.length === 0 ? (
              <EmptyState title="No Referrals Yet" description="Be the first to offer a referral at your company!" link="/contribute?tab=referral" />
            ) : (
              referrals.map(ref => <ReferralCard key={ref.id} referral={ref} />)
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 space-y-6">
            {interviews.length === 0 ? (
              <EmptyState title="No Interviews Yet" description="Share your interview experience to help others." link="/contribute?tab=interview" />
            ) : (
              interviews.map(int => <InterviewCard key={int.id} interview={int} />)
            )}
          </TabsContent>

          <TabsContent value="culture" className="m-0 space-y-6">
            {cultures.length === 0 ? (
              <EmptyState title="No Culture Reviews Yet" description="Share what it's like to work at your company." link="/contribute?tab=culture" />
            ) : (
              cultures.map(culture => <CultureCard key={culture.id} culture={culture} />)
            )}
          </TabsContent>

          <TabsContent value="hrfeedback" className="m-0 space-y-6">
            {hrFeedbacks.length === 0 ? (
              <EmptyState title="No HR Feedback Yet" description="Share your experiences with recruiters and hiring processes." link="/contribute?tab=hrfeedback" />
            ) : (
              hrFeedbacks.map(feedback => <HrFeedbackCard key={feedback.id} feedback={feedback} />)
            )}
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}

function EmptyState({ title, description, link }: { title: string, description: string, link: string }) {
  return (
    <div className="text-center py-16 border border-dashed rounded-2xl bg-card">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Link href={link}>
        <Button variant="default" className="rounded-xl">Contribute Now</Button>
      </Link>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 group rounded-2xl overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold group-hover:text-orange-500 transition-colors cursor-pointer">{job.title}</h3>
                {job.isWalkin && <Badge variant="destructive" className="bg-red-500">Walk-in Drive</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground"><Building2 className="h-4 w-4 text-primary" /> {job.company}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                {job.experienceRequired && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.experienceRequired}</span>}
              </div>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s, i) => <Badge key={i} variant="secondary" className="font-normal bg-secondary/50">{s}</Badge>)}
              </div>
            )}

            {job.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 bg-muted/30 p-3 rounded-lg border border-border/50">{job.description}</p>
            )}

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {job.authorName.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-medium text-foreground">{job.authorName}</p>
                <p className="text-muted-foreground">{job.authorExperience} @ {job.authorCompany}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[140px]">
            <Button className="w-full rounded-xl bg-orange-600 hover:bg-orange-700" asChild>
              <a href={job.url || "#"} target="_blank" rel="noopener noreferrer">Apply Now</a>
            </Button>
            <span className="text-xs text-muted-foreground text-right">{job.posted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReferralCard({ referral }: { referral: Referral }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 group rounded-2xl overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 font-bold text-lg border border-green-500/20">
                  {referral.authorName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {referral.authorName} is offering referrals
                  </h3>
                  <p className="text-sm text-muted-foreground">{referral.authorExperience} at {referral.authorCompany} • {referral.authorLocation}</p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Referral Available</Badge>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-3">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="font-medium">Target Role: <span className="font-normal text-muted-foreground">{referral.role}</span></span>
                <span className="font-medium">Company: <span className="font-normal text-muted-foreground">{referral.company}</span></span>
              </div>
              {referral.experienceRequired && (
                <div className="text-sm">
                  <span className="font-medium">Experience Needed:</span> <span className="text-muted-foreground">{referral.experienceRequired}</span>
                </div>
              )}
              {referral.skillsRequired && referral.skillsRequired.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {referral.skillsRequired.map((s, i) => <Badge key={i} variant="outline" className="font-normal text-xs">{s}</Badge>)}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Instructions</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{referral.instructions}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px] border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <p className="text-xs font-medium text-center text-muted-foreground mb-1">Contact Referrer</p>
            {referral.contactEmail && (
              <Button variant="outline" className="w-full rounded-xl justify-start gap-2 border-green-500/30 hover:bg-green-500/10" asChild>
                <a href={`mailto:${referral.contactEmail}`}><Mail className="h-4 w-4 text-green-600" /> Email</a>
              </Button>
            )}
            {referral.contactLinkedin && (
              <Button variant="outline" className="w-full rounded-xl justify-start gap-2 border-blue-500/30 hover:bg-blue-500/10" asChild>
                <a href={referral.contactLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn</a>
              </Button>
            )}
            <span className="text-xs text-muted-foreground text-center mt-2">Posted {referral.posted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CultureCard({ culture }: { culture: WorkCulture }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 rounded-2xl overflow-hidden">
       <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 to-rose-500"></div>
       <CardContent className="p-6 space-y-6">
         <div className="flex justify-between items-start">
           <div>
             <h3 className="text-2xl font-bold flex items-center gap-2">
               <Building2 className="h-5 w-5 text-pink-500" /> {culture.company}
             </h3>
             <div className="flex items-center gap-2 mt-2">
               <div className="flex">
                 {[1,2,3,4,5].map(star => (
                   <Star key={star} className={`h-4 w-4 ${star <= culture.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                 ))}
               </div>
               <span className="font-semibold">{culture.rating}/5</span>
             </div>
           </div>
           
           <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
              <span className="text-xs text-muted-foreground">Reviewed by</span>
              <span className="text-xs font-semibold">{culture.authorName}</span>
           </div>
         </div>

         <div className="grid md:grid-cols-2 gap-4">
           <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
             <h4 className="text-green-600 font-semibold text-sm mb-2 uppercase tracking-wider flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" /> Pros</h4>
             <p className="text-sm text-foreground/80">{culture.pros || "Not provided"}</p>
           </div>
           <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
             <h4 className="text-red-500 font-semibold text-sm mb-2 uppercase tracking-wider">Cons</h4>
             <p className="text-sm text-foreground/80">{culture.cons || "Not provided"}</p>
           </div>
         </div>

         <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
           <div>
             <span className="text-xs text-muted-foreground block mb-1">Work-Life Balance</span>
             <p className="text-sm font-medium">{culture.workLifeBalance || "Not provided"}</p>
           </div>
           <div>
             <span className="text-xs text-muted-foreground block mb-1">Management</span>
             <p className="text-sm font-medium">{culture.management || "Not provided"}</p>
           </div>
         </div>
       </CardContent>
    </Card>
  )
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 rounded-2xl overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {interview.role}
            </h3>
            <p className="text-muted-foreground flex items-center gap-1.5 mt-1 font-medium">
               <Building2 className="h-4 w-4" /> {interview.company} <span className="text-xs px-2 py-0.5 bg-secondary rounded-full ml-2">{interview.level}</span>
            </p>
          </div>
          <div className="flex gap-2">
             <Badge variant={interview.outcome === 'Offer' ? 'default' : 'secondary'} className={interview.outcome === 'Offer' ? "bg-green-500 hover:bg-green-600" : ""}>{interview.outcome}</Badge>
          </div>
        </div>

        <div className="flex gap-4 text-sm pt-2">
          <div className="bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
            <span className="text-muted-foreground text-xs block">Difficulty</span>
            <span className={`font-semibold ${interview.difficulty === 'Hard' ? 'text-red-500' : interview.difficulty === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>{interview.difficulty}</span>
          </div>
          <div className="bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
            <span className="text-muted-foreground text-xs block">Experience</span>
            <span className="font-semibold">{interview.experience}</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Process</span>
            <p className="text-sm text-foreground/80 leading-relaxed bg-muted/20 p-3 rounded-lg">{interview.process}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5"/> Questions Asked</span>
            <p className="text-sm text-foreground/80 leading-relaxed bg-blue-500/5 p-3 rounded-lg border border-blue-500/10 whitespace-pre-wrap">{interview.questions}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
            {interview.authorName.charAt(0)}
          </div>
          <div className="text-xs">
            <p className="font-medium text-foreground">{interview.authorName}</p>
            <p className="text-muted-foreground">{interview.authorExperience} @ {interview.authorCompany}</p>
          </div>
          <span className="text-xs text-muted-foreground ml-auto">{interview.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function HrFeedbackCard({ feedback }: { feedback: HrFeedback }) {
  return (
    <Card className="hover:shadow-md transition-all border-border/60 rounded-2xl overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-500" /> {feedback.company}
            </h3>
            <p className="text-muted-foreground flex items-center gap-1.5 mt-1 font-medium text-sm">
              Feedback on HR: <span className="text-foreground">{feedback.hrName}</span>
            </p>
          </div>
          <div className="flex gap-2">
             {feedback.hrEmail && (
               <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-purple-600" asChild>
                 <a href={`mailto:${feedback.hrEmail}`}><Mail className="h-4 w-4" /></a>
               </Button>
             )}
             {feedback.hrLinkedin && (
               <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-600" asChild>
                 <a href={feedback.hrLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
               </Button>
             )}
          </div>
        </div>

        <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/20">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
            <ClipboardList className="h-3.5 w-3.5" /> Comments & Experience
          </span>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{feedback.comments}</p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          {feedback.companyTags && feedback.companyTags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground block font-medium flex items-center gap-1"><Tag className="h-3 w-3" /> Company Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {feedback.companyTags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="bg-muted/50 text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {feedback.hrTags && feedback.hrTags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground block font-medium flex items-center gap-1"><Tag className="h-3 w-3" /> HR Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {feedback.hrTags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 border-transparent text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl border border-border/50 w-max mt-4">
          <span className="text-xs text-muted-foreground">Shared anonymously by</span>
          <span className="text-xs font-semibold">{feedback.authorName}</span>
        </div>
      </CardContent>
    </Card>
  )
}