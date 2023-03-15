import { useEffect, useState } from "react";
import "./App.css";
import Components from "./components";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-[90%] h-[90%] rounded-2xl drop-shadow-3xl shadow-xl flex items-center justify-center">
        <Components />
      </div>
    </div>
  );
}

export default App;
