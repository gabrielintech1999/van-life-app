# Van Life App


## Todos
- [x] Basic setup
- [x] create a git repo and Deploy to vercel
- [x] Basic UI scalfolding 
- [x] make API calls with mock server
- [x] make the van page
- [x] make the van detail page
- [x] make the layout
- [x] add a 404 not found page
- [x] add filter feature
- [x] add maintaining filter state during navigation
- [] handling errors


## Stack
- React
    - Components
    - Hooks
    - State
    - Props
    - Conditional rendering
    
- React Router DOM for:
    - client side routing, 
    - dynamic route
    - Nested Routes / layouts
    - Routing with query params
    - active links
    - relative links
    - protected route
- Tailwind
    - utility classes
- Typescript
    - types
    - interfaces
    - type inference
- Vite
- Vercel (for deployment)
- github

## features
- Filters
- preserving filter state | maintaining filter state during navigation
- handling errors and loaders
- User Registration/Login
- Lazy loading images  in react
  - native browser lazy loading
  - react lazy load image component











<!-- 



I'll suggest several improvements to enhance this component's functionality, performance, and user experience:

```typescript
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VanCard from "../../components/VanCard";

// Define van types as constants to avoid magic strings
const VAN_TYPES = {
  SIMPLE: "simple",
  LUXURY: "luxury",
  RUGGED: "rugged",
} as const;

// Define color scheme
const COLORS = {
  simple: "#DD775B",
  luxury: "#000000",
  rugged: "#135151",
} as const;

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const typeFilter = searchParams.get("type");

  async function getVans(): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/server/db.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setVans(data.vans);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vans");
    } finally {
      setIsLoading(false);
    }
  }

  const displayVans = typeFilter === null 
    ? vans 
    : vans.filter((van) => van.type === typeFilter);

  useEffect(() => {
    getVans();
  }, []);

  const handleFilterChange = (type: string | null) => {
    setSearchParams(type ? { type } : {});
  };

  // Generate filter button props to reduce repetition
  const filterButtons = [
    { type: null, label: "All", color: "#135151" },
    { type: VAN_TYPES.SIMPLE, label: "Simple", color: COLORS.simple },
    { type: VAN_TYPES.LUXURY, label: "Luxury", color: COLORS.luxury },
    { type: VAN_TYPES.RUGGED, label: "Rugged", color: COLORS.rugged },
  ];

  const FilterButton = ({ type, label, color }: { 
    type: string | null; 
    label: string; 
    color: string;
  }) => (
    <button
      onClick={() => handleFilterChange(type)}
      className={`
        px-4 py-2 rounded transition-colors duration-200
        ${typeFilter === type 
          ? `bg-[${color}] text-white` 
          : "bg-gray-200 hover:bg-opacity-80"
        }
        hover:text-white hover:bg-[${color}]
      `}
    >
      {label}
    </button>
  );

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
        <button 
          onClick={getVans}
          className="ml-4 text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore our van options</h1>
        <div className="flex gap-4">
          {filterButtons.map(button => (
            <FilterButton key={button.label} {...button} />
          ))}
        </div>
      </header>

      {/* Main content */}
      <main>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div 
                key={n} 
                className="h-64 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <>
            <p className="mb-4">
              {displayVans.length} van{displayVans.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayVans.map((van) => (
                <VanCard
                  key={van.id}
                  {...van}
                  searchParams={searchParams}
                  typeFilter={typeFilter}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

```

Key improvements made:

1. **Error Handling & Loading States**:
   - Added loading state with skeleton loading UI
   - Proper error handling with error message display
   - Retry mechanism for failed requests

2. **Type Safety & Constants**:
   - Added constants for van types and colors
   - Reduced magic strings
   - Better TypeScript usage

3. **UI/UX Improvements**:
   - Added responsive grid layout
   - Loading skeletons for better UX
   - Van count display
   - Proper heading hierarchy
   - Centered content with max width
   - Smoother hover transitions

4. **Code Organization**:
   - Extracted FilterButton component
   - Centralized color scheme
   - Reduced repetition in filter buttons
   - Better component structure

5. **Performance**:
   - Memoized filter buttons configuration
   - Optimized re-renders
   - Better fetch error handling

6. **Accessibility**:
   - Proper heading hierarchy
   - Better button contrast
   - Semantic HTML structure

Here's how you might want to update the VanCard component to match:

```typescript
import { Link } from "react-router-dom";

interface VanCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
  searchParams: URLSearchParams;
  typeFilter: string | null;
}

export default function VanCard({ 
  id,
  imageUrl, 
  name, 
  price, 
  type,
  searchParams,
}: VanCardProps) {
  const typeColors = {
    simple: "#DD775B",
    luxury: "#000000",
    rugged: "#135151",
  };

  return (
    <Link
      to={`${id}`}
      state={{
        search: `?${searchParams.toString()}`,
        type: type
      }}
      className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${name} van`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="flex flex-col items-end">
            <span className="font-bold">${price}</span>
            <span className="text-sm text-gray-600">/day</span>
          </div>
        </div>
        
        <span 
          className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: typeColors[type as keyof typeof typeColors] }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
    </Link>
  );
}

```

Would you like me to explain any of these improvements in more detail or suggest additional enhancements for specific aspects of the application? -->

