const express = require('express')
const uuid = require('uuid');
const request = require('request');
const path = require('path')
const fs = require('fs');

const app = express()
app.use(express.json());

const port = 3000

app.get('/hello', (req, res) => {
  res.send("hello")
})

app.post('/cache', (req, res) => {
    const id = uuid.v4()
    request.get(req.body.url, { }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body);
      fs.writeFile(id, body, (err) => { console.log(err)})
    });
    res.send({id:id})
})

app.get('/:id', (req, res) => {
  const id = req.params['id']
  fs.readFile(id, (err, data) => {res.send(data)})
  console.log(id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})