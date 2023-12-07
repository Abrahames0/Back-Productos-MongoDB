const mongoose = require('mongoose');

mongoose
 .connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(() => {
   console.log('Conectado a MongoDB');
 })
 .catch((err) => {
   console.log(err);
 });

module.exports = mongoose;
