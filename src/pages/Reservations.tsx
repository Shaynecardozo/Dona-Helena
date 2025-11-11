import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Hotel } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Reservation {
  id: string;
  check_in: string;
  check_out: string;
  status: string;
  created_at: string;
  rooms: {
    name: string;
    description: string;
    image_url: string;
  };
}

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select(`
          *,
          rooms (
            name,
            description,
            image_url
          )
        `)
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Reservations</h1>
          <p className="text-muted-foreground">
            View and manage your room bookings
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No reservations yet</p>
              <p className="text-sm text-muted-foreground">
                Start by browsing available rooms
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="shadow-[var(--shadow-card)]">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        {reservation.rooms.name}
                      </CardTitle>
                      <CardDescription>{reservation.rooms.description}</CardDescription>
                    </div>
                    <Badge>{reservation.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                      <p className="font-medium">
                        {format(new Date(reservation.check_in), "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                      <p className="font-medium">
                        {format(new Date(reservation.check_out), "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Booked on</p>
                      <p className="font-medium">
                        {format(new Date(reservation.created_at), "PPP")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Reservations;
