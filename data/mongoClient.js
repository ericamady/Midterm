import {MongoClient} from "mongodb";

let client;
let database;

export async function connectDatabase (){
const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const databaseName = process.env.MONGODB_DB ?? "items_store";

client = new MongoClient(uri);
await client.connect();

database = client.db(databaseName);
await database.command({ping: 1});

console.log(`Connect to MongoDB database: ${databaseName}`)
}

export function getItemsCollection(){
if(!database){
    throw new Error("MongoDB is not connected yet.")
}
return database.collection("items");

}
export async function closeDatabase(){
    if(client){
        await client.close();
    }
}