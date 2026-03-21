import React, { createContext, useContext, useState, useEffect } from 'react';

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
  author: string; 
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
  author: string; 
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
  author: string;
  date: string;
};

type StoreContextType = {
  jobs: Job[];
  salaries: Salary[];
  interviews: Interview[];
  addJob: (job: Omit<Job, 'id' | 'posted' | 'author'>) => void;
  addSalary: (salary: Omit<Salary, 'id' | 'author'>) => void;
  addInterview: (interview: Omit<Interview, 'id' | 'author' | 'date'>) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => JSON.parse(localStorage.getItem('cd_jobs') || '[]'));
  const [salaries, setSalaries] = useState<Salary[]>(() => JSON.parse(localStorage.getItem('cd_salaries') || '[]'));
  const [interviews, setInterviews] = useState<Interview[]>(() => JSON.parse(localStorage.getItem('cd_interviews') || '[]'));

  useEffect(() => { localStorage.setItem('cd_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('cd_salaries', JSON.stringify(salaries)); }, [salaries]);
  useEffect(() => { localStorage.setItem('cd_interviews', JSON.stringify(interviews)); }, [interviews]);

  const addJob = (job: Omit<Job, 'id' | 'posted' | 'author'>) => {
    const newJob = { ...job, id: Date.now().toString(), posted: 'Just now', author: 'currentUser' };
    setJobs(prev => [newJob, ...prev]);
  };

  const addSalary = (salary: Omit<Salary, 'id' | 'author'>) => {
    const newSalary = { ...salary, id: Date.now().toString(), author: 'currentUser' };
    setSalaries(prev => [newSalary, ...prev]);
  };

  const addInterview = (interview: Omit<Interview, 'id' | 'author' | 'date'>) => {
    const newInterview = { ...interview, id: Date.now().toString(), date: 'Today', author: 'currentUser' };
    setInterviews(prev => [newInterview, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ jobs, salaries, interviews, addJob, addSalary, addInterview }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
