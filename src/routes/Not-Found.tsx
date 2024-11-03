
import {Link} from 'react-router-dom'

export default function NotFound(): JSX.Element {
    return (
      <main className="h-screen flex justify-center items-center text-center bg-black text-white">
        <div>
        <h1 className="uppercase text-red-700 font-bold">Page Not Found</h1>
        <Link to="/vans" className="text-black font-bold">
            <p className='text-blue-700'>Go Back to vans</p>
        </Link>
        </div>
      </main>
    );
  }