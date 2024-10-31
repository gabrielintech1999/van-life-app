import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Van {
  id: string;  // Certifique-se de que o tipo de `id` está correto
  imageUrl: string;
  name: string;
  price: number; 
  description: string;
  type: string;
}

export default function VanDetail(): JSX.Element {
  const { id } = useParams();
  const [van, setVan] = useState<Van | null>(null);

  async function getVan(): Promise<void> {
    const res = await fetch("/server/db.json");
    const data: Van[] = await res.json();

    const pickVan = data.find(van => van.id === id);
    setVan(pickVan || null);
  }

  useEffect(() => {
    getVan();
  }, [id]);

  if (!van) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 h-screen">
      <div>
        <div>
          <img src={van.imageUrl} alt={van.name} />
        </div>
        <div className="my-2">
          <span className="bg-red-600 inline-block py-1 px-4 font-bold text-white rounded">
            {van.type}
          </span>
        </div>
        <div className="my-2 font-bold text-1xl">
          <h1>{van.name}</h1>
        </div>
        <div className="my-2">
          <p><b>${van.price}</b>/day</p>
        </div>
        <div className="my-2">
          <p>{van.description}</p>
        </div>
        <div>
          <button className="w-full bg-red-600 p-2 text-white font-bold rounded">Rent this van</button>
        </div>
      </div>
    </main>
  );
}
