import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Vans {
  id: number;
  name: string;
  price: number; 
  imageUrl: string;
  description: string;
  type: string;
}

export default function Vans() {
  const [vans, setVans] = useState<Vans[]>([]);

  async function getVans(): Promise<void> {
    const res = await fetch("/server/db.json");
    const data = await res.json();

    console.log(data);
    setVans(data);
  }

  useEffect(() => {
    getVans();
  }, []);
  return (
    <main className="grid grid-cols-2 gap-4 mx-4 h-screen">
      {vans.map((van) => (
        <article key={van.id}>
         <Link to={`/vans/${van.id}`}>
         <div>
                <img src={van.imageUrl} alt={van.name} />
            </div>
          <div className="flex justify-between">
            <h4>{van.name}</h4>
            <b>${van.price}</b>
          </div>
          <button className={` py-1 px-4 rounded text-white my-2 font-bold ${van.type ? "bg-red-700" : ""}`}>{van.type}</button>
         </Link>
        </article>
      ))}
    </main>
  );
}
