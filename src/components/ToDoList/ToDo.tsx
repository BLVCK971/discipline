// src/App.tsx
import { Component, createEffect, createSignal } from "solid-js";
import "./ToDo.css";

interface ToDoProps {
  active: boolean;
}

const ToDo: Component<ToDoProps> = (props) => {
  const todoDisplayStyle = () => {
    return props.active ? { display: "block" } : { display: "none" };
  };
    return (<div style={{ height: "100%", ...todoDisplayStyle() }} >Hello</div>);
  }

export default ToDo;