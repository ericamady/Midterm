import {readFileSync} from "node:fs";
import{writeFile} from "node:fs/promises";
export const itemsUrl = new URL("../data/items.json", import.meta.url);
export const items =  JSON.parse(readFileSync(itemsUrl, "utf8"));

export function findItemById(id){
    return items.find((item)=> item.id === id)
}

export function getNextItemId(){
    if(items.length === 0) return 1;
    return Math.max(...items.map((item)=> item.id)) +1;
}

export async function saveItems(){
    await writeFile(itemsUrl, JSON.stringify(items, null, 2), 
"utf8");
}