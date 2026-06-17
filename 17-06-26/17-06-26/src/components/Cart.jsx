export default function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  setView,
}) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="container py-10">
      <div className="bg-white rounded-2xl p-6 shadow-md border">
        <h2 className="text-2xl font-bold mb-6">Sepetim</h2>

        {cart.length === 0 ? (
          <p>Sepet boş.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.price} TL</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <h3 className="text-xl font-bold mt-6">
              Toplam: {totalPrice} TL
            </h3>
          </>
        )}

        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setView("home")}
        >
          Alışverişe Devam Et
        </button>
      </div>
    </main>
  );
}