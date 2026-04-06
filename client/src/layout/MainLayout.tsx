import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import SwitchMode from "../components/shared/SwitchMode";
import MobileMenuTop from "../components/shared/MobileMenuTop";
import MobileMenuBottom from "../components/shared/MobileMenuBottom";
import { useState } from "react";

const MainLayout = () => {
  const [darkMood, setDarkMood] = useState(false)
  
  return (
    <div className={`_layout _layout_main_wrapper ${darkMood ? "_dark_wrapper" : ""}`}>
      {/* Switching Btn Start */}
      <SwitchMode darkMood={darkMood} setDarkMood={setDarkMood}  />
      {/* Switching Btn End */}

      <div className="_main_layout">
        {/* Desktop Menu Start */}
        <Navbar />
        {/* Desktop Menu End */}

        {/* Mobile Menu Start */}
        <MobileMenuTop />
        {/* Mobile Menu End */}

        {/* Mobile Bottom Navigation Start */}
        <MobileMenuBottom />
        {/* Mobile Bottom Navigation End */}

        {/* Main Layout Structure Start  */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <Outlet />
          </div>
        </div>
        {/* Main Layout Structure End  */}

      </div>
    </div>
  );
};

export default MainLayout;
