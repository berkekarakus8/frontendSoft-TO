import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Kampanyalar from "./pages/Kampanyalar";
import Subeler from "./pages/Subeler";
import UyelikPaketleri from "./pages/UyelikPaketleri";
import UyeOl from "./pages/UyeOl";
import GirisYap from "./pages/GirisYap";
import Sepet from "./pages/Sepet";
import Vizyon from "./pages/Vizyon";
import Misyon from "./pages/Misyon";
import BMI from "./pages/calculators/BMI";
import IdealKilo from "./pages/calculators/IdealKilo";
import SuIhtiyaci from "./pages/calculators/SuIhtiyaci";
import VucutTipi from "./pages/calculators/VucutTipi";
import KalpHizi from "./pages/calculators/KalpHizi";
import "./index.css";

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  // Basit: üye ol sayfasını tamamlayan kullanıcı "giriş yapmış" sayılır.
  // Gerçek projede bu auth state'i daha kapsamlı olur.
  const isLoggedIn = false;

  function renderPage() {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "kampanyalar":
        return <Kampanyalar />;
      case "subeler":
        return <Subeler />;
      case "uyelik":
        return <UyelikPaketleri setPage={setPage} isLoggedIn={isLoggedIn} />;
      case "uyeol":
        return <UyeOl />;
      case "giris":
        return <GirisYap />;
      case "sepet":
        return <Sepet />;
      case "vizyon":
        return <Vizyon />;
      case "misyon":
        return <Misyon />;
      case "bmi":
        return <BMI />;
      case "idealkilo":
        return <IdealKilo />;
      case "su":
        return <SuIhtiyaci />;
      case "vucut":
        return <VucutTipi />;
      case "kalp":
        return <KalpHizi />;
      default:
        return <Home setPage={setPage} />;
    }
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Navbar - her sayfada sabit */}
      <Navbar
        page={page}
        setPage={setPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Marka adı - her sayfada sabit */}
      <div
        className="text-center py-4 cursor-pointer"
        style={{ borderBottom: "1px solid #22c55e" }}
        onClick={() => setPage("home")}
      >
        <span
          className="brand-title text-2xl md:text-3xl"
          style={{ color: "#22c55e" }}
        >
          PULSEFORGE
        </span>
      </div>

      {/* Sayfa içeriği */}
      <main>{renderPage()}</main>

      {/* Footer - her sayfada sabit */}
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;
