import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, TrendingUp, Users, MapPin, Clock, Trash2, Edit, Heart, Handshake, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { profile, updateProfile, jobs, salaries, interviews, referrals, cultures, hrFeedbacks, deleteItem } = useStore();
  const [activeTab, setActiveTab] = useState("jobs");
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState(profile);

  const myJobs = jobs.filter(j => j.authorId === profile.id);
  const mySalaries = salaries.filter(s => s.authorId === profile.id);
  const myInterviews = interviews.filter(i => i.authorId === profile.id);
  const myReferrals = referrals.filter(r => r.authorId === profile.id);
  const myCultures = cultures.filter(c => c.authorId === profile.id);
  const myHrFeedbacks = hrFeedbacks.filter(h => h.authorId === profile.id);

  const handleProfileSave = () => {
    updateProfile({
      ...editProfileData,
      skills: typeof editProfileData.skills === 'string' ? (editProfileData.skills as string).split(',').map(s=>s.trim()) : editProfileData.skills
    });
    setIsEditingProfile(false);
  };

  const InputBrutalist = ({ className, ...props }: any) => (
    <Input className={`rounded-none border-2 border-foreground h-12 focus-visible:ring-0 focus-visible:border-foreground uppercase font-bold tracking-wider text-sm ${className}`} {...props} />
  );

  const LabelBrutalist = ({ className, children, ...props }: any) => (
    <Label className={`text-xs uppercase tracking-widest font-black ${className}`} {...props}>{children}</Label>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4 md:px-6 max-w-6xl">
        <div className="mb-12 border-b-4 border-foreground pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase">Ledger</h1>
            <p className="text-foreground/80 mt-4 text-xl font-medium uppercase tracking-wider border-l-4 border-foreground pl-4">
              Your identity and data logs.
            </p>
          </div>
          {!isEditingProfile && (
            <Button onClick={() => setIsEditingProfile(true)} className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all h-12">
              <Edit className="mr-2 h-4 w-4" /> Modify Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <Card className="mb-16 border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-background">
          <CardContent className="p-0">
            {isEditingProfile ? (
              <div className="p-8 md:p-12 space-y-8 bg-muted/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <LabelBrutalist>Full Name</LabelBrutalist>
                    <InputBrutalist value={editProfileData.name} onChange={(e:any) => setEditProfileData({...editProfileData, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Company</LabelBrutalist>
                    <InputBrutalist value={editProfileData.company} onChange={(e:any) => setEditProfileData({...editProfileData, company: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Role</LabelBrutalist>
                    <InputBrutalist value={editProfileData.role || ''} onChange={(e:any) => setEditProfileData({...editProfileData, role: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Location</LabelBrutalist>
                    <InputBrutalist value={editProfileData.location} onChange={(e:any) => setEditProfileData({...editProfileData, location: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Experience</LabelBrutalist>
                    <InputBrutalist value={editProfileData.experience} onChange={(e:any) => setEditProfileData({...editProfileData, experience: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Skills (comma separated)</LabelBrutalist>
                    <InputBrutalist value={editProfileData.skills?.join(', ') || ''} onChange={(e:any) => setEditProfileData({...editProfileData, skills: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>Contact Email</LabelBrutalist>
                    <InputBrutalist value={editProfileData.email} onChange={(e:any) => setEditProfileData({...editProfileData, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <LabelBrutalist>LinkedIn URL</LabelBrutalist>
                    <InputBrutalist value={editProfileData.linkedin} onChange={(e:any) => setEditProfileData({...editProfileData, linkedin: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-4 pt-6 border-t-2 border-foreground/20">
                  <Button onClick={handleProfileSave} className="rounded-none border-2 border-foreground bg-foreground text-background font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all h-14 px-8">Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)} className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest h-14 px-8">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                <div className="bg-foreground text-background p-8 md:w-1/3 flex flex-col justify-center items-center text-center border-b-4 md:border-b-0 md:border-r-4 border-foreground">
                  <div className="h-32 w-32 bg-background text-foreground rounded-none flex items-center justify-center text-6xl font-black border-4 border-background mb-6">
                    {profile.name.charAt(0)}
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">{profile.name}</h2>
                  <p className="font-bold uppercase tracking-widest opacity-80">{profile.role}</p>
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center space-y-6">
                  <div className="grid grid-cols-2 gap-6 text-sm font-medium uppercase tracking-wider">
                    <div>
                      <span className="block opacity-60 text-xs mb-1 font-bold">Company</span>
                      {profile.company}
                    </div>
                    <div>
                      <span className="block opacity-60 text-xs mb-1 font-bold">Location</span>
                      {profile.location}
                    </div>
                    <div>
                      <span className="block opacity-60 text-xs mb-1 font-bold">Experience</span>
                      {profile.experience}
                    </div>
                    <div>
                      <span className="block opacity-60 text-xs mb-1 font-bold">Contact</span>
                      {profile.email || "N/A"}
                    </div>
                  </div>
                  
                  {profile.skills && profile.skills.length > 0 && (
                    <div className="pt-6 border-t-2 border-foreground/20">
                      <span className="block opacity-60 text-xs mb-3 font-bold uppercase tracking-widest">Core Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((s, i) => (
                          <Badge key={i} variant="outline" className="rounded-none border-2 border-foreground uppercase font-bold text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8 border-b-2 border-foreground pb-4">
          <h3 className="text-2xl font-black uppercase tracking-wider">Your Logs</h3>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="flex flex-wrap w-full justify-start h-auto bg-transparent p-0 gap-4 border-none">
            <TabsTrigger value="jobs" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4" /> Jobs ({myJobs.length})
            </TabsTrigger>
            <TabsTrigger value="referrals" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <Handshake className="h-4 w-4" /> Referrals ({myReferrals.length})
            </TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" /> Interviews ({myInterviews.length})
            </TabsTrigger>
            <TabsTrigger value="culture" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4" /> Culture ({myCultures.length})
            </TabsTrigger>
            <TabsTrigger value="hrfeedback" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <ClipboardList className="h-4 w-4" /> HR ({myHrFeedbacks.length})
            </TabsTrigger>
            <TabsTrigger value="salaries" className="rounded-none border-2 border-foreground font-bold uppercase tracking-widest px-4 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" /> Salaries ({mySalaries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="m-0 space-y-4">
            {myJobs.length === 0 ? <EmptyState type="jobs" /> : (
              myJobs.map(job => (
                <DeletableCard key={job.id} onDelete={() => deleteItem('jobs', job.id)}>
                  <h3 className="text-xl font-bold uppercase">{job.title}</h3>
                  <div className="flex gap-4 text-sm font-medium uppercase tracking-wider mt-2 opacity-80">
                    <span>{job.company}</span> • <span>{job.location}</span>
                  </div>
                </DeletableCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 space-y-4">
            {myReferrals.length === 0 ? <EmptyState type="referrals" /> : (
              myReferrals.map(ref => (
                <DeletableCard key={ref.id} onDelete={() => deleteItem('referrals', ref.id)}>
                  <h3 className="text-xl font-bold uppercase">Referral: {ref.role}</h3>
                  <div className="flex gap-4 text-sm font-medium uppercase tracking-wider mt-2 opacity-80">
                    <span>{ref.company}</span>
                  </div>
                </DeletableCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 space-y-4">
             {myInterviews.length === 0 ? <EmptyState type="interviews" /> : (
              myInterviews.map(int => (
                <DeletableCard key={int.id} onDelete={() => deleteItem('interviews', int.id)}>
                  <h3 className="text-xl font-bold uppercase">{int.role} @ {int.company}</h3>
                  <div className="flex gap-4 mt-3">
                    <Badge variant="outline" className="rounded-none border-foreground uppercase text-[10px] font-bold">{int.difficulty}</Badge>
                    <Badge variant="outline" className="rounded-none border-foreground uppercase text-[10px] font-bold">{int.outcome}</Badge>
                  </div>
                </DeletableCard>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="culture" className="m-0 space-y-4">
             {myCultures.length === 0 ? <EmptyState type="culture reviews" /> : (
              myCultures.map(culture => (
                <DeletableCard key={culture.id} onDelete={() => deleteItem('cultures', culture.id)}>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold uppercase">{culture.company}</h3>
                    <Badge className="rounded-none bg-foreground text-background uppercase text-[10px] font-bold">{culture.rating}/5</Badge>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 mt-2 line-clamp-1">"{culture.pros}"</p>
                </DeletableCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="hrfeedback" className="m-0 space-y-4">
             {myHrFeedbacks.length === 0 ? <EmptyState type="HR feedback" /> : (
              myHrFeedbacks.map(feedback => (
                <DeletableCard key={feedback.id} onDelete={() => deleteItem('hrFeedbacks', feedback.id)}>
                  <h3 className="text-xl font-bold uppercase">{feedback.company}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider mt-1 opacity-80">HR: {feedback.hrName}</p>
                </DeletableCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="salaries" className="m-0 space-y-4">
             {mySalaries.length === 0 ? <EmptyState type="salaries" /> : (
              mySalaries.map(salary => (
                <DeletableCard key={salary.id} onDelete={() => deleteItem('salaries', salary.id)}>
                  <h3 className="text-xl font-bold uppercase">{salary.title} @ {salary.company}</h3>
                  <div className="flex gap-4 text-sm font-bold uppercase tracking-wider mt-3">
                    <span className="bg-foreground text-background px-2 py-1">${salary.base.toLocaleString()} Base</span>
                    <span className="px-2 py-1 border-2 border-foreground">{salary.yoe} YOE</span>
                  </div>
                </DeletableCard>
              ))
            )}
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}

function DeletableCard({ children, onDelete }: { children: React.ReactNode, onDelete: () => void }) {
  return (
    <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-background hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all">
      <CardContent className="p-6 flex justify-between items-center">
        <div>{children}</div>
        <Button variant="outline" size="icon" className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background h-12 w-12 ml-4 shrink-0" onClick={onDelete}>
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-foreground/50 bg-muted/5">
      <p className="text-foreground/60 font-bold uppercase tracking-widest">No {type} logged yet.</p>
    </div>
  )
}
