import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Pomo from "./components/Pomo/Pomo";
import { appWindow } from '@tauri-apps/api/window';


function handleClick(event: MouseEvent) {
  console.log(event.target);
  appWindow.startDragging();
}

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    invoke('close_splashscreen')
  })

  return (
    <div class="Container" onclick={handleClick} data-tauri-drag-region>
      <Pomo />
    </div>
  );
}

export default App;
