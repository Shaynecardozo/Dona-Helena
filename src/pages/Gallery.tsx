import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample gallery images - replace with actual room images from your database
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      title: "Deluxe Room",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      title: "Ocean View Suite",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      title: "Family Suite",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      title: "Luxury Room",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      title: "Garden View Room",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      title: "Presidential Suite",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      title: "Standard Room",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800",
      title: "Executive Suite",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a virtual tour of our beautiful rooms and facilities. Click on any image to view it in full size.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
