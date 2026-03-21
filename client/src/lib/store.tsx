import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  company: string;
  location: string;
  experience: string;
  email?: string;
  linkedin?: string;
};

export type Interview = { 
  id: string; 
  company: string; 
  role: string; 
  difficulty: string; 
  level: string; 
  outcome: string; 
  process: string; 
  questions: string; 
  experience: string; // "Positive", "Neutral", "Negative"
  date: string;
  
  // Author metadata
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
};

export type Job = { 
  id: string; 
  title: string; 
  company: string; 
  location: string; 
  type: string; 
  isWalkin: boolean; 
  skills: string[];
  experienceRequired: string;
  description?: string; 
  url?: string; 
  posted: string; 
  
  // Author metadata
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
};

export type Referral = {
  id: string;
  company: string;
  location: string;
  skillsRequired: string[];
  experienceRequired: string;
  role: string;
  instructions: string;
  posted: string;

  // Referrer Info
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
  contactEmail?: string;
  contactLinkedin?: string;
};

export type WorkCulture = {
  id: string;
  company: string;
  rating: number; // 1-5
  pros: string;
  cons: string;
  workLifeBalance: string;
  management: string;
  authorId: string;
  authorName: string;
};

export type Benefits = {
  id: string;
  company: string;
  healthInsurance: string;
  pto: string;
  retirement: string;
  perks: string[]; // "Free Lunch", "Gym", "WFH Stipend", etc
  authorId: string;
  authorName: string;
};

export type HrFeedback = {
  id: string;
  company: string;
  hrName: string;
  hrEmail: string;
  hrLinkedin: string;
  comments: string;
  companyTags: string[];
  hrTags: string[];
  authorId: string;
  authorName: string;
};

export type Salary = { 
  id: string; 
  company: string; 
  location: string; 
  title: string; 
  yoe: number; 
  base: number; 
  bonus: number; 
  stock: number; 
  skills: string[]; 
  
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
};

type StoreContextType = {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  
  interviews: Interview[];
  jobs: Job[];
  referrals: Referral[];
  cultures: WorkCulture[];
  benefits: Benefits[];
  salaries: Salary[];
  hrFeedbacks: HrFeedback[];
  
  addInterview: (data: Omit<Interview, 'id' | 'date'>) => void;
  addJob: (data: Omit<Job, 'id' | 'posted'>) => void;
  addReferral: (data: Omit<Referral, 'id' | 'posted'>) => void;
  addCulture: (data: Omit<WorkCulture, 'id'>) => void;
  addBenefit: (data: Omit<Benefits, 'id'>) => void;
  addSalary: (data: Omit<Salary, 'id'>) => void;
  addHrFeedback: (data: Omit<HrFeedback, 'id'>) => void;

  deleteItem: (type: 'interviews'|'jobs'|'referrals'|'cultures'|'benefits'|'salaries'|'hrFeedbacks', id: string) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

const defaultProfile: UserProfile = {
  id: "user_123",
  name: "John Doe",
  company: "TechCorp",
  location: "San Francisco, CA",
  experience: "5 YOE",
  email: "john@example.com",
  linkedin: "linkedin.com/in/johndoe"
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cd_profile_v2');
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  
  const [interviews, setInterviews] = useState<Interview[]>(() => JSON.parse(localStorage.getItem('cd_interviews_v2') || '[]'));
  const [jobs, setJobs] = useState<Job[]>(() => JSON.parse(localStorage.getItem('cd_jobs_v2') || '[]'));
  const [referrals, setReferrals] = useState<Referral[]>(() => JSON.parse(localStorage.getItem('cd_referrals_v2') || '[]'));
  const [cultures, setCultures] = useState<WorkCulture[]>(() => JSON.parse(localStorage.getItem('cd_cultures_v2') || '[]'));
  const [benefits, setBenefits] = useState<Benefits[]>(() => JSON.parse(localStorage.getItem('cd_benefits_v2') || '[]'));
  const [salaries, setSalaries] = useState<Salary[]>(() => JSON.parse(localStorage.getItem('cd_salaries_v2') || '[]'));
  const [hrFeedbacks, setHrFeedbacks] = useState<HrFeedback[]>(() => JSON.parse(localStorage.getItem('cd_hrfeedbacks_v2') || '[]'));

  useEffect(() => { localStorage.setItem('cd_profile_v2', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('cd_interviews_v2', JSON.stringify(interviews)); }, [interviews]);
  useEffect(() => { localStorage.setItem('cd_jobs_v2', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('cd_referrals_v2', JSON.stringify(referrals)); }, [referrals]);
  useEffect(() => { localStorage.setItem('cd_cultures_v2', JSON.stringify(cultures)); }, [cultures]);
  useEffect(() => { localStorage.setItem('cd_benefits_v2', JSON.stringify(benefits)); }, [benefits]);
  useEffect(() => { localStorage.setItem('cd_salaries_v2', JSON.stringify(salaries)); }, [salaries]);
  useEffect(() => { localStorage.setItem('cd_hrfeedbacks_v2', JSON.stringify(hrFeedbacks)); }, [hrFeedbacks]);

  const updateProfile = (newProfile: UserProfile) => setProfile(newProfile);

  const addInterview = (data: Omit<Interview, 'id' | 'date'>) => {
    setInterviews(prev => [{ ...data, id: Date.now().toString(), date: 'Today' }, ...prev]);
  };
  
  const addJob = (data: Omit<Job, 'id' | 'posted'>) => {
    setJobs(prev => [{ ...data, id: Date.now().toString(), posted: 'Just now' }, ...prev]);
  };
  
  const addReferral = (data: Omit<Referral, 'id' | 'posted'>) => {
    setReferrals(prev => [{ ...data, id: Date.now().toString(), posted: 'Just now' }, ...prev]);
  };
  
  const addCulture = (data: Omit<WorkCulture, 'id'>) => {
    setCultures(prev => [{ ...data, id: Date.now().toString() }, ...prev]);
  };
  
  const addBenefit = (data: Omit<Benefits, 'id'>) => {
    setBenefits(prev => [{ ...data, id: Date.now().toString() }, ...prev]);
  };

  const addSalary = (data: Omit<Salary, 'id'>) => {
    setSalaries(prev => [{ ...data, id: Date.now().toString() }, ...prev]);
  };

  const addHrFeedback = (data: Omit<HrFeedback, 'id'>) => {
    setHrFeedbacks(prev => [{ ...data, id: Date.now().toString() }, ...prev]);
  };

  const deleteItem = (type: string, id: string) => {
    if (type === 'interviews') setInterviews(p => p.filter(x => x.id !== id));
    if (type === 'jobs') setJobs(p => p.filter(x => x.id !== id));
    if (type === 'referrals') setReferrals(p => p.filter(x => x.id !== id));
    if (type === 'cultures') setCultures(p => p.filter(x => x.id !== id));
    if (type === 'benefits') setBenefits(p => p.filter(x => x.id !== id));
    if (type === 'salaries') setSalaries(p => p.filter(x => x.id !== id));
    if (type === 'hrFeedbacks') setHrFeedbacks(p => p.filter(x => x.id !== id));
  };

  return (
    <StoreContext.Provider value={{ 
      profile, updateProfile, 
      interviews, jobs, referrals, cultures, benefits, salaries, hrFeedbacks,
      addInterview, addJob, addReferral, addCulture, addBenefit, addSalary, addHrFeedback,
      deleteItem
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
