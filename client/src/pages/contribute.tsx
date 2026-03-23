import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Sparkles, CheckCircle2, MessageSquare, Handshake, Heart, ClipboardList, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function ContributePage() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const defaultTab = searchParams.get('tab') || "interview";
  
  const { profile, addInterview, addJob, addReferral, addCulture, addHrFeedback, addSalary } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleInterviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addInterview({
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      difficulty: formData.get('difficulty') as string,
      level: formData.get('level') as string,
      outcome: formData.get('outcome') as string,
      experience: formData.get('experience') as string,
      process: formData.get('process') as string,
      questions: formData.get('questions') as string,
      authorId: profile.id,
      authorName: profile.name,
      authorCompany: profile.company,
      authorLocation: profile.location,
      authorExperience: profile.experience,
    });
    setSubmitted(true);
  };

  const handleJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const offerType = formData.get('offer') as string;
    const skillsStr = formData.get('skills') as string;
    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    addJob({
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string || 'Remote',
      type: formData.get('type') as string,
      isWalkin: offerType === 'walkin',
      skills: skills,
      experienceRequired: formData.get('experienceRequired') as string,
      url: formData.get('url') as string,
      description: formData.get('description') as string,
      authorId: profile.id,
      authorName: profile.name,
      authorCompany: profile.company,
      authorLocation: profile.location,
      authorExperience: profile.experience,
    });
    setSubmitted(true);
  };

  const handleReferralSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillsStr = formData.get('skills') as string;
    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    addReferral({
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      location: formData.get('location') as string || 'Remote',
      skillsRequired: skills,
      experienceRequired: formData.get('experienceRequired') as string,
      instructions: formData.get('instructions') as string,
      authorId: profile.id,
      authorName: profile.name,
      authorCompany: profile.company,
      authorLocation: profile.location,
      authorExperience: profile.experience,
      contactEmail: formData.get('contactEmail') as string,
      contactLinkedin: formData.get('contactLinkedin') as string,
    });
    setSubmitted(true);
  };

  const handleCultureSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addCulture({
      company: formData.get('company') as string,
      rating: Number(formData.get('rating')) || 0,
      pros: formData.get('pros') as string,
      cons: formData.get('cons') as string,
      workLifeBalance: formData.get('workLifeBalance') as string,
      management: formData.get('management') as string,
      authorId: profile.id,
      authorName: profile.name,
    });
    setSubmitted(true);
  };

  const handleHrFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const companyTagsStr = formData.get('companyTags') as string;
    const companyTags = companyTagsStr ? companyTagsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    const hrTagsStr = formData.get('hrTags') as string;
    const hrTags = hrTagsStr ? hrTagsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    addHrFeedback({
      company: formData.get('company') as string,
      hrName: formData.get('hrName') as string,
      hrEmail: formData.get('hrEmail') as string,
      hrLinkedin: formData.get('hrLinkedin') as string,
      comments: formData.get('comments') as string,
      companyTags,
      hrTags,
      authorId: profile.id,
      authorName: profile.name,
    });
    setSubmitted(true);
  };

  const handleSalarySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillsStr = formData.get('skills') as string;
    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    addSalary({
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      title: formData.get('title') as string,
      yoe: Number(formData.get('yoe')) || 0,
      base: Number(formData.get('base')) || 0,
      bonus: Number(formData.get('bonus')) || 0,
      stock: Number(formData.get('stock')) || 0,
      skills,
      authorId: profile.id,
      authorName: profile.name,
      authorCompany: profile.company,
      authorLocation: profile.location,
      authorExperience: profile.experience,
    });
    setSubmitted(true);
  };

  const InputGlass = ({ className, ...props }: any) => (
    <Input className={`h-12 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all font-medium placeholder:text-foreground/20 ${className}`} {...props} />
  );

  const TextareaGlass = ({ className, ...props }: any) => (
    <Textarea className={`bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all font-medium placeholder:text-foreground/20 resize-none ${className}`} {...props} />
  );

  const LabelGlass = ({ className, children, ...props }: any) => (
    <Label className={`text-xs font-medium text-foreground/60 uppercase tracking-widest ml-1 mb-2 block ${className}`} {...props}>{children}</Label>
  );

  if (submitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
        <Navbar />
        <main className="container mx-auto py-32 px-4 md:px-6 max-w-2xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-3xl p-12 md:p-16 flex flex-col items-center shadow-2xl"
          >
            <div className="h-24 w-24 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-8 neu-pressed">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Insight Logged</h2>
            <p className="text-foreground/60 font-medium mb-10 max-w-md">
              Your contribution has been securely added to the network. The community thanks you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Button onClick={() => setSubmitted(false)} variant="outline" className="h-12 px-8 rounded-full glass border-white/10 font-medium hover:bg-white/10">Log Another</Button>
              <Button onClick={() => setLocation("/profile")} className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium">View Ledger</Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <Navbar />
      
      <main className="container mx-auto mt-24 px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl glass mb-6">
            <Sparkles className="h-8 w-8 text-foreground/80" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Add <span className="gradient-text">Insight</span></h1>
          <p className="text-foreground/60 text-lg font-medium">
            Contribute raw data to the collective truth. No fluff, just facts.
          </p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="space-y-12">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent p-0 gap-2 border-none mb-12">
            {[
              { id: 'interview', icon: MessageSquare, label: 'Interview' },
              { id: 'job', icon: Briefcase, label: 'Job' },
              { id: 'referral', icon: Handshake, label: 'Referral' },
              { id: 'culture', icon: Heart, label: 'Culture' },
              { id: 'hrfeedback', icon: ClipboardList, label: 'HR' },
              { id: 'salary', icon: TrendingUp, label: 'Salary' },
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="glass rounded-full px-6 py-3 font-medium data-[state=active]:bg-white/10 data-[state=active]:text-foreground text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 text-sm"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* INTERVIEW TAB */}
          <TabsContent value="interview" className="m-0 focus-visible:outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <MessageSquare className="h-6 w-6 text-primary" /> Interview Data
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Log questions, process, and outcomes.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleInterviewSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company Name *</LabelGlass>
                      <InputGlass name="company" defaultValue={profile.company} required />
                    </div>
                    <div>
                      <LabelGlass>Role Interviewed For *</LabelGlass>
                      <InputGlass name="role" placeholder="e.g. Senior Frontend Engineer" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                     <div>
                        <LabelGlass>Interview Level *</LabelGlass>
                        <Select name="level" defaultValue="L2">
                          <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl font-medium">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10 rounded-xl">
                            <SelectItem value="Intern">Intern / Fresher</SelectItem>
                            <SelectItem value="L1">Entry / L1</SelectItem>
                            <SelectItem value="L2">Mid / L2</SelectItem>
                            <SelectItem value="L3">Senior / L3</SelectItem>
                            <SelectItem value="L4">Staff / L4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <LabelGlass>Overall Experience *</LabelGlass>
                        <Select name="experience" defaultValue="Positive">
                          <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl font-medium">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10 rounded-xl">
                            <SelectItem value="Positive">Positive</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Negative">Negative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <LabelGlass>Offer Status *</LabelGlass>
                        <Select name="outcome" defaultValue="Pending">
                          <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl font-medium">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10 rounded-xl">
                            <SelectItem value="Offer">Got Offer</SelectItem>
                            <SelectItem value="No Offer">No Offer</SelectItem>
                            <SelectItem value="Pending">Pending/Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  </div>

                  <div>
                    <LabelGlass>Interview Process *</LabelGlass>
                    <TextareaGlass 
                      name="process"
                      placeholder="Describe the rounds (e.g. 1 Phone screen, 2 Coding, 1 System Design)." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="p-6 neu-pressed border-none rounded-2xl">
                    <LabelGlass className="!ml-0 text-primary/80">Questions Asked *</LabelGlass>
                    <TextareaGlass 
                      name="questions"
                      placeholder="List the specific technical or behavioral questions." 
                      className="min-h-[150px] bg-transparent border-white/5 focus-visible:border-white/20"
                      required
                    />
                  </div>
                  
                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Submit Log</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

          {/* JOB TAB */}
          <TabsContent value="job" className="m-0 focus-visible:outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <Briefcase className="h-6 w-6 text-primary" /> Post Job
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Share active openings or walk-in drives.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleJobSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Job Title *</LabelGlass>
                      <InputGlass name="title" placeholder="e.g. Backend Developer" required />
                    </div>
                    <div>
                      <LabelGlass>Company *</LabelGlass>
                      <InputGlass name="company" defaultValue={profile.company} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <LabelGlass>Location *</LabelGlass>
                      <InputGlass name="location" defaultValue="Remote" required />
                    </div>
                    <div>
                      <LabelGlass>Experience Req</LabelGlass>
                      <InputGlass name="experienceRequired" placeholder="e.g. 2-4 YOE" />
                    </div>
                    <div>
                      <LabelGlass>Type *</LabelGlass>
                      <Select name="offer" defaultValue="job">
                        <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 rounded-xl font-medium">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-white/10 rounded-xl">
                          <SelectItem value="job">Standard Job</SelectItem>
                          <SelectItem value="walkin">Walk-in Drive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <LabelGlass>Key Skills</LabelGlass>
                    <InputGlass name="skills" placeholder="e.g. React, Node.js (comma separated)" />
                  </div>

                  <div>
                    <LabelGlass>Description / Instructions</LabelGlass>
                    <TextareaGlass 
                      name="description"
                      placeholder="Details about the role..." 
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <LabelGlass>Application URL</LabelGlass>
                    <InputGlass name="url" type="url" placeholder="https://..." />
                  </div>
                  
                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Broadcast Job</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

          {/* REFERRAL TAB */}
          <TabsContent value="referral" className="m-0 focus-visible:outline-none">
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <Handshake className="h-6 w-6 text-primary" /> Offer Referral
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Help someone get their foot in the door.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleReferralSubmit} className="space-y-8">
                  <div className="p-6 neu-pressed border-none rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 mb-1">Referrer Identity</p>
                      <p className="text-lg font-semibold">{profile.name}</p>
                      <p className="text-sm font-medium text-foreground/70">{profile.experience} at {profile.company}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company *</LabelGlass>
                      <InputGlass name="company" defaultValue={profile.company} required />
                    </div>
                    <div>
                      <LabelGlass>Target Role *</LabelGlass>
                      <InputGlass name="role" placeholder="e.g. Frontend Engineer" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Location *</LabelGlass>
                      <InputGlass name="location" defaultValue="Remote" required />
                    </div>
                    <div>
                      <LabelGlass>Experience Level *</LabelGlass>
                      <InputGlass name="experienceRequired" placeholder="e.g. 3+ Years" required />
                    </div>
                  </div>

                  <div>
                    <LabelGlass>Required Skills</LabelGlass>
                    <InputGlass name="skills" placeholder="e.g. React, TypeScript (comma separated)" />
                  </div>

                  <div>
                    <LabelGlass>How to Request Referral *</LabelGlass>
                    <TextareaGlass 
                      name="instructions"
                      placeholder="e.g. Email me your resume and a short paragraph about why you fit." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                      <LabelGlass>Contact Email (Optional)</LabelGlass>
                      <InputGlass name="contactEmail" type="email" placeholder="Required if taking via email" />
                    </div>
                    <div>
                      <LabelGlass>LinkedIn URL (Optional)</LabelGlass>
                      <InputGlass name="contactLinkedin" type="url" placeholder="Required if taking via DMs" />
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Post Referral</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

          {/* CULTURE TAB */}
          <TabsContent value="culture" className="m-0 focus-visible:outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <Heart className="h-6 w-6 text-primary" /> Culture Review
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Share the reality of working at your company.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleCultureSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company *</LabelGlass>
                      <InputGlass name="company" defaultValue={profile.company} required />
                    </div>
                    <div>
                      <LabelGlass>Overall Rating (1-5) *</LabelGlass>
                      <InputGlass name="rating" type="number" min="1" max="5" placeholder="5" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass className="text-green-400/80">Pros *</LabelGlass>
                      <TextareaGlass name="pros" placeholder="What's great?" className="min-h-[120px]" required />
                    </div>
                    <div>
                      <LabelGlass className="text-red-400/80">Cons *</LabelGlass>
                      <TextareaGlass name="cons" placeholder="What sucks?" className="min-h-[120px]" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Work-Life Balance</LabelGlass>
                      <InputGlass name="workLifeBalance" placeholder="e.g. 40hrs/week, strict offline after 6" />
                    </div>
                    <div>
                      <LabelGlass>Management Style</LabelGlass>
                      <InputGlass name="management" placeholder="e.g. Micromanaged or Autonomous?" />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Submit Review</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

          {/* HR FEEDBACK TAB */}
          <TabsContent value="hrfeedback" className="m-0 focus-visible:outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <ClipboardList className="h-6 w-6 text-primary" /> HR Feedback
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Review recruiters and hiring processes.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleHrFeedbackSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company *</LabelGlass>
                      <InputGlass name="company" placeholder="Company Name" required />
                    </div>
                    <div>
                      <LabelGlass>HR / Recruiter Name *</LabelGlass>
                      <InputGlass name="hrName" placeholder="e.g. Jane Doe" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>HR Email</LabelGlass>
                      <InputGlass name="hrEmail" type="email" placeholder="jane@company.com" />
                    </div>
                    <div>
                      <LabelGlass>HR LinkedIn</LabelGlass>
                      <InputGlass name="hrLinkedin" type="url" placeholder="https://..." />
                    </div>
                  </div>

                  <div>
                    <LabelGlass>Feedback / Comments *</LabelGlass>
                    <TextareaGlass 
                      name="comments"
                      placeholder="Ghosted after 3rd round? Super helpful and transparent? Share it here." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company Tags</LabelGlass>
                      <InputGlass name="companyTags" placeholder="e.g. Slow Process, Ghosting (comma separated)" />
                    </div>
                    <div>
                      <LabelGlass>HR Tags</LabelGlass>
                      <InputGlass name="hrTags" placeholder="e.g. Responsive, Helpful, Rude (comma separated)" />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Submit Feedback</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

          {/* SALARY TAB */}
          <TabsContent value="salary" className="m-0 focus-visible:outline-none">
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-3 mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" /> Salary Insights
                </h2>
                <p className="text-foreground/50 font-medium text-sm">Add transparency to tech compensation.</p>
              </div>
              <div className="p-8 md:p-10">
                <form onSubmit={handleSalarySubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Company *</LabelGlass>
                      <InputGlass name="company" defaultValue={profile.company} required />
                    </div>
                    <div>
                      <LabelGlass>Job Title *</LabelGlass>
                      <InputGlass name="title" placeholder="e.g. Software Engineer II" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <LabelGlass>Location *</LabelGlass>
                      <InputGlass name="location" defaultValue={profile.location} required />
                    </div>
                    <div>
                      <LabelGlass>Years of Experience *</LabelGlass>
                      <InputGlass name="yoe" type="number" placeholder="e.g. 4" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 p-6 neu-pressed rounded-2xl border-none">
                    <div>
                      <LabelGlass className="!text-green-400/80">Base Salary ($) *</LabelGlass>
                      <InputGlass name="base" type="number" placeholder="150000" className="bg-transparent border-white/5" required />
                    </div>
                    <div>
                      <LabelGlass className="!text-green-400/80">Yearly Bonus ($)</LabelGlass>
                      <InputGlass name="bonus" type="number" placeholder="15000" className="bg-transparent border-white/5" />
                    </div>
                    <div>
                      <LabelGlass className="!text-green-400/80">Stock / RSU ($)</LabelGlass>
                      <InputGlass name="stock" type="number" placeholder="50000" className="bg-transparent border-white/5" />
                    </div>
                  </div>

                  <div>
                    <LabelGlass>Skills / Tech Stack</LabelGlass>
                    <InputGlass name="skills" placeholder="e.g. React, Node.js (comma separated)" />
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button type="submit" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all">Submit Compensation</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}