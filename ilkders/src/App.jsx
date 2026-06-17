import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);

  function addPerson() {
    if (name.trim() === "") return;

    const newPerson = {
      id: Date.now(),
      name,
      active: Math.random() > 0.5,
    };

    setPeople([...people, newPerson]);
    setName("");
  }

  function deletePerson(id) {
    setPeople(people.filter((person) => person.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Katılımcı Yönetimi
        </h1>

        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="İsim gir..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border p-2 rounded-lg"
          />

          <button
            onClick={addPerson}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Ekle
          </button>
        </div>

        <div className="mb-4 font-semibold">
          Toplam Kişi:
          <span className="ml-2">
            {people.length > 0 ? people.length : "Henüz kişi yok"}
          </span>
        </div>

        <div className="space-y-3">
          {people.map((person) => (
            <div
              key={person.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{person.name}</h2>

                <p>
                  Durum:
                  <span className="ml-2">
                    {person.active ? "Aktif ✅" : "Pasif ❌"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => deletePerson(person.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;