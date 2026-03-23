import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "./lib/store";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import AuthPage from "@/pages/auth";
import JobsPage from "@/pages/jobs";
import CompaniesPage from "@/pages/companies";
import SalariesPage from "@/pages/salaries";
import InterviewsPage from "@/pages/interviews";
import ContributePage from "@/pages/contribute";
import ProfilePage from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/jobs" component={JobsPage} />
      <Route path="/companies" component={CompaniesPage} />
      <Route path="/salaries" component={SalariesPage} />
      <Route path="/interviews" component={InterviewsPage} />
      <Route path="/contribute" component={ContributePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <div className="animated-gradient-bg min-h-screen">

      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </StoreProvider>

    </div>
  );
}
