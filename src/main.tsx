import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles.css";
import Container from "./components/Container";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <section className="flex gap-1 w-fit m-auto mt-3">
      <Container state="Planned" />
      <Container state="Progress" />
      <Container state="Completed" />
    </section>
  </React.StrictMode>
);
