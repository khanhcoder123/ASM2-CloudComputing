const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://khanhnqbh00114:khanh123@cluster0.m27xh35.mongodb.net/';
const dbName = 'products';

let db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectToDatabase, getDatabase };
