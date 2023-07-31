const { getDatabase } = require('./db');

const collectionName = 'products';

async function getProducts() {
  const db = getDatabase();
  return db.collection(collectionName).find().toArray();
}

async function createProduct(item) {
  const db = getDatabase();
  const result = await db.collection(collectionName).insertOne(item);
  return result;
}

module.exports = { getProducts, createProduct, };
