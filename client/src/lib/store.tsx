import { useState, createContext, useContext, useEffect, useMemo } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  company: string;
  location: string;
  experience: string;
};

export type Job = { 
  id: string; 
  title: string; 
  company: string; 
  location: string; 
  type: string; 
  url?: string; 
  description?: string; 
  isWalkin: boolean; 
  hasReferral: boolean; 
  posted: string; 
  
  // Author metadata
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
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
  
  // Author metadata
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
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
  date: string;
  
  // Author metadata
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorLocation: string;
  authorExperience: string;
};

type StoreContextType = {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  jobs: Job[];
  salaries: Salary[];
  interviews: Interview[];
  
  addJob: (job: Omit<Job, 'id' | 'posted'>) => void;
  editJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  addSalary: (salary: Omit<Salary, 'id'>) => void;
  editSalary: (id: string, updates: Partial<Salary>) => void;
  deleteSalary: (id: string) => void;

  addInterview: (interview: Omit<Interview, 'id' | 'date'>) => void;
  editInterview: (id: string, updates: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

const defaultProfile = {
  id: "user_123",
  name: "John Doe",
  company: "TechCorp",
  location: "San Francisco, CA",
  experience: "5 YOE",
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cd_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  
  const [jobs, setJobs] = useState<Job[]>(() => JSON.parse(localStorage.getItem('cd_jobs') || '[]'));
  const [salaries, setSalaries] = useState<Salary[]>(() => JSON.parse(localStorage.getItem('cd_salaries') || '[]'));
  const [interviews, setInterviews] = useState<Interview[]>(() => JSON.parse(localStorage.getItem('cd_interviews') || '[]'));

  useEffect(() => { localStorage.setItem('cd_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('cd_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('cd_salaries', JSON.stringify(salaries)); }, [salaries]);
  useEffect(() => { localStorage.setItem('cd_interviews', JSON.stringify(interviews)); }, [interviews]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const addJob = (job: Omit<Job, 'id' | 'posted'>) => {
    const newJob = { ...job, id: Date.now().toString(), posted: 'Just now' };
    setJobs(prev => [newJob, ...prev]);
  };
  const editJob = (id: string, updates: Partial<Job>) => setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
  const deleteJob = (id: string) => setJobs(prev => prev.filter(j => j.id !== id));

  const addSalary = (salary: Omit<Salary, 'id'>) => {
    const newSalary = { ...salary, id: Date.now().toString() };
    setSalaries(prev => [newSalary, ...prev]);
  };
  const editSalary = (id: string, updates: Partial<Salary>) => setSalaries(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  const deleteSalary = (id: string) => setSalaries(prev => prev.filter(s => s.id !== id));

  const addInterview = (interview: Omit<Interview, 'id' | 'date'>) => {
    const newInterview = { ...interview, id: Date.now().toString(), date: 'Today' };
    setInterviews(prev => [newInterview, ...prev]);
  };
  const editInterview = (id: string, updates: Partial<Interview>) => setInterviews(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  const deleteInterview = (id: string) => setInterviews(prev => prev.filter(i => i.id !== id));

  return (
    <StoreContext.Provider value={{ 
      profile, updateProfile, 
      jobs, salaries, interviews, 
      addJob, editJob, deleteJob,
      addSalary, editSalary, deleteSalary,
      addInterview, editInterview, deleteInterview
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
