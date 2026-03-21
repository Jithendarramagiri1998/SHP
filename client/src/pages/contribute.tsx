import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Briefcase, DollarSign, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

export default function ContributePage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const defaultTab = searchParams.get('tab') || "job";
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to the backend
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="container mx-auto py-16 px-4 md:px-6 max-w-2xl text-center">
          <Card className="border-border/60 shadow-lg py-12">
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold">Contribution Received!</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Thank you for sharing with the CareerDoor community. Your contribution helps others in their career journey.
              </p>
              <div className="pt-6 flex gap-4">
                <Button onClick={() => setSubmitted(false)} variant="outline">Add Another</Button>
                <Button onClick={() => window.location.href = "/"}>Back to Home</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Share with the Community
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Help others by sharing jobs from your company, your salary, or your interview experiences.</p>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1">
            <TabsTrigger value="job" className="py-3 text-base gap-2">
              <Briefcase className="h-4 w-4" /> Add Job / Referral
            </TabsTrigger>
            <TabsTrigger value="salary" className="py-3 text-base gap-2">
              <DollarSign className="h-4 w-4" /> Share Salary
            </TabsTrigger>
            <TabsTrigger value="interview" className="py-3 text-base gap-2">
              <Users className="h-4 w-4" /> Interview Insight
            </TabsTrigger>
          </TabsList>

          <TabsContent value="job" className="m-0">
            <Card className="border-border/60 shadow-md">
              <CardHeader className="bg-secondary/30 border-b pb-6">
                <CardTitle className="text-2xl">Post a Job or Offer a Referral</CardTitle>
                <CardDescription className="text-base mt-1">Are they hiring at your company? Share the link or offer to refer someone.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="job-company" className="text-sm font-semibold">Company Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="job-company" placeholder="e.g. Google" className="pl-9" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="job-location" className="text-sm font-semibold">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="job-location" placeholder="e.g. New York or Remote" className="pl-9" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title" className="text-sm font-semibold">Job Title *</Label>
                    <Input id="job-title" placeholder="e.g. Senior Frontend Engineer" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="job-type" className="text-sm font-semibold">Job Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="job-offer" className="text-sm font-semibold">What are you offering? *</Label>
                        <Select defaultValue="referral">
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="referral">I can refer someone</SelectItem>
                            <SelectItem value="link">Just sharing the application link</SelectItem>
                            <SelectItem value="walkin">Sharing a Walk-in Drive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-url" className="text-sm font-semibold">Job URL / Link</Label>
                    <Input id="job-url" type="url" placeholder="https://..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-desc" className="text-sm font-semibold">Additional Details or Instructions</Label>
                    <Textarea 
                      id="job-desc" 
                      placeholder="e.g. DM me your resume if interested. Looking for 3+ years experience with React." 
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" size="lg" className="px-8">Post Job</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary" className="m-0">
            <Card className="border-border/60 shadow-md">
              <CardHeader className="bg-secondary/30 border-b pb-6">
                <CardTitle className="text-2xl">Contribute Salary Insight</CardTitle>
                <CardDescription className="text-base mt-1">Help others know their worth by anonymously sharing your compensation.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sal-company" className="text-sm font-semibold">Company Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="sal-company" placeholder="e.g. Stripe" className="pl-9" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sal-location" className="text-sm font-semibold">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="sal-location" placeholder="e.g. San Francisco" className="pl-9" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="sal-title" className="text-sm font-semibold">Job Title *</Label>
                        <Input id="sal-title" placeholder="e.g. Product Designer" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sal-yoe" className="text-sm font-semibold">Years of Experience</Label>
                        <Input id="sal-yoe" type="number" placeholder="e.g. 5" min="0" />
                      </div>
                  </div>

                  <div className="space-y-4 p-5 bg-muted/30 rounded-xl border border-border">
                    <h3 className="font-semibold text-lg">Compensation Details</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sal-base" className="text-sm">Base Salary (/yr) *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input id="sal-base" type="number" placeholder="120,000" className="pl-7" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sal-bonus" className="text-sm">Bonus (/yr)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input id="sal-bonus" type="number" placeholder="15,000" className="pl-7" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sal-stock" className="text-sm">Stock/Equity (/yr)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input id="sal-stock" type="number" placeholder="30,000" className="pl-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sal-skills" className="text-sm font-semibold">Primary Skills/Tech Stack</Label>
                    <Input id="sal-skills" placeholder="e.g. Figma, Framer, User Research" />
                    <p className="text-xs text-muted-foreground">Comma separated</p>
                  </div>
                  
                  <div className="pt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Your submission will be anonymous
                    </p>
                    <Button type="submit" size="lg" className="px-8">Submit Salary</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interview" className="m-0">
            <Card className="border-border/60 shadow-md">
              <CardHeader className="bg-secondary/30 border-b pb-6">
                <CardTitle className="text-2xl">Share Interview Experience</CardTitle>
                <CardDescription className="text-base mt-1">What did they ask? How was the process? Help others prepare.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="int-company" className="text-sm font-semibold">Company Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="int-company" placeholder="e.g. Amazon" className="pl-9" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="int-role" className="text-sm font-semibold">Role Interviewed For *</Label>
                      <Input id="int-role" placeholder="e.g. Software Development Engineer II" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="int-difficulty" className="text-sm font-semibold">Difficulty</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="int-level" className="text-sm font-semibold">Level (if applicable)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="l1">Entry / L1</SelectItem>
                            <SelectItem value="l2">Mid / L2</SelectItem>
                            <SelectItem value="l3">Senior / L3+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="int-outcome" className="text-sm font-semibold">Offer Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="offer">Got Offer</SelectItem>
                            <SelectItem value="no-offer">No Offer</SelectItem>
                            <SelectItem value="pending">Pending/Declined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="int-process" className="text-sm font-semibold">Interview Process Overview *</Label>
                    <Textarea 
                      id="int-process" 
                      placeholder="e.g. 1 Phone screen with recruiter, followed by 4 rounds of virtual onsite (2 coding, 1 system design, 1 behavioral)." 
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2 bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <Label htmlFor="int-questions" className="text-sm font-semibold text-primary">Questions Asked & Suggestions *</Label>
                    <Textarea 
                      id="int-questions" 
                      placeholder="What were the specific questions? E.g., 'Design a rate limiter' or 'Tell me about a time you disagreed with a manager.' Any tips for future candidates?" 
                      className="min-h-[150px] bg-background"
                      required
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" size="lg" className="px-8">Submit Experience</Button>
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