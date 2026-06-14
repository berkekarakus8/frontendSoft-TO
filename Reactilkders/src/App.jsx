import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const products = [
    { id: 1, name: "Oyuncu Klavyesi", category: "Aksesuar", stock: 5, price: 1200, desc: "RGB mekanik klavye" },
    { id: 2, name: "Gaming Mouse", category: "Aksesuar", stock: 6, price: 800, desc: "Hızlı sensör" },
    { id: 3, name: "Kulaklık", category: "Ses", stock: 4, price: 1500, desc: "7.1 surround" },
    { id: 4, name: "Bluetooth Hoparlör", category: "Ses", stock: 3, price: 1000, desc: "Taşınabilir" },
    { id: 5, name: "SSD 1TB", category: "Depolama", stock: 7, price: 2000, desc: "Yüksek hız" },
    { id: 6, name: "USB Bellek", category: "Depolama", stock: 10, price: 300, desc: "64GB" },
    { id: 7, name: "Monitör", category: "Ekran", stock: 2, price: 4500, desc: "144Hz" },
    { id: 8, name: "Tablet", category: "Ekran", stock: 3, price: 6000, desc: "10 inch ekran" }
  ];

  let cart = [];

  function renderCart() {
    const cartBox = document.getElementById("cartItems");
    const totalBox = document.getElementById("total");
    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      cartBox.innerHTML += `
        <div style="margin-bottom:10px">
          <p>${item.name}</p>
          <p>Adet: ${item.qty}</p>
        </div>
      `;
    });

    totalBox.innerText = total + " TL";
  }

  function addToCart(product) {
    const found = cart.find(item => item.id === product.id);

    if (found) {
      if (found.qty < product.stock) {
        found.qty++;
      }
    } else {
      cart.push({ ...product, qty: 1 });
    }

    renderCart();
  }

  function searchProduct() {
    const value = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".productCard");

    cards.forEach(card => {
      if (card.innerText.toLowerCase().includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function clearCart() {
    cart = [];
    renderCart();
  }

  function buyCart() {
    alert("Satın alma başarılı!");
    cart = [];
    renderCart();
  }

  function ProductCard(props) {
    return (
      <div className="productCard bg-white p-4 rounded shadow mb-3">
        <h2 className="font-bold">{props.name}</h2>
        <p>{props.desc}</p>
        <p>Stok: {props.stock}</p>
        <p>Fiyat: {props.price} TL</p>

        <button
          className="bg-blue-400 text-white px-3 py-1 rounded mt-2"
          onClick={() => addToCart(props)}
        >
          Sepete Ekle
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        E-Ticaret Sepet Paneli
      </h1>

      <h2 className="text-xl mt-6">Ürün Arama ve Filtreleme</h2>

      <input
        id="searchInput"
        onKeyUp={searchProduct}
        placeholder="Ürün ara..."
        className="border p-2 w-full mt-2 rounded"
      />

      <div className="flex gap-3 mt-4">
        <div className="bg-blue-200 p-3 rounded">Aksesuar</div>
        <div className="bg-blue-200 p-3 rounded">Ekran / Ses</div>
        <div className="bg-blue-200 p-3 rounded">Depolama</div>
      </div>

      <div className="flex gap-6 mt-6">
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-3">Ürün Listesi</h2>

          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="w-1/3 bg-blue-100 p-4 rounded h-fit">
          <h2 className="text-2xl font-bold mb-3">Sepet</h2>

          <div id="cartItems"></div>

          <h3 className="mt-4 font-bold">
            Toplam: <span id="total">0 TL</span>
          </h3>

          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 mr-2"
          >
            Temizle
          </button>

          <button
            onClick={buyCart}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;