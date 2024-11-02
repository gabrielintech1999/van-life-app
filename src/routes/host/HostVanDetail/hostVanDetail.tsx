import { useOutletContext } from "react-router-dom";

interface Van {
  name: string;
  imageUrl: string;
  type: string; 
  description: string;
  // Add other van properties as needed
}


interface HostVanContext {
  hostVan: Van;
}


export default function HostVanDetail() {
  const { hostVan } = useOutletContext<HostVanContext>();

  console.log(hostVan);

  return (
    <section className="py-4">
      <div>
        <span className="font-bold">Name:</span> {hostVan.name}
      </div>
      <div>
        <span className="font-bold">Category:</span> {hostVan.type}
      </div>
      <div>
        <span className="font-bold">Description:</span> {hostVan.description}
      </div>
      <div>
        <span className="font-bold">visbilty:</span> Private
      </div>
    </section>
  );
}
