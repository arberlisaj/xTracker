import React from "react";
import ReactDOM from "react-dom/client";
import Container from "./components/Container";
import Header from "./components/Header";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="min-h-screen px-2 bg-slate-50">
      <Header />
      <div className="flex flex-wrap justify-center gap-2 py-4 mx-auto sm:justify-start w-fit ">
        <Container state="Planned" />
        <Container state="In Progress" />
        <Container state="In Review" />
        <Container state="Completed" />
      </div>
    </main>
  </React.StrictMode>
);
