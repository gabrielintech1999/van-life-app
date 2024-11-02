import { useOutletContext } from "react-router-dom";

interface Van {
  name: string;
  imageUrl: string;
  // Add other van properties as needed
}


interface HostVanContext {
  hostVan: Van;
}

export default function HostVanPhotos() {



  const { hostVan } =  useOutletContext<HostVanContext>();

  return (
    <section>


      <img src={hostVan.imageUrl} alt={hostVan.name} className="my-4 w-20 rounded" />
    </section>
  )
}
