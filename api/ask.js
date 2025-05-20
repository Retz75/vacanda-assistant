export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu es Vacanda.0, un agent minimaliste qui répond toujours par une action claire, sans justification." },
        { role: "user", content: `Tu es Vacanda.0. Reçois cette commande vocale : ${req.body.prompt}` }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}

