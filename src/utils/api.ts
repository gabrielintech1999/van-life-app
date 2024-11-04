interface Vans {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  type: string;
}

export async function getVans(): Promise<{ vans: Vans[] }> {
  const res = await fetch("/server/db.json");

  // Handle non-200 responses
  if (!res.ok) {
    throw new Error(`Server returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  // Validate data structure

  if (!data.vans || !Array.isArray(data.vans)) {
    throw new Error("Invalid data format received from server");
  }

  data.vans.forEach((van: Vans, index: number) => {
    if (!van.id || !van.name || !van.type) {
      throw new Error(`Invalid van data at index ${index}`);
    }
  });

  return data;
}
