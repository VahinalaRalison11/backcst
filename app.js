import translate from '@mgcodeur/super-translator';
import express from 'express';
const app = express();
app.use(express.json());

var donneesStockees = [];

// Route pour recevoir des données en POST
app.post('/envoyer-donnees', (req, res) => {
    console.log("*******************");
    const donneesRecues = req.body;
    donneesStockees = donneesRecues;
    res.status(201).json({ message: 'Données reçues avec succès' });
  });

// Route pour renvoyer des données en GET
app.get('/recuperer-donnees',async (req, res) => {
  const results = await Promise.all(donneesStockees.data.map(async(el)=>{
    el.message = await translate({
      to: donneesStockees.language,
      text: el.message,
    });
    return el;
  }));
  res.status(200).json(results);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});