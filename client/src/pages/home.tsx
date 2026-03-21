import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2, Star, TrendingUp, Users, Briefcase } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Your Gateway to a <span className="text-primary">Better Career</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover company reviews, salary insights, interview questions, and referral opportunities to land your dream job.
          </p>
          
          <div className="bg-card p-2 rounded-xl shadow-lg border max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 text-muted-foreground h-5 w-5" />
              <Input placeholder="Job title, keywords, or company" className="pl-10 border-0 shadow-none focus-visible:ring-0 text-base h-12" />
            </div>
            <div className="w-px h-8 bg-border hidden md:block self-center"></div>
            <div className="relative flex-1 flex items-center">
              <MapPin className="absolute left-3 text-muted-foreground h-5 w-5" />
              <Input placeholder="Location" className="pl-10 border-0 shadow-none focus-visible:ring-0 text-base h-12" />
            </div>
            <Button size="lg" className="h-12 px-8 text-base">Search Jobs</Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="text-sm text-muted-foreground self-center mr-2">Popular:</span>
            {["Software Engineer", "Data Scientist", "Product Manager", "Remote", "Google"].map(tag => (
              <Badge variant="secondary" key={tag} className="cursor-pointer hover:bg-secondary/80 text-sm font-medium px-3 py-1">{tag}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <ServiceCard 
              icon={<Building2 className="h-8 w-8 text-blue-500" />}
              title="Company Reviews"
              description="Real reviews from employees about culture, work-life balance, and benefits."
              link="/companies"
              linkText="Read Reviews"
            />
            
            <ServiceCard 
              icon={<TrendingUp className="h-8 w-8 text-green-500" />}
              title="Salary Insights"
              description="Compare salaries across roles and companies to ensure you're paid fairly."
              link="/salaries"
              linkText="Explore Salaries"
            />
            
            <ServiceCard 
              icon={<Users className="h-8 w-8 text-purple-500" />}
              title="Interview Insights"
              description="Past interview questions, processes, and tips from candidates."
              link="/interviews"
              linkText="Prep for Interviews"
            />
            
            <ServiceCard 
              icon={<Briefcase className="h-8 w-8 text-orange-500" />}
              title="Jobs & Walk-ins"
              description="Find the latest job postings and upcoming walk-in drives."
              link="/jobs"
              linkText="Browse Jobs"
            />
            
            <ServiceCard 
              icon={<Star className="h-8 w-8 text-yellow-500" />}
              title="Referrals"
              description="Connect with employees who can refer you to top companies."
              link="/jobs?tab=referrals"
              linkText="Get Referred"
            />

            <ServiceCard 
              icon={<MapPin className="h-8 w-8 text-red-500" />}
              title="Career Track"
              description="Manage your applications, saved jobs, and career preferences."
              link="/auth"
              linkText="Join Now"
            />

          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, link, linkText }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow group cursor-pointer border-border/60 hover:border-primary/20">
      <CardHeader>
        <div className="mb-4 p-3 bg-secondary w-fit rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={link}>
          <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group/btn">
            {linkText}
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Simple Badge fallback since we didn't import it
function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent ${className}`}>
      {children}
    </span>
  )
}
