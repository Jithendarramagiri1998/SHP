import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, TrendingUp, Users, MapPin, Clock, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { profile, updateProfile, jobs, salaries, interviews, deleteJob, deleteSalary, deleteInterview } = useStore();
  const [activeTab, setActiveTab] = useState("jobs");
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState(profile);

  const myJobs = jobs.filter(j => j.authorId === profile.id);
  const mySalaries = salaries.filter(s => s.authorId === profile.id);
  const myInterviews = interviews.filter(i => i.authorId === profile.id);

  const handleProfileSave = () => {
    updateProfile(editProfileData);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6 max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your details and view everything you've shared.</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-6">
            {isEditingProfile ? (
              <div className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={editProfileData.name} onChange={e => setEditProfileData({...editProfileData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input value={editProfileData.company} onChange={e => setEditProfileData({...editProfileData, company: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={editProfileData.location} onChange={e => setEditProfileData({...editProfileData, location: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience</Label>
                    <Input value={editProfileData.experience} onChange={e => setEditProfileData({...editProfileData, experience: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleProfileSave}>Save Profile</Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {profile.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {profile.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {profile.experience}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mb-4">My Contributions</h3>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            <TabsTrigger value="jobs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <Briefcase className="h-4 w-4" /> Jobs ({myJobs.length})
            </TabsTrigger>
            <TabsTrigger value="salaries" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <TrendingUp className="h-4 w-4" /> Salaries ({mySalaries.length})
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 gap-2">
              <Users className="h-4 w-4" /> Interviews ({myInterviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="m-0 space-y-4">
            {myJobs.length === 0 ? (
              <EmptyState message="You haven't posted any jobs yet." />
            ) : (
              myJobs.map(job => (
                <Card key={job.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          {job.isWalkin && <Badge variant="destructive" className="text-[10px]">Walk-in</Badge>}
                          {job.hasReferral && <Badge variant="default" className="text-[10px]">Offering Referral</Badge>}
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.posted}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => setLocation(`/contribute?tab=job&edit=${job.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteJob(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="salaries" className="m-0 space-y-4">
             {mySalaries.length === 0 ? (
              <EmptyState message="You haven't shared your salary yet." />
            ) : (
              mySalaries.map(salary => (
                <Card key={salary.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{salary.title} at {salary.company}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                          <span>{salary.yoe} YOE</span>
                          <span>•</span>
                          <span className="font-medium text-green-600">${salary.base.toLocaleString()} Base</span>
                          {salary.bonus > 0 && <span>+ ${salary.bonus.toLocaleString()} Bonus</span>}
                          {salary.stock > 0 && <span>+ ${salary.stock.toLocaleString()} Stock</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => setLocation(`/contribute?tab=salary&edit=${salary.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteSalary(salary.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 space-y-4">
             {myInterviews.length === 0 ? (
              <EmptyState message="You haven't shared any interview experiences yet." />
            ) : (
              myInterviews.map(interview => (
                <Card key={interview.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{interview.role} at {interview.company}</h3>
                          <Badge variant="outline">{interview.difficulty}</Badge>
                          <Badge variant={interview.outcome === 'Offer' ? 'default' : 'secondary'}>{interview.outcome}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{interview.process}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => setLocation(`/contribute?tab=interview&edit=${interview.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteInterview(interview.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 border border-dashed rounded-xl bg-card">
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button variant="outline" onClick={() => window.location.href = '/contribute'}>Make a Contribution</Button>
    </div>
  )
}