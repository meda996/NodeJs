const createError = require('http-errors');
const express = require('express')
const port = 3001
const mongoose = require('mongoose')
const path = require('path');
const config = require('./config');
const cors = require('cors');

const ingredientsRouter = require('./routes/ingredientsRouter');

mongoose.connect(
    'mongodb+srv://petar:'+config.ATLAS_PW+'@cluster0.7b35g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/ingredients', ingredientsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.use(function(req, res, next) {
    next(createError(404));
  });
  
  app.use(function(err, req, res, next) {
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

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })