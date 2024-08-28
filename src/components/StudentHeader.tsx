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

export default function StudentHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  let [user] = useAtom(userDetailsAtom);
  let [, setIsloggedin] = useAtom(loginAtom);

  const logout = () => {
    console.log("hello");
    localStorage.removeItem("access");
    setIsloggedin(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-[#6b46c1] rounded-md"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      <nav
        className={`fixed h-screen bg-[#312450] text-white p-4 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
                to="/complaint"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                Report
              </Link>
            </li>
            <li>
              <Link
                to="/pending-queries"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                My Pending Queries
              </Link>
            </li>
            <li>
              <Link
                to="/resolved-queries"
                className="block py-2 px-3 text-white rounded hover:bg-[#5e42a6]"
              >
                My Resolved Queries
              </Link>
            </li>
            {user?.role !== "STUDENT" && (
              <li>
                <Link
                  to="/create-manager"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Create Managers
                </Link>
              </li>
            )}
          </ul>
          <DropdownMenu className="mt-auto">
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-full text-white bg-[#6b46c1] hover:bg-[#9e81e2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {user?.role}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <button onClick={logout}>Logout</button>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
