import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import LoginStudentPage from './pages/auth/login-student';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import LoginOtherPage from './pages/auth/login-other';

function App() {

  return (
    <div className='min-h-screen bg-[#f4f4f4]'>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<LoginStudentPage />} />
          <Route path="/login-other" element={<LoginOtherPage/>} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
