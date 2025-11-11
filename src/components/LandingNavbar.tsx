import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel, Menu, X } from "lucide-react";
import logo from "@/assets/dona-helena-logo.jpg";


const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* <Hotel className="w-6 h-6 text-primary" /> */}
             <img
                src={logo}
                alt="Dona Helena Holiday Homes Logo"
                className="w-16 h-16 object-contain"
              />
            <span className="font-bold text-lg">Dona Helena Holiday Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/about">About Us</Link>
            </Button>
            {/* <Button asChild size="sm" variant="default">
              <Link to="/auth">Login / Sign Up</Link>
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/">Home</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/gallery">Gallery</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/about">About Us</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="default"
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth">Login / Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
