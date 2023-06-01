import {Client, Account, Databases} from 'appwrite'


const client = new Client();
const databaseId = process.env.REACT_APP_DATABASE_ID;
const collectionId = process.env.REACT_APP_COLLECTION_ID;

client
    .setEndpoint(process.env.REACT_APP_SET_ENDPOINT)
    .setProject(process.env.REACT_APP_SET_PROJECT);

// account 
export const account = new Account(client)

// database
export const database = new Databases(client, databaseId)

//posts 
const posts = await database.listDocuments(databaseId, collectionId)