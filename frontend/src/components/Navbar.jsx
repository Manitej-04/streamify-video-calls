import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, LogOutIcon, ShipWheel } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();

  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
  // })

  const {logoutMutation} = useLogout();

  return <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
    <div className="container mx-auto px-4 sm:px-6 lg:pxx-8">
      <div className="flex items-center justify-end">
        {/* LOGO - ONLY IF WE ARE IN CHAT PAGE */}
        {isChatPage && (
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheel className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <Link to={"/notifications"}>
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70"/>
            </button>
          </Link>
        </div>

        {/* TO-DO */}
        {/* THEME-SELECTOR */}
        <ThemeSelector />

        {/* AVATAR */}
        <div className="Avatar">
          <div className="w-9 rounded-full">
            <img src={authUser?.profilePic} alt="User Avatar" />
          </div>
        </div>

        {/* LOGOUT-BUTTON */}
        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
          <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
        </button>
      </div>
    </div>
  </nav>
}

export default Navbar;