import { useState } from "react";
import { topics } from "./data/topics";
import "./App.css";

function App() {
  const [ topic, setTopic ] = useState(null);

  function sorteartAssunto() {
    const indice = Math.floor(Math.random() * topics.length);
    setTopic(topics[indice]);
  }
  return (
    <main className="app">
    <header className="header">
    <h1>Quebra-Cabeça</h1>
    <p>Pesque. Pense. Explique.</p>
    </header>
    <section className="challenge">
      <p className="label">SUA PAUTA</p>

      <h2> {topic || "O que vamos descobrir hoje?"}</h2>
      <button className="sortear"
      onClick={sorteartAssunto}
      >
        Sortear Assunto
         </button>
      </section>
      </main>
  );
}
export default App;