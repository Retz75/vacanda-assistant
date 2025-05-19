export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Tu es Vacanda.0, un agent minimaliste qui répond toujours par une seule action claire, sans justification." },
          { role: "user", content: `Tu es Vacanda.0. Reçois cette commande vocale : ${prompt}` }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Réponse invalide d'OpenAI :", data);
      return res.status(500).json({ result: "Erreur API OpenAI" });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error("Erreur backend :", err);
    res.status(500).json({ result: "Erreur serveur" });
  }
}

