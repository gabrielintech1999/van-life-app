// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./routes/home";
// import About from "./routes/about";
// import Vans from "./routes/vans/vans";
// import VanDetail from "./routes/vans/van";
// import RootLayout from "./RootLayout";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<RootLayout />}>
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/vans" element={<Vans />} />
//           <Route path="/vans/:id" element={<VanDetail />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import Vans from "./routes/vans/vans";
import VanDetail from "./routes/vans/van";
import RootLayout from "./RootLayout";
import HostLayout from "./routes/host/HostLayout";
import Dashboard from "./routes/host/host";
import Income from "./routes/host/income";
import Reviews from "./routes/host/reviews";
import HostVans from "./routes/host/hostVans";
import HostVanLayout from "./routes/host/HostVanDetail/HostVanLayout";
import HostVanDetail from "./routes/host/HostVanDetail/HostVanDetail";
import HostVanPricing from "./routes/host/HostVanDetail/hostVanPricing";
import HostVanPhotos from "./routes/host/HostVanDetail/hostVanPhotos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />

          <Route path="/host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />


            <Route path="vans/:id" element={<HostVanLayout />} > 
                <Route index element={<HostVanDetail />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />

             </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
