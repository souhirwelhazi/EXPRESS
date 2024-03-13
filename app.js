const express = require('express');
const app = express();


const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); 
  const hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); 
  } else {
    res.send('Désolé, le site n\'est disponible que pendant les heures de travail (lundi-vendredi, 9h-17h)');
  }
};


app.use(express.static('public'));


app.use(checkWorkingHours);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});


app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
