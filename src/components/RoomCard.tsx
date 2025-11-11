import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Info } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  capacity: number;
  imageUrl: string;
  isAvailable: boolean;
  onReserve: (roomId: string) => void;
  onViewDetails: (roomId: string) => void;
}

const RoomCard = ({ id, name, description, capacity, imageUrl, isAvailable, onReserve, onViewDetails }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{name}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(id)}
              className="h-8 w-8 p-0"
              title="View Room Details"
            >
              <Info className="h-4 w-4 text-primary" />
            </Button>
          </div>
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {isAvailable ? "Available" : "Reserved"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          <span>Capacity: {capacity} guests</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onReserve(id)}
          disabled={!isAvailable}
        >
          {isAvailable ? "Reserve Now" : "Not Available"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
