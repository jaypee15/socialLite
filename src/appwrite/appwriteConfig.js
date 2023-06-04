import {Client, Account, Databases, Functions, ID} from 'appwrite'


const client = new Client();
const databaseId = process.env.REACT_APP_DATABASE_ID;
const collectionId = process.env.REACT_APP_COLLECTION_ID;



client
    .setEndpoint(process.env.REACT_APP_SET_ENDPOINT)
    .setProject(process.env.REACT_APP_SET_PROJECT);

// account 
export const account = new Account(client)

// database
export const databases = new Databases(client, databaseId)

//posts 
export const posts = await databases.listDocuments(databaseId, collectionId)

//functions 
export const functions = new Functions(Client);

//id
export const id = ID