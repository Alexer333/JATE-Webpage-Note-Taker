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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put into database!");
  const jateDb = await openDB("jate", 1);
  const jx = jateDb.transaction("jate", "readwrite");
  const store = jx.objectStore("jate");
  const request = store.put({ id: 1, value:content});

  const result = await request;

  if(result !== undefined) {
    console.log("Data has been saved to the database; ID:", result);

    const savedData = await store.get(result);
    console.log("Saved Data:", savedData.value);
    return savedData.value;
  } else {
    console.log("Whoops! Data not saved!");
  }
  return null;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
