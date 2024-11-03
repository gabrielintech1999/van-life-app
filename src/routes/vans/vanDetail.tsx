import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVanTypeColor } from "../../utils/utils";

interface Van {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  type: string;

}

interface ApiResponse {
  vans: Van[];
}

export default function VanDetail(): JSX.Element {
  const { id } = useParams();
  const {state} = useLocation()
  console.log(state);
  
  const [van, setVan] = useState<Van | null>(null);

  const getVan = useCallback(async (): Promise<void> => {
    const res = await fetch("/server/db.json");
    const data: ApiResponse = await res.json();
    
    const pickVan = data.vans.find((van: Van) => van.id === id);
    setVan(pickVan || null);
  }, [id]);

  useEffect(() => {
    getVan();
  }, [getVan]);

  if (!van) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 h-screen">
      <div>
        <div>
        <div className="py-4">
        <Link to={`..?${state === null ? "": `type=${state}`}`} relative="path"> &larr; Back To {state ? state :"all"} vans</Link>
      </div>
        </div>
        <div>
          <img src={van.imageUrl} alt={van.name} />
        </div>
        <div className="my-2">
          <span
            className={`inline-block py-1 px-4 font-bold text-white rounded ${getVanTypeColor(
              van.type
            )}`}
          >
            {van.type}
          </span>
        </div>
        <div className="my-2 font-bold text-1xl">
          <h1>{van.name}</h1>
        </div>
        <div className="my-2">
          <p>
            <b>${van.price}</b>/day
          </p>
        </div>
        <div className="my-2">
          <p>{van.description}</p>
        </div>
        <div >
          <button className="w-full bg-red-600 p-2 text-white font-bold rounded">
            Rent this van
          </button>
        </div>
      </div>
    </main>
  );
}