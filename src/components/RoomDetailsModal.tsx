import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Wifi, Coffee, Tv, Wind, GlassWaterIcon, ParkingCircleIcon, ShirtIcon } from "lucide-react";

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    description: string;
    capacity: number;
    imageUrl: string;
    isAvailable: boolean;
  };
}

const RoomDetailsModal = ({ isOpen, onClose, room }: RoomDetailsModalProps) => {
  // Additional room images for gallery
  const additionalImages = [
    room.imageUrl,
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
  ];

  // Sample amenities
  const amenities = [
    { icon: Wifi, label: "High Speed WiFi" },
    { icon: Tv, label: "Smart TV" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Bed, label: "Comfortable Bedding" },
    { icon:GlassWaterIcon, label:"Water Complementary"},
    { icon:ParkingCircleIcon, label:"Free Parking"},
    {icon:ShirtIcon, label:"Laundry Service on Request"},
    {icon:ShirtIcon, label:"Daily Cleaning"},
    
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl">{room.name}</span>
            <Badge variant={room.isAvailable ? "default" : "secondary"}>
              {room.isAvailable ? "Available" : "Reserved"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Main Image */}
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>Capacity: Up to {room.capacity} guests</span>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <amenity.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Images Gallery */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Room Gallery</h3>
            <div className="grid grid-cols-3 gap-3">
              {additionalImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={img}
                    alt={`${room.name} view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> All rooms are non-smoking. Check-in time is 2:00 PM and check-out time is 11:00 AM.
              Early check-in and late check-out may be available upon request.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailsModal;
