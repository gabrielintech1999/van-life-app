import { useOutletContext } from "react-router-dom";

interface Van {
  price: number;
  // Add other van properties as needed
}


interface HostVanContext {
  hostVan: Van;
}

export default function HostVanPricing() {
  const { hostVan } = useOutletContext<HostVanContext>();

  return (
    <section>
      <p className="py-4"><b>${hostVan.price}.00</b>/day</p>
    </section>
  )
}