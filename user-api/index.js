const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());
const getUsersData = () => {
  const data = fs.readFileSync('users.json');
  return JSON.parse(data);
};

app.get('/', (req, res) => {
  res.send('Hello, this is the User API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users', (req, res) => {
  const users = getUsersData();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = getUsersData();
  const userId = req.params.id;
  const user = Object.values(users).find(u => u.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('No users found');
  }
});

app.get('/users/profession/:profession', (req, res) => {
  const users = getUsersData();
  const profession = req.params.profession.toLowerCase();
  const filteredUsers = Object.values(users).filter(
    u => u.profession.toLowerCase() === profession
  );
  if (filteredUsers.length > 0) {
    res.json(filteredUsers);
  } else {
    res.status(404).send('No users found');
  }
});

app.get('/users/name/:name', (req, res) => {
  const users = getUsersData();
  const name = req.params.name.toLowerCase();
  const user = Object.values(users).find(
    u => u.name.toLowerCase() === name
  );
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('No users found');
  }
});

