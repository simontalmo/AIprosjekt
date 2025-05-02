
let messages = [];

async function sendMelding() {
  const input = document.getElementById("input");
  const melding = input.value.trim();
  if (!melding) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user"><b>Du:</b> ${melding}</div>`;
  input.value = "";

  // Skal hente meldingshistorikken
  messages.push({ role: "user", content: melding });


// Her da vil den prøve med "try {...} for å hente AI fra Ollam"
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2", // bruker da llama3:latest (3.2)
        messages: messages
      })
    });

    const data = await response.json();
    const svar = data.message.content;

    // Legg til svaret i historikken for å huske den
    messages.push({ role: "assistant", content: svar });

  
    chat.innerHTML += `<div class="ai"><b>AI:</b> ${svar}</div>`;
    chat.scrollTop = chat.scrollHeight;

    // Om den evt får error eller problem med Ollama, vil den gi en feilmelding
  } catch (err) {
    console.error("Feil:", err);
    chat.innerHTML += `<div class="ai"><b>AI:</b> ❌ Klarte ikke koble til Ollama.</div>`;
  }
}
