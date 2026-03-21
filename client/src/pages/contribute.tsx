import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Briefcase, Sparkles, CheckCircle2, MessageSquare, Handshake, Heart, Mail, Linkedin, ClipboardList, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";

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

  const InputBrutalist = ({ className, ...props }: any) => (
    <Input className={`rounded-none border-2 border-foreground h-14 focus-visible:ring-0 focus-visible:border-foreground uppercase font-bold tracking-wider text-sm ${className}`} {...props} />
  );

  const TextareaBrutalist = ({ className, ...props }: any) => (
    <Textarea className={`rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-foreground uppercase font-bold tracking-wider text-sm resize-none ${className}`} {...props} />
  );

  const LabelBrutalist = ({ className, children, ...props }: any) => (
    <Label className={`text-xs uppercase tracking-widest font-black ${className}`} {...props}>{children}</Label>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-24 px-4 md:px-6 max-w-3xl text-center">
          <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
            <CardContent className="flex flex-col items-center space-y-8 p-16">
              <div className="h-32 w-32 bg-foreground text-background rounded-none flex items-center justify-center mb-4">
                <CheckCircle2 className="h-16 w-16" />
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-foreground uppercase">Data Logged</h2>
              <p className="text-foreground/80 font-medium uppercase tracking-widest border-l-4 border-foreground pl-4 text-left">
                Your insight has been recorded to the decentralized registry. The community thanks you.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center w-full">
                <Button onClick={() => setSubmitted(false)} variant="outline" className="flex-1 h-16 rounded-none border-2 border-foreground font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all text-sm">Log Another</Button>
                <Button onClick={() => setLocation("/profile")} className="flex-1 h-16 rounded-none border-2 border-foreground bg-foreground text-background font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all text-sm">View Ledger</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto mt-12 px-4 md:px-6 max-w-5xl">
        <div className="mb-12 border-b-4 border-foreground pb-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter flex items-center gap-4 uppercase">
            <Sparkles className="h-12 w-12 text-foreground" /> Add Insight
          </h1>
          <p className="text-foreground/80 mt-4 text-xl font-medium uppercase tracking-wider border-l-4 border-foreground pl-4">
            Contribute raw data to the collective truth. No fluff.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-12">
          <TabsList className="flex flex-wrap w-full justify-start h-auto bg-transparent p-0 gap-4 border-none">
            <TabsTrigger value="interview" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <MessageSquare className="h-4 w-4" /> <span className="hidden md:inline">Interview</span> Exp
            </TabsTrigger>
            <TabsTrigger value="job" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <Briefcase className="h-4 w-4" /> <span className="hidden md:inline">Job</span> Postings
            </TabsTrigger>
            <TabsTrigger value="referral" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <Handshake className="h-4 w-4" /> Referrals
            </TabsTrigger>
            <TabsTrigger value="culture" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <Heart className="h-4 w-4" /> Culture
            </TabsTrigger>
            <TabsTrigger value="hrfeedback" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <ClipboardList className="h-4 w-4" /> HR
            </TabsTrigger>
            <TabsTrigger value="salary" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-6 py-4 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" /> Salary
            </TabsTrigger>
          </TabsList>

          {/* INTERVIEW TAB */}
          <TabsContent value="interview" className="m-0">
            <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <MessageSquare className="h-8 w-8" /> Interview Data
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">Log questions, process, and outcomes.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleInterviewSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Company Name *</LabelBrutalist>
                      <InputBrutalist name="company" defaultValue={profile.company} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Role Interviewed For *</LabelBrutalist>
                      <InputBrutalist name="role" placeholder="e.g. Senior Frontend Engineer" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                        <LabelBrutalist>Interview Level *</LabelBrutalist>
                        <Select name="level" defaultValue="L2">
                          <SelectTrigger className="h-14 rounded-none border-2 border-foreground uppercase font-bold tracking-widest">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-2 border-foreground">
                            <SelectItem value="Intern">Intern / Fresher</SelectItem>
                            <SelectItem value="L1">Entry / L1</SelectItem>
                            <SelectItem value="L2">Mid / L2</SelectItem>
                            <SelectItem value="L3">Senior / L3</SelectItem>
                            <SelectItem value="L4">Staff / L4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <LabelBrutalist>Overall Experience *</LabelBrutalist>
                        <Select name="experience" defaultValue="Positive">
                          <SelectTrigger className="h-14 rounded-none border-2 border-foreground uppercase font-bold tracking-widest">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-2 border-foreground">
                            <SelectItem value="Positive">Positive</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Negative">Negative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <LabelBrutalist>Offer Status *</LabelBrutalist>
                        <Select name="outcome" defaultValue="Pending">
                          <SelectTrigger className="h-14 rounded-none border-2 border-foreground uppercase font-bold tracking-widest">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-2 border-foreground">
                            <SelectItem value="Offer">Got Offer</SelectItem>
                            <SelectItem value="No Offer">No Offer</SelectItem>
                            <SelectItem value="Pending">Pending/Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Interview Process *</LabelBrutalist>
                    <TextareaBrutalist 
                      name="process"
                      placeholder="Describe the rounds (e.g. 1 Phone screen, 2 Coding, 1 System Design)." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-3 p-6 border-2 border-foreground bg-muted/20">
                    <LabelBrutalist>Questions Asked *</LabelBrutalist>
                    <TextareaBrutalist 
                      name="questions"
                      placeholder="List the specific technical or behavioral questions." 
                      className="min-h-[150px] bg-background"
                      required
                    />
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Submit Log</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JOB TAB */}
          <TabsContent value="job" className="m-0">
            <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Briefcase className="h-8 w-8" /> Post Job
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">Share active openings or walk-in drives.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleJobSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Job Title *</LabelBrutalist>
                      <InputBrutalist name="title" placeholder="e.g. Backend Developer" required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Company *</LabelBrutalist>
                      <InputBrutalist name="company" defaultValue={profile.company} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Location *</LabelBrutalist>
                      <InputBrutalist name="location" defaultValue="Remote" required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Experience Req</LabelBrutalist>
                      <InputBrutalist name="experienceRequired" placeholder="e.g. 2-4 YOE" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Type *</LabelBrutalist>
                      <Select name="offer" defaultValue="job">
                        <SelectTrigger className="h-14 rounded-none border-2 border-foreground uppercase font-bold tracking-widest">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-2 border-foreground">
                          <SelectItem value="job">Standard Job</SelectItem>
                          <SelectItem value="walkin">Walk-in Drive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Key Skills</LabelBrutalist>
                    <InputBrutalist name="skills" placeholder="e.g. React, Node.js (comma separated)" />
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Description / Instructions</LabelBrutalist>
                    <TextareaBrutalist 
                      name="description"
                      placeholder="Details about the role..." 
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Application URL</LabelBrutalist>
                    <InputBrutalist name="url" type="url" placeholder="https://..." />
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Broadcast Job</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REFERRAL TAB */}
          <TabsContent value="referral" className="m-0">
             <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Handshake className="h-8 w-8" /> Offer Referral
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">Help someone get their foot in the door.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleReferralSubmit} className="space-y-8">
                  <div className="p-6 border-2 border-foreground bg-muted/20 flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-16 w-16 bg-foreground text-background flex items-center justify-center text-2xl font-black border-2 border-foreground">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Referrer Identity</p>
                      <p className="text-xl font-black uppercase">{profile.name}</p>
                      <p className="text-sm font-bold uppercase tracking-wider">{profile.experience} at {profile.company}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Company *</LabelBrutalist>
                      <InputBrutalist name="company" defaultValue={profile.company} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Target Role *</LabelBrutalist>
                      <InputBrutalist name="role" placeholder="e.g. Software Engineer" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Target Experience</LabelBrutalist>
                      <InputBrutalist name="experienceRequired" placeholder="e.g. 3+ Years" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Preferred Skills</LabelBrutalist>
                      <InputBrutalist name="skills" placeholder="e.g. Python, React" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Instructions *</LabelBrutalist>
                    <TextareaBrutalist 
                      name="instructions"
                      placeholder="e.g. Email me resume and Job ID." 
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-4 border-t-2 border-foreground/20">
                    <div className="space-y-3">
                      <LabelBrutalist>Contact Email</LabelBrutalist>
                      <InputBrutalist name="contactEmail" type="email" defaultValue={profile.email} />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>LinkedIn</LabelBrutalist>
                      <InputBrutalist name="contactLinkedin" type="url" defaultValue={profile.linkedin} />
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Submit Offer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CULTURE TAB */}
          <TabsContent value="culture" className="m-0">
             <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Heart className="h-8 w-8" /> Culture Review
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">What's it really like?</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleCultureSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Company *</LabelBrutalist>
                      <InputBrutalist name="company" defaultValue={profile.company} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Rating (1-5) *</LabelBrutalist>
                      <Select name="rating" defaultValue="4">
                        <SelectTrigger className="h-14 rounded-none border-2 border-foreground uppercase font-bold tracking-widest">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-2 border-foreground">
                          <SelectItem value="5">5 - Excellent</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="3">3 - Average</SelectItem>
                          <SelectItem value="2">2 - Poor</SelectItem>
                          <SelectItem value="1">1 - Terrible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Pros *</LabelBrutalist>
                      <TextareaBrutalist name="pros" className="min-h-[120px]" required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Cons *</LabelBrutalist>
                      <TextareaBrutalist name="cons" className="min-h-[120px]" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Work-Life Balance</LabelBrutalist>
                      <InputBrutalist name="workLifeBalance" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Management Style</LabelBrutalist>
                      <InputBrutalist name="management" />
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Publish Review</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HR FEEDBACK TAB */}
          <TabsContent value="hrfeedback" className="m-0">
             <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <ClipboardList className="h-8 w-8" /> HR Feedback
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">Log recruiter interactions.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleHrFeedbackSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Company *</LabelBrutalist>
                      <InputBrutalist name="company" required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Company Tags</LabelBrutalist>
                      <InputBrutalist name="companyTags" placeholder="e.g. Slow process, Ghosting" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>HR Name *</LabelBrutalist>
                      <InputBrutalist name="hrName" required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>HR Email</LabelBrutalist>
                      <InputBrutalist name="hrEmail" type="email" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>HR LinkedIn</LabelBrutalist>
                      <InputBrutalist name="hrLinkedin" type="url" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>Comments *</LabelBrutalist>
                    <TextareaBrutalist name="comments" className="min-h-[120px]" required />
                  </div>

                  <div className="space-y-3">
                    <LabelBrutalist>HR Tags</LabelBrutalist>
                    <InputBrutalist name="hrTags" placeholder="e.g. Responsive, Helpful" />
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Submit Feedback</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SALARY TAB */}
          <TabsContent value="salary" className="m-0">
             <Card className="border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
              <CardHeader className="bg-foreground text-background p-8 border-b-4 border-foreground">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <TrendingUp className="h-8 w-8" /> Log Salary
                </CardTitle>
                <CardDescription className="text-background/80 uppercase font-bold tracking-widest mt-2">Transparent comp data.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSalarySubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Company *</LabelBrutalist>
                      <InputBrutalist name="company" defaultValue={profile.company} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Title / Role *</LabelBrutalist>
                      <InputBrutalist name="title" defaultValue={profile.role} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Location *</LabelBrutalist>
                      <InputBrutalist name="location" defaultValue={profile.location} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Years of Exp *</LabelBrutalist>
                      <InputBrutalist name="yoe" type="number" min="0" defaultValue={profile.experience.split(' ')[0]} required />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Base Salary (USD) *</LabelBrutalist>
                      <InputBrutalist name="base" type="number" min="0" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <LabelBrutalist>Bonus (USD)</LabelBrutalist>
                      <InputBrutalist name="bonus" type="number" min="0" defaultValue="0" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Stock / RSU (USD)</LabelBrutalist>
                      <InputBrutalist name="stock" type="number" min="0" defaultValue="0" />
                    </div>
                    <div className="space-y-3">
                      <LabelBrutalist>Skills</LabelBrutalist>
                      <InputBrutalist name="skills" placeholder="e.g. React, Java" defaultValue={profile.skills?.join(', ')} />
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t-4 border-foreground flex justify-end">
                    <Button type="submit" size="lg" className="h-16 px-12 rounded-none border-2 border-foreground bg-foreground text-background font-bold text-lg uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">Log Salary</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
