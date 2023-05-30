import {Client, Account, Databases} from 'appwrite'


const client = new Client();
const databaseId = "646e217906da20ec76b9";
const collectionId = "6473c4e017d4b20f0d02"

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646e214b79f3833cb411');;

// account 
export const account = new Account(client)

// database
export const database = new Databases(client, databaseId)

//posts 
const posts = await database.listDocuments(databaseId, collectionId)