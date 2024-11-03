import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VanCard from "../../components/VanCard";

interface Vans {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState<Vans[]>([]);

  const typeFilter: string | null = searchParams.get("type");

  async function getVans(): Promise<void> {
    const res = await fetch("/server/db.json");
    const data = await res.json();
    setVans(data.vans);
  }

  const displayVans =
    typeFilter === null ? vans : vans.filter((van) => van.type === typeFilter);

  useEffect(() => {
    getVans();
  }, []);

  // Function to handle filter changes
  const handleFilterChange = (type: string | null) => {
    if (type === null) {
      // Clear the filter
      setSearchParams({});
    } else {
      // Set the filter
      setSearchParams({ type });
    }
  };

  return (
    <div className="p-4 ">
      {/* Filter buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleFilterChange(null)}
          className={`px-4 py-2 rounded ${
            typeFilter === null ? "bg-[#135151] text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("simple")}
          className={`px-4 py-2 rounded hover:text-white  hover:bg-[#DD775B]   ${
            typeFilter === "simple" ? "bg-[#DD775B] text-white" : "bg-gray-200"
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("luxury")}
          className={`px-4 py-2 rounded  hover:text-white  hover:bg-[#000000]  ${
            typeFilter === "luxury" ? "bg-[#000000] text-white" : "bg-gray-200"
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("rugged")}
          className={`px-4 py-2 rounded  hover:text-white  hover:bg-[#135151]  ${
            typeFilter === "rugged" ? "bg-[#135151] text-white" : "bg-gray-200"
          }`}
        >
          Rugged
        </button>
      </div>

      {/* Vans grid */}
      <main className="grid grid-cols-2 gap-4 h-screen">
        {displayVans.map((van) => (
          <VanCard
            key={van.id}
            id={van.id}
            imageUrl={van.imageUrl}
            name={van.name}
            price={van.price}
            type={van.type}
            searchParams={searchParams}
            typeFilter={typeFilter}
          />
        ))}
      </main>
    </div>
  );
}
