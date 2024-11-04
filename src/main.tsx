import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles/global.css";

// function Header(): JSX.Element {
//   return(
//     <header className="bg-black p-4 text-white">
//       This the navbar
//     </header>
//   )
// }

// function HeroSection(): JSX.Element {
//   return(
//     <section className=" bg-red-800 p-4 text-white">
//       This the heroSection

//       <h1>Online Experiences</h1>
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempora. </p>
//     </section>
//   )
// }

// function Card() { 
//   return(
//     <article className="border p-4 w-64 rounded relative ">
//       <div className="bg-black text-white w-20 text-center absolute top-5 left-5 rounded">
//          Sold out
//       </div>
//       <div>
//         <img src="" alt="" className="bg-gray h-[200px]  w-[100%] bg-gray-500 rounded"  />
//       </div>
//       <div>
//         <p>5.0 (6) * USA</p>
//       </div>
//       <div>
//          <p>Life Lessons with Katie Zaferes</p>
//       </div>
//       <div>
//         <p><b>From $136 / person</b></p>
//       </div>
//     </article>
//   )
// }

// function ExperiencesList(): JSX.Element {
//   return(
//     <section className="flex overflow-auto p-4 gap-5">
//       <Card />
//       <Card />
//       <Card />
//       <Card />
//     </section>
//   )
// }




// function App(): JSX.Element  {
//   return(
//       <div>
//         <Header />
//         <main>
//           <HeroSection />
//           <ExperiencesList />
//         </main>
//       </div>
//   )
// }

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );



