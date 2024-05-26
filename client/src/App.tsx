import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonHomePage } from "./pages/commonHomePage/commonHomePage.tsx";
import { CommonFooter } from "./components/common/footer/footer.tsx";
import { ParentLogin } from "./pages/parent/parentLogin/parentLogin.tsx";

import { ParentSignupPage } from "./pages/parent/parentSignup/parentSignup.tsx";
import { LandingPageNavbar } from "./components/landingPage/landingPageNavbar/landingPageNavbar.tsx";
import "./App.css";
function App() {
  return (
    <BrowserRouter basename="/child_crescendo">
      <Routes>
        <Route path="/" element={<CommonHomePage />} />
        {/* parent routes  */}

        <Route path="/parent/signup" element={<ParentSignupPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/ladning/nav" element={<LandingPageNavbar />} />

        {/* testing routes  */}
        <Route path="/footer" element={<CommonFooter />} />

        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
