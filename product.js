
const { getDatabase, ObjectId } = require('./db');

const collectionName = 'toy';

async function getProducts() {
  const db = await getDatabase();
  return db.collection(collectionName).find().toArray();
}

async function createProduct(item) {
  const db = await getDatabase();
  const result = await db.collection(collectionName).insertOne(item);
  return result;
}

//delete
async function deleteProduct(_id) {
  const db = await getDatabase();
  const query = { id: ObjectId(_id) };
  await db.collection(collectionName).deleteOne(query);
}

//end delete


module.exports = { getProducts, createProduct, deleteProduct };



