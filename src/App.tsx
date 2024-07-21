import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import LoginStudentPage from './pages/auth/login-student';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import LoginOtherPage from './pages/auth/login-other';
import { useAtom } from 'jotai';
import { loginAtom, userDetailsAtom } from './atoms/autAtom';
import { useEffect } from 'react';
import { getMe } from './apis/auth';
import Home from './pages/home';

function App() {


  const [isLoggedIn, setIsLoggedin] = useAtom(loginAtom);
  const [, setUser] = useAtom(userDetailsAtom);

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

  useEffect(()=>{
    checkLoggedin();
  }, [])


  return (
    <div className='min-h-screen bg-[#f4f4f4]'>

      {
        !isLoggedIn && <Header/>
      }
      <Router>
        <Routes>
          <Route path="/login-student" element={<LoginStudentPage />} />
          <Route path="/login-other" element={<LoginOtherPage/>} />
          <Route path="/" element={<Home/>} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
