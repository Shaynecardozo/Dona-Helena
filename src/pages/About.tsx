import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { MessageCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Dona Helena Holiday Homes</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Welcome to Your Home Away From Home</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dona Helena Holiday Homes offers a perfect blend of comfort, luxury, and convenience. 
            Located in a serene environment, our property features beautifully designed rooms 
            that cater to both leisure and business travelers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Each room is thoughtfully furnished with modern amenities to ensure your stay is 
            memorable and relaxing. Whether you're here for a weekend getaway or an extended 
            vacation, we provide the perfect setting for your holiday experience.
          </p>
        </div>

        {/* Location & Contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Vasvaddo Beach Road<br />
                  Benaulim<br />
                  Goa 403716<br />
                  {/* Country Name */}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-6">
            <div className="flex items-start gap-3 mb-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a 
                  href="tel:+1234567890" 
                  className="text-primary hover:underline block"
                >
                  +91 7744054111
                </a>
                <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email & Social */}
        <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-6 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <a 
                href="mailto:info@donahelena.com" 
                className="text-primary hover:underline"
              >
                donahelenaholidayhomebenaulim@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/donahelena_2025?igsh=MWdwbWYweTJicnl1cA%3D%3D&utm_source=qr "
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
              <a
                href="https://wa.me/+917744054111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <p className="text-muted-foreground">
            We look forward to welcoming you to Dona Helena Holiday Homes. 
            For reservations and inquiries, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
