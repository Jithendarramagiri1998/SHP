import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Briefcase, Users, Sparkles, CheckCircle2, MessageSquare, Handshake, Heart, Mail, Linkedin, Star, ClipboardList } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";

export default function ContributePage() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const defaultTab = searchParams.get('tab') || "interview";
  
  const { profile, addInterview, addJob, addReferral, addCulture, addHrFeedback } = useStore();
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="container mx-auto py-16 px-4 md:px-6 max-w-2xl text-center animate-in fade-in zoom-in duration-500">
          <Card className="border-border/60 shadow-xl py-12 bg-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 pointer-events-none" />
            <CardContent className="flex flex-col items-center space-y-6 relative z-10">
              <div className="h-24 w-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">Contribution Saved!</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Thank you for sharing with the CareerDoor community. Your insights help others navigate their career journeys.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
                <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full h-12 text-base">Add Another</Button>
                <Button onClick={() => setLocation("/profile")} className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity border-0">View My Profile</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <Navbar />
      
      <main className="container mx-auto mt-8 px-4 md:px-6 max-w-4xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Contribute
          </h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl">Share your knowledge and help build a more transparent professional community.</p>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto p-1.5 bg-card border rounded-2xl shadow-sm">
            <TabsTrigger value="interview" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all">
              <MessageSquare className="h-4 w-4" /> <span className="hidden md:inline">Interview</span> Exp
            </TabsTrigger>
            <TabsTrigger value="job" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-600 transition-all">
              <Briefcase className="h-4 w-4" /> <span className="hidden md:inline">Job</span> Postings
            </TabsTrigger>
            <TabsTrigger value="referral" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 transition-all">
              <Handshake className="h-4 w-4" /> Referrals
            </TabsTrigger>
            <TabsTrigger value="culture" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-600 transition-all">
              <Heart className="h-4 w-4" /> Culture
            </TabsTrigger>
            <TabsTrigger value="hrfeedback" className="py-3.5 text-sm md:text-base gap-2 rounded-xl data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 transition-all">
              <ClipboardList className="h-4 w-4" /> HR Feedback
            </TabsTrigger>
          </TabsList>

          {/* INTERVIEW TAB */}
          <TabsContent value="interview" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-border/60 shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-primary"></div>
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-blue-500" /> Share Interview Experience
                </CardTitle>
                <CardDescription className="text-base mt-2">What did they ask? How was the process? Help others prepare.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-card">
                <form onSubmit={handleInterviewSubmit} className="space-y-8">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company Name <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="company" defaultValue={profile.company} className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Role Interviewed For <span className="text-destructive">*</span></Label>
                      <Input name="role" placeholder="e.g. Senior Frontend Engineer" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                     <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground/80">Interview Level <span className="text-destructive">*</span></Label>
                        <Select name="level" defaultValue="L2">
                          <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Intern">Intern / Fresher</SelectItem>
                            <SelectItem value="L1">Entry / L1</SelectItem>
                            <SelectItem value="L2">Mid / L2</SelectItem>
                            <SelectItem value="L3">Senior / L3</SelectItem>
                            <SelectItem value="L4">Staff / L4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground/80">Overall Experience <span className="text-destructive">*</span></Label>
                        <Select name="experience" defaultValue="Positive">
                          <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Positive">Positive</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Negative">Negative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground/80">Offer Status <span className="text-destructive">*</span></Label>
                        <Select name="outcome" defaultValue="Pending">
                          <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Offer">Got Offer</SelectItem>
                            <SelectItem value="No Offer">No Offer</SelectItem>
                            <SelectItem value="Pending">Pending/Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">Interview Process <span className="text-destructive">*</span></Label>
                    <Textarea 
                      name="process"
                      placeholder="Describe the rounds (e.g. 1 Phone screen, 2 Coding, 1 System Design). How long did it take?" 
                      className="min-h-[120px] rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-3 bg-blue-500/5 p-6 rounded-2xl border border-blue-500/20">
                    <Label className="text-sm font-semibold text-blue-600 dark:text-blue-400">Questions Asked <span className="text-destructive">*</span></Label>
                    <Textarea 
                      name="questions"
                      placeholder="List the specific technical or behavioral questions you were asked." 
                      className="min-h-[150px] rounded-xl bg-background border-border/50 resize-none"
                      required
                    />
                  </div>
                  
                  <div className="pt-6 flex justify-end border-t border-border/50">
                    <Button type="submit" size="lg" className="px-8 h-12 rounded-xl text-base bg-blue-600 hover:bg-blue-700">Submit Experience</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JOB TAB */}
          <TabsContent value="job" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-border/60 shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-orange-500" /> Post a Job or Walk-in
                </CardTitle>
                <CardDescription className="text-base mt-2">Help the community by sharing active openings or walk-in drives.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-card">
                <form onSubmit={handleJobSubmit} className="space-y-8">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Job Title <span className="text-destructive">*</span></Label>
                      <Input name="title" placeholder="e.g. Backend Developer" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="company" defaultValue={profile.company} className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Location <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="location" defaultValue="Remote" className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Experience Required</Label>
                      <Input name="experienceRequired" placeholder="e.g. 2-4 YOE" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Posting Type <span className="text-destructive">*</span></Label>
                      <Select name="offer" defaultValue="job">
                        <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="job">Standard Job Opening</SelectItem>
                          <SelectItem value="walkin">Walk-in Drive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">Key Skills Required</Label>
                    <Input name="skills" placeholder="e.g. React, Node.js, AWS (comma separated)" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">Job Description / Instructions</Label>
                    <Textarea 
                      name="description"
                      placeholder="Provide details about the role, responsibilities, or specific instructions for walk-ins." 
                      className="min-h-[120px] rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">Application URL</Label>
                    <Input name="url" type="url" placeholder="https://..." className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                  </div>
                  
                  <div className="pt-6 flex justify-end border-t border-border/50">
                    <Button type="submit" size="lg" className="px-8 h-12 rounded-xl text-base bg-orange-600 hover:bg-orange-700">Post Job</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REFERRAL TAB */}
          <TabsContent value="referral" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-border/60 shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Handshake className="h-6 w-6 text-green-500" /> Offer a Referral
                </CardTitle>
                <CardDescription className="text-base mt-2">Help someone get their foot in the door at your company.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-card">
                <form onSubmit={handleReferralSubmit} className="space-y-8">
                  
                  <div className="p-6 bg-green-500/5 rounded-2xl border border-green-500/20 mb-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-16 w-16 bg-background rounded-full shadow-sm flex items-center justify-center text-2xl font-bold text-green-600 border border-border">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-1">
                      <p className="text-sm text-green-600 font-semibold uppercase tracking-wider">Referrer Profile</p>
                      <p className="text-lg font-medium">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{profile.experience} at {profile.company} • {profile.location}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company <span className="text-destructive">*</span></Label>
                      <Input name="company" defaultValue={profile.company} className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Role(s) you can refer for <span className="text-destructive">*</span></Label>
                      <Input name="role" placeholder="e.g. Any Software Engineering roles" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Target Experience Level</Label>
                      <Input name="experienceRequired" placeholder="e.g. 3+ Years" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Preferred Skills</Label>
                      <Input name="skills" placeholder="e.g. Python, React (comma separated)" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">How should candidates contact you? <span className="text-destructive">*</span></Label>
                    <Textarea 
                      name="instructions"
                      placeholder="e.g. Please email me your resume and the specific job ID link. Tell me briefly why you're a good fit." 
                      className="min-h-[100px] rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Contact Email
                      </Label>
                      <Input name="contactEmail" type="email" defaultValue={profile.email} placeholder="Will be hidden until requested" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                        <Linkedin className="h-4 w-4" /> LinkedIn Profile
                      </Label>
                      <Input name="contactLinkedin" type="url" defaultValue={profile.linkedin} placeholder="https://linkedin.com/in/..." className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-end border-t border-border/50">
                    <Button type="submit" size="lg" className="px-8 h-12 rounded-xl text-base bg-green-600 hover:bg-green-700">Offer Referral</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CULTURE TAB */}
          <TabsContent value="culture" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-border/60 shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-pink-400 to-rose-500"></div>
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Heart className="h-6 w-6 text-pink-500" /> Share Culture & Benefits
                </CardTitle>
                <CardDescription className="text-base mt-2">What's it really like to work there? Tell the community.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-card">
                <form onSubmit={handleCultureSubmit} className="space-y-8">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company <span className="text-destructive">*</span></Label>
                      <Input name="company" defaultValue={profile.company} className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Overall Rating (1-5) <span className="text-destructive">*</span></Label>
                      <Select name="rating" defaultValue="4">
                        <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="3">3 - Average</SelectItem>
                          <SelectItem value="2">2 - Poor</SelectItem>
                          <SelectItem value="1">1 - Terrible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-green-600 dark:text-green-400">Pros <span className="text-destructive">*</span></Label>
                      <Textarea 
                        name="pros"
                        placeholder="What are the best parts of working here?" 
                        className="min-h-[120px] rounded-xl bg-green-500/5 border-green-500/20 focus:bg-background transition-colors resize-none"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-red-600 dark:text-red-400">Cons <span className="text-destructive">*</span></Label>
                      <Textarea 
                        name="cons"
                        placeholder="What could be improved?" 
                        className="min-h-[120px] rounded-xl bg-red-500/5 border-red-500/20 focus:bg-background transition-colors resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Work-Life Balance</Label>
                      <Input name="workLifeBalance" placeholder="e.g. Flexible hours, rarely work weekends" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Management Style</Label>
                      <Input name="management" placeholder="e.g. Supportive, micromanaging, hands-off" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-end border-t border-border/50">
                    <Button type="submit" size="lg" className="px-8 h-12 rounded-xl text-base bg-pink-600 hover:bg-pink-700">Submit Review</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HR FEEDBACK TAB */}
          <TabsContent value="hrfeedback" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-border/60 shadow-lg rounded-2xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-purple-500" /> HR & Company Feedback
                </CardTitle>
                <CardDescription className="text-base mt-2">Share your experiences with HR representatives and recruiters.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-card">
                <form onSubmit={handleHrFeedbackSubmit} className="space-y-8">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="company" className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">Company Tags</Label>
                      <Input name="companyTags" placeholder="e.g. Slow process, Ghosting, Great culture (comma separated)" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">HR / Recruiter Name <span className="text-destructive">*</span></Label>
                      <Input name="hrName" placeholder="e.g. Jane Doe" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" required />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">HR Email (Optional)</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="hrEmail" type="email" placeholder="jane@company.com" className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground/80">HR LinkedIn (Optional)</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input name="hrLinkedin" type="url" placeholder="https://linkedin.com/in/..." className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">Feedback & Comments <span className="text-destructive">*</span></Label>
                    <Textarea 
                      name="comments"
                      placeholder="How was your interaction? Were they responsive? Professional?" 
                      className="min-h-[120px] rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground/80">HR Tags</Label>
                    <Input name="hrTags" placeholder="e.g. Responsive, Helpful, Unprofessional (comma separated)" className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-colors" />
                  </div>
                  
                  <div className="pt-6 flex justify-end border-t border-border/50">
                    <Button type="submit" size="lg" className="px-8 h-12 rounded-xl text-base bg-purple-600 hover:bg-purple-700">Submit HR Feedback</Button>
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
