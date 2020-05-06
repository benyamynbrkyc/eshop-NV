const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db/db');
const postRoutes = require('./routes/post.route');
const pageRoutes = require('./routes/page.route');
const Grid = require('gridfs-stream');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }, (err, database) => {
  if (err)
    console.log(
      'MongoDB Connection error. Please make sure that MongoDB is running.'
    );
  else console.log('Connection succeeded');
});

Grid.mongo = mongoose.mongo;
let connection = mongoose.connection;
let gfs;

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', () => {
  gfs = Grid(connection.db);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', postRoutes);
app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
