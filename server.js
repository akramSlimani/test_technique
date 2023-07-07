const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 27017; 

let db;

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

client.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    process.exit(1);
  }

  console.log('Connecté à la base de données MongoDB');
  db = client.db('dbtest');
});

app.get('/api/produits', (req, res) => {
  db.collection('produits').find({}).toArray((err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
      return;
    }

    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
