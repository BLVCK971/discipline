import { createSignal, Show } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Pomo from "./components/Pomo/Pomo";
import ToDo from "./components/TodoList/ToDo";
import { appWindow,getCurrent  } from "@tauri-apps/api/window";


function App() {
  const [name, setName] = createSignal("");
  const [activeView, setActiveView] = createSignal("chrono");
  const handleClose = async () => {
    const window = await getCurrent();
    window.close();
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    invoke("close_splashscreen");
  });

  return (
    <div class="Container" data-tauri-drag-region>
      <button className="close-button" onClick={handleClose}></button>

      <ToDo active={activeView() === "todo"}  />
      <Pomo active={activeView() === "chrono"} />

      <div class="navbar" data-tauri-drag-region>
        <button class="navbar-button" onClick={() => setActiveView("todo")}>
          TODO
        </button>
        <button class="navbar-button" onClick={() => setActiveView("chrono")}>
          Chrono
        </button>
      </div>
    </div>
  );
}

export default App;
