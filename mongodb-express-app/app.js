require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const colorButtonsRoute = require('./routes/colorButtons');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Atlas Error:', err));

app.use(express.json());
app.use('/', colorButtonsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
