import * as React from "react";
import { useAtom } from "jotai";
import SinhgadLogo from "../assets/header/sinhgad.png";
import { loginAtom, userDetailsAtom } from "../atoms/autAtom";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ManagementSidebar() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [user] = useAtom(userDetailsAtom);
  const [, setIsloggedin] = useAtom(loginAtom);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const logout = () => {
    localStorage.removeItem("access");
    setIsloggedin(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-[#6b46c1] rounded-md"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      <div
        className={`fixed h-screen bg-[#312450] text-white p-4 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 z-40 pt-[65px]`}
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={SinhgadLogo} className="h-8 mt-2" alt="Sinhgad Logo" />
          <span className="text-2xl font-semibold">Mess Feedback System</span>
        </div>
        <div className="mt-10 space-y-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pending-queries"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                Pending
              </Link>
            </li>
            <li>
              <Link
                to="/resolved-queries"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                Resolved
              </Link>
            </li>
            <li>
              {user?.role !== "MANAGER" && (
                <Link
                  to="/create-manager"
                  className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
                >
                  Access Controls
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="mt-5 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-full text-white bg-[#6b46c1] hover:bg-[#9e81e2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {user?.role}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <button onClick={logout} className="w-full text-left">
                  Logout
                </button>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Overlay for closing sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
