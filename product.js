const { getDatabase } = require('./db');

const collectionName = 'toy';

async function getProducts() {
  const db = await getDatabase();
  return await db.collection(collectionName).find().toArray();
}

async function createProduct(item) {
  const db = getDatabase();
  const result = await db.collection(collectionName).insertOne(item);
  return result;
}

module.exports = { getProducts, createProduct, };
