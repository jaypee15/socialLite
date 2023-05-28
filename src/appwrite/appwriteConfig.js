import {Client, Account, Databases} from 'appwrite'


const client = new Client();
const databaseId = "646e217906da20ec76b9";

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646e214b79f3833cb411');

// account 
export const account = new Account(client)

// database
export const database = new Databases(client, databaseId)