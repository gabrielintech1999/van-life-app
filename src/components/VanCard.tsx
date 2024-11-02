import { getVanTypeColor } from "../utils/utils";
import { Link } from "react-router-dom";


interface VanCardProps {
    id: number;
    imageUrl: string; 
    name: string;
    price: number;
    type: string; 
}


export default function VanCard({id, imageUrl, name, price, type }: VanCardProps) {

    return(
        
        <article>
        <Link to={`/vans/${id}`}>
          <div>
            <img src={imageUrl} alt={name} />
          </div>
          <div className="flex justify-between">
            <h4>{name}</h4>
            <b>${price}</b>
          </div>
          <button
            className={`py-1 px-4 rounded text-white my-2 font-bold ${getVanTypeColor(type)}`}
          >
            {type}
          </button>
        </Link>
      </article>
    )
}