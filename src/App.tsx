import { Route, Routes } from "react-router-dom";
import LoginStudentPage from "./pages/auth/login-student";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import LoginOtherPage from "./pages/auth/login-other";
import { useAtom } from "jotai";
import { loginAtom, userDetailsAtom } from "./atoms/autAtom";
import { useEffect } from "react";
import { getMe } from "./apis/auth";
import ManagementHeader from "./components/ManagementHeader";
import ManagementHome from "./pages/management/home";
import CreateManagerScreen from "./pages/management/create-manager";
import PendingQueries from "./pages/management/pending-queries";
import ResolvedQueries from "./pages/management/resolved-queries";
import ComplaintScreen from "./pages/student/complaint";
import StudentHeader from "./components/StudentHeader";

function App() {
  const [isLoggedIn, setIsLoggedin] = useAtom(loginAtom);
  const [userDetail, setUser] = useAtom(userDetailsAtom);

  const checkLoggedin = async () => {
    let accessTkn = localStorage.getItem("access");

    if (accessTkn === null) {
      return;
    }

    let user = await getMe(accessTkn);

    if (user !== null) {
      setUser(user);
      setIsLoggedin(true);
      return;
    }

    localStorage.removeItem("access");
  };

  useEffect(() => {
    checkLoggedin();
  }, []);

  let header = <Header />;

  if (
    isLoggedIn &&
    [
      "SUPERVISOR",
      "RESIDENT_OFFICER",
      "CAMPUS_DIRECTOR",
      "COMMITTEE",
      "MANAGER",
    ].includes(userDetail?.role)
  ) {
    header = <ManagementHeader />;
  } else if (isLoggedIn && userDetail?.role === "STUDENT") {
    header = <StudentHeader />;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {header}
      <Routes>
        <Route path="/login-student" element={<LoginStudentPage />} />
        <Route path="/login-other" element={<LoginOtherPage />} />
        <Route path="/" element={<ManagementHome />} />
        <Route path="/create-manager" element={<CreateManagerScreen />} />
        <Route path="/pending-queries" element={<PendingQueries />} />
        <Route path="/complaint" element={<ComplaintScreen />} />
        <Route path="/resolved-queries" element={<ResolvedQueries />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
