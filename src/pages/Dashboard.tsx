// import { useState, useEffect, useCallback } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import RoomCard from "@/components/RoomCard";
// import ReservationModal from "@/components/ReservationModal";
// import RoomDetailsModal from "@/components/RoomDetailsModal";
// import Navbar from "@/components/Navbar";
// import { useAuth } from "@/hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { Skeleton } from "@/components/ui/skeleton";


// interface Room {
//   id: string;
//   name: string;
//   description: string;
//   capacity: number;
//   image_url: string;
//   // is_available: boolean;
//   available_quantity?: number;
// }

// const Dashboard = () => {
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
//   const [selectedRoomName, setSelectedRoomName] = useState("");
//   const [detailsRoomId, setDetailsRoomId] = useState<string | null>(null);
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

  
//   const fetchRooms = useCallback(async () => {
//   setLoading(true);
//   try {
//     const { data, error } = await supabase
//       .from('room_availability_today')
//       .select('*');
//       // .order('*');

//     if (error) throw error;

//     const availableRooms = (data || []).filter((r: any) => (r.available_quantity ?? 0) > 0);
//     setRooms(
//       availableRooms.map((r: any) => ({
//         id: r.id,
//         name: r.name,
//         description: r.description,
//         capacity: r.capacity,
//         image_url: r.image_url,
//         available_quantity: r.available_quantity,
//       }))
//     );
//   } catch (error) {
//     console.error("Error fetching rooms:", error);
//   } finally {
//     setLoading(false);
//   }
// }, []);

// useEffect(() => {
//   let channel: any;

//   const fetchAndSubscribe = async () => {
//     await fetchRooms();

//     channel = supabase
//       .channel('public:reservations')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
//         fetchRooms();
//       })
//       .subscribe();
//   };

//   fetchAndSubscribe();

//   return () => {
//     if (channel) supabase.removeChannel(channel);
//   };
// }, [fetchRooms]);


//   const handleReserve = (roomId: string) => {
//     const room = rooms.find((r) => r.id === roomId);
//     if (room) {
//       setSelectedRoomId(roomId);
//       setSelectedRoomName(room.name);
//     }
//   };

//   const handleViewDetails = (roomId: string) => {
//     setDetailsRoomId(roomId);
//   };

//   // if (authLoading || !user) {
//   //   return null;
//   // }
//   if (authLoading) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">Available Rooms</h1>
//           <p className="text-muted-foreground">
//             Browse our selection of premium rooms and make your reservation
//           </p>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="space-y-3">
//                 <Skeleton className="h-48 w-full" />
//                 <Skeleton className="h-4 w-3/4" />
//                 <Skeleton className="h-4 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {rooms.map((room) => (
//               <RoomCard
//                 key={room.id}
//                 id={room.id}
//                 name={room.name}
//                 description={room.description || ""}
//                 capacity={room.capacity}
//                 imageUrl={room.image_url || ""}
//                 isAvailable={room.available_quantity > 0} 
//                 onReserve={handleReserve}
//                 onViewDetails={handleViewDetails}
//               />

//             ))}
//           </div>
//         )}
//       </main>

//       {selectedRoomId && (
//         <ReservationModal
//           isOpen={!!selectedRoomId}
//           onClose={() => setSelectedRoomId(null)}
//           roomId={selectedRoomId}
//           roomName={selectedRoomName}
//           onSuccess={fetchRooms}
//         />
//       )}

//       {detailsRoomId && rooms.find(r => r.id === detailsRoomId) && (
//         <RoomDetailsModal
//           isOpen={!!detailsRoomId}
//           onClose={() => setDetailsRoomId(null)}
//           room={{
//             name: rooms.find(r => r.id === detailsRoomId)!.name,
//             description: rooms.find(r => r.id === detailsRoomId)!.description || "",
//             capacity: rooms.find(r => r.id === detailsRoomId)!.capacity,
//             imageUrl: rooms.find(r => r.id === detailsRoomId)!.image_url || "",
//            isAvailable: rooms.find(r => r.id === detailsRoomId)!.available_quantity > 0,

//           }}
//         />
//       )}
//     </div>
//   );
  
// };


// export default Dashboard;

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import RoomDetailsModal from "@/components/RoomDetailsModal";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  image_url: string;
  available_quantity?: number;
}

const Dashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [detailsRoomId, setDetailsRoomId] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("room_availability_today")
        .select("*");

      if (error) throw error;

      const availableRooms = (data || []).filter(
        (r: any) => (r.available_quantity ?? 0) > 0
      );

      setRooms(
        availableRooms.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          capacity: r.capacity,
          image_url: r.image_url,
          available_quantity: r.available_quantity,
        }))
      );
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let channel: any;

    const fetchAndSubscribe = async () => {
      await fetchRooms();

      channel = supabase
        .channel("public:reservations")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "reservations" },
          () => {
            fetchRooms();
          }
        )
        .subscribe();
    };

    fetchAndSubscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [fetchRooms]);

  const handleReserve = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoomId(roomId);
      setSelectedRoomName(room.name);
    }
  };

  const handleViewDetails = (roomId: string) => {
    setDetailsRoomId(roomId);
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Available Rooms
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse our selection of premium rooms and make your reservation
          </p>
        </div>

        {/* Room Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description || ""}
                capacity={room.capacity}
                imageUrl={room.image_url || ""}
                isAvailable={room.available_quantity > 0}
                onReserve={handleReserve}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedRoomId && (
        <ReservationModal
          isOpen={!!selectedRoomId}
          onClose={() => setSelectedRoomId(null)}
          roomId={selectedRoomId}
          roomName={selectedRoomName}
          onSuccess={fetchRooms}
        />
      )}

      {detailsRoomId && rooms.find((r) => r.id === detailsRoomId) && (
        <RoomDetailsModal
          isOpen={!!detailsRoomId}
          onClose={() => setDetailsRoomId(null)}
          room={{
            name: rooms.find((r) => r.id === detailsRoomId)!.name,
            description:
              rooms.find((r) => r.id === detailsRoomId)!.description || "",
            capacity: rooms.find((r) => r.id === detailsRoomId)!.capacity,
            imageUrl:
              rooms.find((r) => r.id === detailsRoomId)!.image_url || "",
            isAvailable:
              rooms.find((r) => r.id === detailsRoomId)!.available_quantity > 0,
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;

