import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
  onSuccess: () => void;
}

const ReservationModal = ({ isOpen, onClose, roomId, roomName, onSuccess }: ReservationModalProps) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [roomNotes, setNotes] = useState("");
  const [isCheckInOpen, setCheckInOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutOpen] = useState(false);


//   const handleReserve = async () => {
//     // Validation
//     if (!userName.trim()) {
//       toast({
//         title: "Missing information",
//         description: "Please enter your name",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!userEmail.trim()) {
//       toast({
//         title: "Missing information",
//         description: "Please enter your email",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!checkIn || !checkOut) {
//       toast({
//         title: "Missing dates",
//         description: "Please select both check-in and check-out dates",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (checkOut <= checkIn) {
//       toast({
//         title: "Invalid dates",
//         description: "Check-out date must be after check-in date",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const { error } = await supabase.from("reservations").insert({
//         // user_id: user!.id,
//         user_id:null,
//         room_id: roomId,
//         user_name: userName,
//         user_email: userEmail,
//         user_phone: userPhone || null,
//         check_in: format(checkIn, "yyyy-MM-dd"),
//         check_out: format(checkOut, "yyyy-MM-dd"),
//         notes:roomNotes,
//       });

//       if (error) throw error;

//       // Update room availability
//       await supabase
//         .from("rooms")
//         .update({ is_available: false })
//         .eq("id", roomId);

//       // Call edge function to send emails
//       // await supabase.functions.invoke("send-reservation-email", {
//       //   body: {
//       //     roomName,
//       //     checkIn: format(checkIn, "PPP"),
//       //     checkOut: format(checkOut, "PPP"),
//       //     userName,
//       //     userEmail,
//       //     userPhone,
//       //   },
//       // });

//       await supabase.functions.invoke("send-reservation-email", {
//   body: JSON.stringify({
//     roomName,
//     checkIn: format(checkIn, "PPP"),
//     checkOut: format(checkOut, "PPP"),
//     userName,
//     userEmail,
//     userPhone,
//   }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


//       toast({
//         title: "Reservation confirmed!",
//         description: "You'll receive a confirmation email shortly.",
//       });

//       onSuccess();
//       onClose();
//       // Reset form
//       setUserName("");
//       setUserEmail("");
//       setUserPhone("");
//       setCheckIn(undefined);
//       setCheckOut(undefined);
//     } catch (error: any) {
//       toast({
//         title: "Reservation failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

const handleReserve = async () => {
   console.log("Reserving room with ID:", roomId); 
  // Validation (keep your existing validation)
  if (!userName.trim()) {
    toast({ title: "Missing information", description: "Please enter your name", variant: "destructive" });
    return;
  }
  if (!userEmail.trim()) {
    toast({ title: "Missing information", description: "Please enter your email", variant: "destructive" });
    return;
  }
  if (!checkIn || !checkOut) {
    toast({ title: "Missing dates", description: "Please select both check-in and check-out dates", variant: "destructive" });
    return;
  }
  if (checkOut <= checkIn) {
    toast({ title: "Invalid dates", description: "Check-out date must be after check-in date", variant: "destructive" });
    return;
  }

  setLoading(true);
  try {
 const { data, error } = await (supabase.rpc as any)('book_room', {
  p_room_id: roomId,
  p_check_in: format(checkIn, 'yyyy-MM-dd'),
  p_check_out: format(checkOut, 'yyyy-MM-dd'),
  p_user_name: userName,
  p_user_email: userEmail,
  p_user_phone: userPhone || null,
  p_notes: roomNotes || null
});



    if (error) throw error;

    toast({
      title: "Reservation confirmed!",
      description: "You'll receive a confirmation email shortly.",
    });

    onSuccess(); // refresh rooms in the Dashboard
    onClose();

    // reset form
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setNotes("");
  } catch (err: any) {
    // RPC raises exceptions with messages — show them
    toast({
      title: "Reservation failed",
      description: err?.message ?? "An error occurred",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reserve {roomName}</DialogTitle>
          <DialogDescription>
            Fill in your details and select your check-in and check-out dates to complete your reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="userName">Full Name *</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="userEmail">Email Address *</Label>
            <Input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="userPhone">Phone Number (Optional)</Label>
            <Input
              id="userPhone"
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* <div className="grid gap-2">
            <Label>Check-in Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div> */}
          <Label>Check-in Date *</Label>
          <Popover open={isCheckInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  setCheckInOpen(false); // <-- close popover on select
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>


          {/* <div className="grid gap-2">
            <Label>Check-out Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div> */}
          <Label>Check-out Date *</Label>
          <Popover open={isCheckOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setCheckOutOpen(false); // <-- close popover on select
                }}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

           <div className="grid gap-2">
            <Label htmlFor="userPhone">Notes (Optional)</Label>
            <Input
              id="roomNotes"
              type="tel"
              value={roomNotes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any additional requirement if any"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleReserve} disabled={loading}>
            {loading ? "Reserving..." : "Confirm Reservation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
