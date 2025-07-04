import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import VerifiedPage from './pages/VerifiedPage';
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ProfilePage from "./pages/ProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/verified" element={<VerifiedPage />} />
        <Route path="/forgetpass" element={<ForgetPassword />} />
        <Route path="/updatepass" element={<UpdatePassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
