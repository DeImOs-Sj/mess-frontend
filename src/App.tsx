import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/auth/login';
import Header from './components/Header';

function App() {

  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
