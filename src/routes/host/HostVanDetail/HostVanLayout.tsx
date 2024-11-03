import { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";

interface Van {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  type: string;
}

// Add an interface for the API response
interface ApiResponse {
  vans: Van[];
}

export default function HostVanLayout() {
  const { id } = useParams();
  const [hostVan, setHostVan] = useState<Van | null>(null);

  const getHostVan = useCallback(async (): Promise<void> => {
    const res = await fetch("/server/db.json");
    const data: ApiResponse = await res.json();
    
    const pickVan = data.vans.find((van: Van) => van.id === id);
    setHostVan(pickVan || null);
  }, [id]);

  useEffect(() => {
    getHostVan();
  }, [getHostVan]); // Now getHostVan is properly included in dependencies

  if (!hostVan) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="py-4">
        <Link to=".." relative="path" > &larr; Back To all vans</Link>
      </div>
      <div className="bg-white p-4 rounded">
        <article className="flex gap-4 items-center my-2 rounded-md">
          <div className="rounded-md border">
            <img src={hostVan.imageUrl} alt={hostVan.name} className="w-40 rounded" />
          </div>
          <div>
            <button className="bg-red-600 px-1 rounded text-white">
              {hostVan.type}
            </button>
            <h4 className="font-bold">{hostVan.name}</h4>
            <p className="text-gray-900">${hostVan.price}/day</p>
          </div>
        </article>
        <div>
          <nav className="flex gap-2">
            <NavLink
              end
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
              to="."
            >
              Details
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
              to="pricing"
            >
              Pricing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
              to="photos"
            >
              Photos
            </NavLink>
          </nav>
          <div>
            <Outlet context={{ hostVan }} />
          </div>
        </div>
      </div>
    </div>
  );
}