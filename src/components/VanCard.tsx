import { getVanTypeColor } from "../utils/utils";
import { Link } from "react-router-dom";


interface VanCardProps {
    id: number;
    imageUrl: string; 
    name: string;
    price: number;
    type: string;
    searchParams: URLSearchParams;
    typeFilter?: string | null;
}


export default function VanCard({id, imageUrl, name, price, type, searchParams, typeFilter }: VanCardProps) {

    return(
        
        <article>
        <Link to={`${id}`} state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter || "all"
        }}>
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