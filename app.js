const createError = require('http-errors');
const express = require('express')
const port = process.env.PORT;
const mongoose = require('mongoose')
const path = require('path');
const config = require('./config');
const cors = require('cors');
const que = require('./que');
let startTime = Date.now();
const fs = require('fs');

let rawdata2 = fs.readFileSync('./que.json');
let queTime = JSON.parse(rawdata2);
const timeLeft = queTime.timeLeft;

if(timeLeft < 20000){
    que.fillQue(timeLeft);
}

const ingredientsRouter = require('./routes/ingredientsRouter');
const orderRouter = require('./routes/orderRouter');
const adminRouter = require('./routes/adminRouter');

mongoose.connect(
  'mongodb+srv://petar:' + config.ATLAS_PW + '@cluster0.7b35g.mongodb.net/spartans?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/ingredients', ingredientsRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
      stack: err.stack,
    },
  });
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

setInterval(() => server.getConnections(
  (err, connections) => {  }
), 1000);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});


function shutDown() {
  const data = JSON.stringify({upTime: Date.now() - startTime});
  fs.writeFileSync('state.json', data)


  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}