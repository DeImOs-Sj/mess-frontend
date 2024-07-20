import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/auth/login';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';

function App() {

  return (
    <div className='min-h-screen bg-[#f4f4f4]'>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
