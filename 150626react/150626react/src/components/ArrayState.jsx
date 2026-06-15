import React from "react";
import { useState } from "react";

const ArrayState = () => {
  const [gorevler, setGorevler] = useState([
    { id: 1, baslik: "UseState çalışma Mantığını Öğren", tamamlandi: true },
    { id: 2, baslik: "Dizi State Yapısı Öpren", tamamlandi: false },
    {
      id: 3,
      baslik: "Form Event Handling yapılarını İncele",
      tamamlandi: false,
    },
  ]);

  const [yeniGorev, setYeniGorev] = useState("");

  const gorevEkle = (e) => {
    e.preventDefault();
    if (yeniGorev.trim() === "") return;

    const yeni = {
      id: Date.now,
      baslik: yeniGorev,
      tamamlandi: false,
    };
    setGorevler([...gorevler, yeni]);
    setYeniGorev("");
  };
  const gorevTamamla = (id) => {
    setGorevler(
      gorevler.map((g) =>
        g.id === id ? { ...g, tamamlandi: !g.tamamlandi } : g,
      ),
    );
  };

  const gorevSil = (id) => {
    setGorevler(gorevler.filter((g) => g.id != id));
  };

  const tamamlananlarSayisi = gorevler.filter((g) => g.tamamlandi).length;

  return (
    <div className="p-4">
      <div className="card-header-list">
        <h4 className="demo-section-title">Yapılacaklar Listesi</h4>
        <span className="demo-count-span">
          {tamamlananlarSayisi} / {gorevler.length} tamamlandı
        </span>
      </div>
      <form onSubmit={gorevEkle} className="flex gap-2">
        <input
          type="text"
          value={yeniGorev}
          onChange={(e) => setYeniGorev(e.target.value)}
          placeholder="Yeni Görev Ekle...."
          className="demo-input"
        />
        <button type="submit" className="btn-blue-submit">
          Ekle
        </button>
      </form>

      {gorevler.length === 0 ? (
        <p className="empty-list-text">Henüz Görev Eklenmemiş.</p>
      ) : (
        <div className="todo-list-container">
          {gorevler.map((g) => (
            <div
              key={g.id}
              className={`todo-item ${g.tamamlandi ? "todo-item-completed" : ""}`}
            >
              <div className="todo-item-left">
                <input
                  type="checkbox"
                  checked={g.tamamlandi}
                  onChange={() => gorevTamamla(g.id)}
                  className="btn-delete-todo"
                />
                <span className="todo-item-text">{g.baslik}</span>
              </div>
              <button
                onClick={() => gorevSil(g.id)}
                className="btn-delete-todo"
              >
                sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrayState;
