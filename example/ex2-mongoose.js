const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MUUID = require('../lib');

const url = 'mongodb://localhost/my_mongoose';
mongoose.connect(url, { useNewUrlParser: true });

const kittySchema = new mongoose.Schema({
  _id: Schema.Types.Mixed,
  name: String,
});

const Kitten = mongoose.model('Kitten', kittySchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// 1. Create new kitten with UUID _id
var silence = new Kitten({ _id: MUUID.v1(), name: 'Silence' });

// 2. Save the new kitten to the database
silence.save(function(err, kitten) {
  if (err) return console.error(err);
  console.log('inserted kitten with id', MUUID.from(kitten._id).toString());

  // 3. Fetch the new kitten from the database
  Kitten.findOne({ _id: kitten._id }, function(err, kitten) {
    if (err) return console.error(err);
    console.log('found kitten    with id', MUUID.from(kitten._id).toString());
    db.close();
  });
});