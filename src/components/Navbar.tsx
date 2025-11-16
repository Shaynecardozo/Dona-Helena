// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/useAuth";
// import { Hotel, LogOut, User, Calendar, ShieldCheck, Info, Images } from "lucide-react";
// import logo from "@/assets/dona-helena-logo.jpg";

// const Navbar = () => {
//   const { user, signOut, isAdmin } = useAuth();
//   const location = useLocation();
//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link
//             to={user ? "/dashboard" : "/"}
//             className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//           >
//             {/* <Hotel className="w-6 h-6 text-primary" /> */}
//             <img
//                 src={logo}
//                 alt="Dona Helena Holiday Homes Logo"
//                 className="w-16 h-16 object-contain"
//               />
//             <span className="font-bold text-lg">Dona Helena Holiday Homes</span>
//           </Link>

//           <div className="flex items-center gap-2">
//             {/* Navigation Links */}
//             <Button
//               variant={isActive("/dashboard") ? "default" : "ghost"}
//               asChild
//               size="sm"
//             >
//               <Link to="/dashboard">
//                 <Hotel className="w-4 h-4 mr-2" />
//                 Rooms
//               </Link>
//             </Button>

//             <Button
//               variant={isActive("/about") ? "default" : "ghost"}
//               asChild
//               size="sm"
//             >
//               <Link to="/about">
//                 <Info className="w-4 h-4 mr-2" />
//                 About Us
//               </Link>
//             </Button>

//             <Button
//               variant={isActive("/gallery") ? "default" : "ghost"}
//               asChild
//               size="sm"
//             >
//               <Link to="/gallery">
//                 <Images className="w-4 h-4 mr-2" />
//                 Gallery
//               </Link>
//             </Button>

//             {user ? (
//               <>
//                 <Button
//                   variant={isActive("/reservations") ? "default" : "ghost"}
//                   asChild
//                   size="sm"
//                 >
//                   <Link to="/reservations">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     My Bookings
//                   </Link>
//                 </Button>

//                 {isAdmin && (
//                   <Button
//                     variant={isActive("/admin") ? "default" : "ghost"}
//                     asChild
//                     size="sm"
//                   >
//                     <Link to="/admin">
//                       <ShieldCheck className="w-4 h-4 mr-2" />
//                       Admin
//                     </Link>
//                   </Button>
//                 )}

//                 <Button variant="ghost" size="sm" className="gap-2">
//                   <User className="w-4 h-4" />
//                   {user.email}
//                 </Button>

//                 <Button variant="outline" size="sm" onClick={signOut}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               // <Button asChild size="sm" variant="default">
//               //   <Link to="/auth">Sign In / Sign Up</Link>
//               // </Button>
//               <div className="w-24" />
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Hotel, LogOut, User, Calendar, ShieldCheck, Info, Images, Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/dona-helena-logo.jpg";

const Navbar = () => {
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="Dona Helena Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <span className="font-bold text-base sm:text-lg">
              Dona Helena Holiday Homes
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">

            <Button variant={isActive("/dashboard") ? "default" : "ghost"} asChild size="sm">
              <Link to="/dashboard">
                <Hotel className="w-4 h-4 mr-2" />
                Rooms
              </Link>
            </Button>

            <Button variant={isActive("/about") ? "default" : "ghost"} asChild size="sm">
              <Link to="/about">
                <Info className="w-4 h-4 mr-2" />
                About Us
              </Link>
            </Button>

            <Button variant={isActive("/gallery") ? "default" : "ghost"} asChild size="sm">
              <Link to="/gallery">
                <Images className="w-4 h-4 mr-2" />
                Gallery
              </Link>
            </Button>

            {user && (
              <>
                <Button variant={isActive("/reservations") ? "default" : "ghost"} asChild size="sm">
                  <Link to="/reservations">
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings
                  </Link>
                </Button>

                {isAdmin && (
                  <Button variant={isActive("/admin") ? "default" : "ghost"} asChild size="sm">
                    <Link to="/admin">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Admin
                    </Link>
                  </Button>
                )}

                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  {user.email}
                </Button>

                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-2 animate-in slide-in-from-top">
            <Button variant={isActive("/dashboard") ? "default" : "ghost"} asChild className="w-full">
              <Link to="/dashboard">Rooms</Link>
            </Button>

            <Button variant={isActive("/about") ? "default" : "ghost"} asChild className="w-full">
              <Link to="/about">About Us</Link>
            </Button>

            <Button variant={isActive("/gallery") ? "default" : "ghost"} asChild className="w-full">
              <Link to="/gallery">Gallery</Link>
            </Button>

            {user && (
              <>
                <Button variant={isActive("/reservations") ? "default" : "ghost"} asChild className="w-full">
                  <Link to="/reservations">My Bookings</Link>
                </Button>

                {isAdmin && (
                  <Button variant={isActive("/admin") ? "default" : "ghost"} asChild className="w-full">
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}

                <Button variant="ghost" className="w-full justify-start">
                  {user.email}
                </Button>

                <Button variant="outline" className="w-full" onClick={signOut}>
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

