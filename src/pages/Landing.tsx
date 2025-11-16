import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Hotel, Calendar, Shield, Star } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
// import heroBackground from "@/assets/hero-background.jpg";
import heroBackground from "@/assets/Image1.jpg";
import logo from "@/assets/dona-helena-logo.jpg";
import { Waves } from "lucide-react";
import { Bed } from "lucide-react";
import { Sun } from "lucide-react";


const Landing = () => {
  return <div className="min-h-screen">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 z-0 bg-primary/40 pointer-events-none" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto text-white">
          {/* <Hotel className="w-20 h-20 mx-auto mb-8 animate-in fade-in duration-700 drop-shadow-lg" /> */}
            {/* <img
                src={logo}
                alt="Dona Helena Holiday Homes Logo"
                className="w-16 h-16 object-contain"
              /> */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 drop-shadow-2xl">
            Welcome to <br></br>Dona Helena Holiday Homes
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-white/95 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 drop-shadow-lg font-light">
            {/* Discover and book your perfect room with ease */}
            {/* Discover the comfort you deserve,book your perfect room with ease. */}
            Find your home away from home, effortlessly.
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {/* <Button asChild size="lg" className="h-14 px-10 text-lg shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform">
              <Link to="/dashboard">Get Started</Link>
            </Button> */}
            <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg bg-white/20 border-white/40 hover:bg-white/30 text-white backdrop-blur-sm shadow-lg hover:scale-105 transition-transform">
              <Link to="/dashboard">View Rooms</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" /> */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Dona Helena Holiday Homes?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
              <Waves className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Beach Vicinity</h3>
              <p className="text-muted-foreground">
                Stay just minutes away from the pristine Goan shoreline and enjoy the calming sea breeze every day.
              </p>

            </div>

            <div className="p-6 rounded-lg bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
              <Bed className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Spaceous Rooms</h3>
              <p className="text-muted-foreground">
                Relax in our large, well-designed rooms crafted for comfort, convenience, and an effortlessly cozy stay.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
              <Sun className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Goan Culture</h3>
              <p className="text-muted-foreground">
                Immerse yourself in authentic Goan traditions, warm hospitality, and a truly local holiday experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Room?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied guests and book your stay today
          </p>
          <Button asChild size="lg">
            <Link to="/dashboard">Start Booking Now</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Landing;