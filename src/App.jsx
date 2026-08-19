import { useState, useEffect } from "react";
import { topics } from "./data/topics";
import "./App.css";

function App() {
  const [topic, setTopic] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isResearching, setIsResearching] = useState(false);
  const [speechTime, setSpeechTime] = useState(60);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState(() => {
  const savedHistory = localStorage.getItem("quebraCabecaHistory");

  return savedHistory ? JSON.parse(savedHistory) : [];
});

  const [isSaved, setIsSaved] = useState(false);



  function sortearAssunto() {
    const indice = Math.floor(Math.random() * topics.length);
    setTopic(topics[indice]);
  }

  useEffect(() => {
    if (!isResearching || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isResearching, timeLeft]);

  useEffect(() => {
  if (!isSpeaking || speechTime === 0) return;

  const timer = setInterval(() => {
    setSpeechTime((prevTime) => prevTime - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [isSpeaking, speechTime]);


  function iniciarPesquisa() {
    setTimeLeft(6);
    setIsResearching(true);
  }

  const minutos = Math.floor(timeLeft / 60);
  const segundos = timeLeft % 60;

  const tempoFormatado = `${String(minutos).padStart(2, "0")}:${String(
    segundos
  ).padStart(2, "0")}`;


  function iniciarFala() {
  setSpeechTime(5);
  setIsSpeaking(true);
}

const minutosFala = Math.floor(speechTime / 60);
const segundosFala = speechTime % 60;

const falaFormatada = `${String(minutosFala).padStart(2, "0")}:${String(
  segundosFala
).padStart(2, "0")}`;

function salvarNoHistorico() {
  if (!topic || isSaved) return;

  const novoRegistro = {
    id: Date.now(),
    topic: topic,
    date: new Date().toLocaleDateString("pt-BR"),
  };

  const novoHistorico = [...history, novoRegistro];

  setHistory(novoHistorico);
  setIsSaved(true);

  localStorage.setItem(
    "quebraCabecaHistory",
    JSON.stringify(novoHistorico)
  );
}

function novoDesafio() {
  setTopic(null);

  setTimeLeft(10);
  setIsResearching(false);

  setSpeechTime(60);
  setIsSpeaking(false);
  setIsSaved(false);
}



  return (
    <main className="app">
      <header className="header">
        <h1>Quebra-Cabeça</h1>
        <p>Pesquise. Pense. Explique.</p>
      </header>

      <section className="challenge">
        <p className="label">SUA PAUTA</p>

        <h2>{topic || "O que vamos descobrir hoje?"}</h2>

        <button
          className="sortear"
          onClick={sortearAssunto}
        >
          Sortear Assunto
        </button>

        {topic && (
          <div className="research">
            <p>Tempo de pesquisa</p>

            <h3>{tempoFormatado}</h3>

            {!isResearching && (
              <button onClick={iniciarPesquisa}>
                Iniciar pesquisa
              </button>
            )}

            {isResearching && timeLeft > 0 && (
              <p>Pesquisando sobre: {topic}</p>
            )}

            {timeLeft === 0 && (
              <p>Tempo de pesquisa encerrado.</p>
            )}
            {timeLeft === 0 && (
  <div className="speech">
    <p>Tempo de fala</p>

    <h3>{falaFormatada}</h3>

    {!isSpeaking && (
      <button onClick={iniciarFala}>
        Iniciar fala
      </button>
    )}

    {isSpeaking && speechTime > 0 && (
      <p>Explique com suas próprias palavras.</p>
    )}
{speechTime === 0 && (
  <div>
    <p>Desafio concluído! 🧩</p>

    <button onClick={salvarNoHistorico}
    disabled={isSaved}>
     {isSaved ? "Salvo" : "Salvar histórico"}
    </button>

    <button onClick={novoDesafio}>Novo desafio</button>

  </div>
)}

  </div>
)}
          </div>
        )}
      </section>
        {history.length > 0 && (
  <section className="history">
    <h2>Meu histórico</h2>

    {history.map((item) => (
      <div key={item.id}>
        <strong>{item.topic}</strong>
        <span> — {item.date}</span>
      </div>
    ))}
  </section>
)}
    </main>
  );
}

export default App;
