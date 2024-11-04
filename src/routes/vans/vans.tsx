import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VanCard from "../../components/VanCard";
import { getVans } from "../../utils/api";

interface Vans {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  type: string;
}

interface FecthState {
  loading: boolean;
  error: string | null;
  data: Vans[] | null;
}

export default function Vans() {
  const [fetchState, setFetchState] = useState<FecthState>({
    loading: true,
    error: null,
    data: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter: string | null = searchParams.get("type");

  useEffect(() => {
    async function loadVans(): Promise<void> {
      try {
              // Reset state at the start of fetch
      setFetchState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await getVans();
        
        setFetchState({
          loading: false,
          error: null,
          data: data.vans,
        });
      } catch (error) {
        // Handle different types of errors
        let errorMessage: string = "Failed to fecth vans";

        if (error instanceof TypeError) {
          // Network errors
          errorMessage = "Network error - please check your connection";
        } else if (error instanceof SyntaxError) {
          // JSON parsing errors
          errorMessage = "Invalid data received from server";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        setFetchState({
          loading: false,
          error: errorMessage,
          data: null,
        });
      }
    }

    loadVans();
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

  if (fetchState.loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (fetchState.error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error Loading Vans</h2>
          <p className="text-red-600 mt-1">{fetchState.error}</p>
          <button
            onClick={getVans}
            className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const displayVans =
    typeFilter === null
      ? fetchState.data
      : fetchState.data?.filter((van) => van.type === typeFilter);

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
        {displayVans?.map((van) => (
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

// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import VanCard from "../../components/VanCard";

// interface Vans {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   description?: string;
//   type: string;
// }

// interface FecthState {
//   loading: boolean;
//   error: string | null;
//   data: Vans[] | null;
// }

// export default function Vans() {
//   const [fetchState, setFetchState] = useState<FecthState>({
//     loading: true,
//     error: null,
//     data: null,
//   });
//   const [searchParams, setSearchParams] = useSearchParams();

//   const typeFilter: string | null = searchParams.get("type");

//   async function getVans(): Promise<void> {
//     try {
//       // Reset state at the start of fetch
//       setFetchState((prev) => ({ ...prev, loading: true, error: null }));

//       const res = await fetch("/server/db.json");

//       // Handle non-200 responses
//       if (!res.ok) {
//         throw new Error(`Server returned ${res.status}: ${res.statusText}`);
//       }

//       const data = await res.json();

//       // Validate data structure

//       if (!data.vans || !Array.isArray(data.vans)) {
//         throw new Error("Invalid data format received from server");
//       }

//       data.vans.forEach((van: Vans, index: number) => {
//         if (!van.id || !van.name || !van.type) {
//           throw new Error(`Invalid van data at index ${index}`);
//         }
//       });

//       setFetchState({
//         loading: false,
//         error: null,
//         data: data.vans,
//       });
//     } catch (error) {
//       // Handle different types of errors
//       let errorMessage: string = "Failed to fecth vans";

//       if (error instanceof TypeError) {
//         // Network errors
//         errorMessage = "Network error - please check your connection";
//       } else if (error instanceof SyntaxError) {
//         // JSON parsing errors
//         errorMessage = "Invalid data received from server";
//       } else if (error instanceof Error) {
//         errorMessage = error.message;
//       }
//       setFetchState({
//         loading: false,
//         error: errorMessage,
//         data: null,
//       });
//     }
//     // const res = await fetch("/server/db.json");
//     // const data = await res.json();
//     // setVans(data.vans);
//   }

//   useEffect(() =>  {
//       getVans()
//   }, [])

//   // Function to handle filter changes
//   const handleFilterChange = (type: string | null) => {
//     if (type === null) {
//       // Clear the filter
//       setSearchParams({});
//     } else {
//       // Set the filter
//       setSearchParams({ type });
//     }
//   };

//   if (fetchState.loading) {
//     return (
//       <div className="p-4">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-gray-200 rounded w-1/4"></div>
//           <div className="grid grid-cols-2 gap-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
//               <div key={n} className="h-64 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle error state
//   if (fetchState.error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-50 border border-red-200 rounded-md p-4">
//           <h2 className="text-red-800 font-medium">Error Loading Vans</h2>
//           <p className="text-red-600 mt-1">{fetchState.error}</p>
//           <button
//             onClick={getVans}
//             className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const displayVans =
//     typeFilter === null
//       ? fetchState.data
//       : fetchState.data?.filter((van) => van.type === typeFilter);

//   return (
//     <div className="p-4 ">
//       {/* Filter buttons */}
//       <div className="mb-6 flex gap-4">
//         <button
//           onClick={() => handleFilterChange(null)}
//           className={`px-4 py-2 rounded ${
//             typeFilter === null ? "bg-[#135151] text-white" : "bg-gray-200"
//           }`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => handleFilterChange("simple")}
//           className={`px-4 py-2 rounded hover:text-white  hover:bg-[#DD775B]   ${
//             typeFilter === "simple" ? "bg-[#DD775B] text-white" : "bg-gray-200"
//           }`}
//         >
//           Simple
//         </button>
//         <button
//           onClick={() => handleFilterChange("luxury")}
//           className={`px-4 py-2 rounded  hover:text-white  hover:bg-[#000000]  ${
//             typeFilter === "luxury" ? "bg-[#000000] text-white" : "bg-gray-200"
//           }`}
//         >
//           Luxury
//         </button>
//         <button
//           onClick={() => handleFilterChange("rugged")}
//           className={`px-4 py-2 rounded  hover:text-white  hover:bg-[#135151]  ${
//             typeFilter === "rugged" ? "bg-[#135151] text-white" : "bg-gray-200"
//           }`}
//         >
//           Rugged
//         </button>
//       </div>

//       {/* Vans grid */}
//       <main className="grid grid-cols-2 gap-4 h-screen">
//         {displayVans?.map((van) => (
//           <VanCard
//             key={van.id}
//             id={van.id}
//             imageUrl={van.imageUrl}
//             name={van.name}
//             price={van.price}
//             type={van.type}
//             searchParams={searchParams}
//             typeFilter={typeFilter}
//           />
//         ))}
//       </main>
//     </div>
//   );
// }
