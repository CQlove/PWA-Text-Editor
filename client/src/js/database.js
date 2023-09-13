import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('PUT to the database');
  // use openB get into jate database version 1 
  const jateDb = await openDB('jate', 1);
  // created a read and write transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // open jate object store
  const store = tx.objectStore('jate');
  // using put method to pass data(id and value) into request
  const request = store.put({ value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


export const getDb = async () => {
  console.log('GET all content from the database');
  // use openB get into jate database version 1 
  const jateDb = await openDB('jate', 1);
  // created a read transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // open jate object store
  const store = tx.objectStore('jate');
  // using getAll method to get data into request
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  // add .value to get back so that app will show the stored data
  return result.value;
};

initdb();
