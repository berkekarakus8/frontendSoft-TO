import { useState } from "react";

function Navbar({ page, setPage, darkMode, setDarkMode }) {
  return (
    <nav className="navbar flex items-center justify-between px-8 py-3 sticky top-0 z-50">
      <div className="flex gap-2">
        <button className="nav-link" onClick={() => setPage("kampanyalar")}>
          Kampanyalar
        </button>
        <button className="nav-link" onClick={() => setPage("subeler")}>
          Şubeler
        </button>
        <button className="nav-link" onClick={() => setPage("uyelik")}>
          Üyelik Paketleri
        </button>
      </div>

      <button
        onClick={() => {
          setDarkMode(!darkMode);
          document.body.classList.toggle("dark");
        }}
        className="text-white text-xl p-2 rounded-full hover:bg-green-600 transition"
        title="Dark/Light Mod"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default Navbar;
