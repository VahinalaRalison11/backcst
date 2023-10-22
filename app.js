const translate = require('@mgcodeur/super-translator');
const express = require('express');

const app = express();
var donneesStockees = [];

//////////////////////////////////
// permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
  app.use((req, res) => {
    res.json({ message: "UPDATE !" }); 
 });

// Route pour recevoir des données en POST
app.post('/envoyer-donnees', (req, res) => {
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

module.exports = app;