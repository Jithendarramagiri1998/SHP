import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Trash2, Edit, Heart, Handshake, ClipboardList, Users, TrendingUp, MapPin, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

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

  const InputGlass = ({ className, ...props }: any) => (
    <Input className={`h-12 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all font-medium placeholder:text-foreground/20 ${className}`} {...props} />
  );

  const LabelGlass = ({ className, children, ...props }: any) => (
    <Label className={`text-xs font-medium text-foreground/60 uppercase tracking-widest ml-1 mb-2 block ${className}`} {...props}>{children}</Label>
  );

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/4" />

      <Navbar />
      
      <main className="container mx-auto py-20 px-4 md:px-6 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">Your <span className="gradient-text">Ledger</span></h1>
            <p className="text-foreground/60 text-lg font-medium">
              Manage your identity and contributed insights.
            </p>
          </div>
          {!isEditingProfile && (
            <Button onClick={() => setIsEditingProfile(true)} variant="outline" className="rounded-full glass border-white/10 h-10 px-6 font-medium hover:bg-white/10">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl overflow-hidden shadow-2xl mb-16">
          {isEditingProfile ? (
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <LabelGlass>Full Name</LabelGlass>
                  <InputGlass value={editProfileData.name} onChange={(e:any) => setEditProfileData({...editProfileData, name: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Company</LabelGlass>
                  <InputGlass value={editProfileData.company} onChange={(e:any) => setEditProfileData({...editProfileData, company: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Role</LabelGlass>
                  <InputGlass value={editProfileData.role || ''} onChange={(e:any) => setEditProfileData({...editProfileData, role: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Location</LabelGlass>
                  <InputGlass value={editProfileData.location} onChange={(e:any) => setEditProfileData({...editProfileData, location: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Experience</LabelGlass>
                  <InputGlass value={editProfileData.experience} onChange={(e:any) => setEditProfileData({...editProfileData, experience: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Skills (comma separated)</LabelGlass>
                  <InputGlass value={editProfileData.skills?.join(', ') || ''} onChange={(e:any) => setEditProfileData({...editProfileData, skills: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>Contact Email</LabelGlass>
                  <InputGlass value={editProfileData.email} onChange={(e:any) => setEditProfileData({...editProfileData, email: e.target.value})} />
                </div>
                <div>
                  <LabelGlass>LinkedIn URL</LabelGlass>
                  <InputGlass value={editProfileData.linkedin} onChange={(e:any) => setEditProfileData({...editProfileData, linkedin: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-4 pt-8 border-t border-white/10 justify-end">
                <Button variant="ghost" onClick={() => setIsEditingProfile(false)} className="rounded-full h-12 px-8 font-medium">Cancel</Button>
                <Button onClick={handleProfileSave} className="rounded-full h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium">Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/3 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
                <div className="h-28 w-28 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-bold mb-6 neu-pressed">
                  {profile.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight mb-1">{profile.name}</h2>
                <p className="text-sm font-medium text-foreground/60">{profile.role}</p>
              </div>
              <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-sm font-medium text-foreground/80">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Company</span>
                    <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {profile.company}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Location</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {profile.location}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Experience</span>
                    {profile.experience}
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Contact</span>
                    {profile.email || "N/A"}
                  </div>
                </div>
                
                {profile.skills && profile.skills.length > 0 && (
                  <div className="pt-8 mt-8 border-t border-white/5">
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/50 mb-3">Core Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((s, i) => (
                        <Badge key={i} variant="outline" className="rounded-full border-white/10 bg-white/5 font-medium text-[10px] text-foreground/70">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold tracking-tight">Your Contributions</h3>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="flex flex-wrap justify-start h-auto bg-transparent p-0 gap-2 border-none">
            {[
              { id: 'jobs', icon: Briefcase, label: `Jobs (${myJobs.length})` },
              { id: 'referrals', icon: Handshake, label: `Referrals (${myReferrals.length})` },
              { id: 'interviews', icon: Users, label: `Interviews (${myInterviews.length})` },
              { id: 'culture', icon: Heart, label: `Culture (${myCultures.length})` },
              { id: 'hrfeedback', icon: ClipboardList, label: `HR (${myHrFeedbacks.length})` },
              { id: 'salaries', icon: TrendingUp, label: `Salaries (${mySalaries.length})` },
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="glass rounded-full px-5 py-2.5 font-medium data-[state=active]:bg-white/10 data-[state=active]:text-foreground text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 text-sm"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="jobs" className="m-0 focus-visible:outline-none">
            {myJobs.length === 0 ? <EmptyState type="jobs" /> : (
              <div className="grid gap-4">
                {myJobs.map(job => (
                  <DeletableCard key={job.id} onDelete={() => deleteItem('jobs', job.id)}>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="flex gap-3 text-xs font-medium text-foreground/60 mt-1">
                      <span>{job.company}</span> • <span>{job.location}</span>
                    </div>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="referrals" className="m-0 focus-visible:outline-none">
            {myReferrals.length === 0 ? <EmptyState type="referrals" /> : (
              <div className="grid gap-4">
                {myReferrals.map(ref => (
                  <DeletableCard key={ref.id} onDelete={() => deleteItem('referrals', ref.id)}>
                    <h3 className="text-lg font-semibold">{ref.role}</h3>
                    <div className="flex gap-3 text-xs font-medium text-foreground/60 mt-1">
                      <span>{ref.company}</span>
                    </div>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="interviews" className="m-0 focus-visible:outline-none">
             {myInterviews.length === 0 ? <EmptyState type="interviews" /> : (
              <div className="grid gap-4">
                {myInterviews.map(int => (
                  <DeletableCard key={int.id} onDelete={() => deleteItem('interviews', int.id)}>
                    <h3 className="text-lg font-semibold">{int.role} @ {int.company}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="rounded-full bg-white/5 border border-white/10 text-[10px] font-medium">{int.difficulty}</Badge>
                      <Badge variant="outline" className="rounded-full border-none bg-white/10 text-[10px] font-medium">{int.outcome}</Badge>
                    </div>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="culture" className="m-0 focus-visible:outline-none">
             {myCultures.length === 0 ? <EmptyState type="culture reviews" /> : (
              <div className="grid gap-4">
                {myCultures.map(culture => (
                  <DeletableCard key={culture.id} onDelete={() => deleteItem('cultures', culture.id)}>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{culture.company}</h3>
                      <Badge className="rounded-full bg-white/10 hover:bg-white/20 text-foreground text-[10px] font-medium">{culture.rating}/5</Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground/60 line-clamp-1">"{culture.pros}"</p>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hrfeedback" className="m-0 focus-visible:outline-none">
             {myHrFeedbacks.length === 0 ? <EmptyState type="HR feedback" /> : (
              <div className="grid gap-4">
                {myHrFeedbacks.map(feedback => (
                  <DeletableCard key={feedback.id} onDelete={() => deleteItem('hrFeedbacks', feedback.id)}>
                    <h3 className="text-lg font-semibold">{feedback.company}</h3>
                    <p className="text-sm font-medium text-foreground/60 mt-1">HR: {feedback.hrName}</p>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="salaries" className="m-0 focus-visible:outline-none">
             {mySalaries.length === 0 ? <EmptyState type="salaries" /> : (
              <div className="grid gap-4">
                {mySalaries.map(salary => (
                  <DeletableCard key={salary.id} onDelete={() => deleteItem('salaries', salary.id)}>
                    <h3 className="text-lg font-semibold">{salary.title} @ {salary.company}</h3>
                    <div className="flex gap-3 text-xs font-medium mt-2">
                      <span className="text-green-400">${salary.base.toLocaleString()} Base</span>
                      <span className="text-foreground/50">{salary.yoe} YOE</span>
                    </div>
                  </DeletableCard>
                ))}
              </div>
            )}
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}

function DeletableCard({ children, onDelete }: { children: React.ReactNode, onDelete: () => void }) {
  return (
    <div className="glass-card p-5 flex justify-between items-center group">
      <div>{children}</div>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-500/20 hover:text-red-400 h-10 w-10 ml-4 shrink-0 transition-colors opacity-50 group-hover:opacity-100" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-16 glass-panel rounded-2xl border-dashed">
      <p className="text-foreground/50 font-medium">No {type} logged yet.</p>
    </div>
  )
}