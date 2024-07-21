import {
  Route,
  Routes,
} from 'react-router-dom';
import LoginStudentPage from './pages/auth/login-student';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import LoginOtherPage from './pages/auth/login-other';
import { useAtom } from 'jotai';
import { loginAtom, userDetailsAtom } from './atoms/autAtom';
import { useEffect } from 'react';
import { getMe } from './apis/auth';
import ManagementHeader from './components/ManagementHeader';
import ManagementHome from './pages/management/home';

function App() {


  const [isLoggedIn, setIsLoggedin] = useAtom(loginAtom);
  const [userDetail, setUser] = useAtom(userDetailsAtom);

  const checkLoggedin = async () => {
    let accessTkn = localStorage.getItem("access")

    if (accessTkn === null) {
      return;
    }

    let user = await getMe(accessTkn);

    if (user !== null) {
      setUser(user);
      setIsLoggedin(true);
      return;
    }

    localStorage.removeItem("access")

  }

  useEffect(() => {
    checkLoggedin();
  }, [])


  return (
    <div className='min-h-screen bg-[#f4f4f4]'>

      {
        !isLoggedIn && <Header />
      }

      {
        userDetail?.role === "SUPERVISOR" &&  <ManagementHeader />
      }
        <Routes>
          <Route path="/login-student" element={<LoginStudentPage />} />
          <Route path="/login-other" element={<LoginOtherPage />} />
          <Route path="/" element={<ManagementHome />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      <Toaster />
    </div>
  )
}

export default App
