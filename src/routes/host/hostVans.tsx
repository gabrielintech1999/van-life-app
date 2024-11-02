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



export default function HostVans() {

  const [hostVans, setHostVans] = useState<Vans[]>([]);


  

  async function getVans(): Promise<void> {
    const res = await fetch("/server/db.json");
    const data = await res.json();

    setHostVans(data.vans);
  }

  useEffect(() => {
    getVans();
  }, []);
 

  return (
    <section>
       <h1 className="font-bold text-2xl my-4">Your Listed Vans</h1>
      
        {
          hostVans.map((hostVan, i) => (
            <article key={i} className="p-4 bg-white items-center my-2 rounded-md">
               <Link to={`${hostVan.id}`} className="flex gap-4 ">
               <div className="rounded-md border">
                <img src={hostVan.imageUrl} alt="Modest Explorer" className="w-20 rounded"   />
               </div>
               <div>
               <h4 className="font-bold">{hostVan.name}</h4>
               <p className="text-gray-900">${hostVan.price}/day</p>
               </div>
               </Link>
            </article>
          ))
        }
    </section>
  )
}
