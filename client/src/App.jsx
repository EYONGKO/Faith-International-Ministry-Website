import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Ministries from './pages/Ministries';
import Give from './pages/Give';
import Contact from './pages/Contact';
import Prayer from './pages/Prayer';
import Gallery from './pages/Gallery';
import ScrollToTop from './components/ScrollToTop';
import BibleStudy from './pages/BibleStudy';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/give" element={<Give />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bible-study" element={<BibleStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
