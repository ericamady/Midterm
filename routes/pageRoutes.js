import express from "express";
import fs from "node:fs/promises"
import path from "node:path";
import {fileURLToPath} from "node:url";
import { items } from "../data/itemStore.js";
import { fillTemplate } from "../module/fillTemplate.js";

const router= express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pageRoot = path.resolve(__dirname, "..");

//Display cards
router.get("/", async(req, res, next)=>{
    try{
        const indexTemplate = await fs.readFile(
            path.join(pageRoot, "public", "templates", "index.html"), "utf8"
        );
        const cardTemplate = await fs.readFile(
            path.join(pageRoot, "public","templates", "card.html"), "utf8"
        );
       
        const cardHtml = items.map(item => fillTemplate(cardTemplate, item)).join("");
        const mainPage = indexTemplate.replace(
            /\{\{PRODUCT_CARDS\}\}/g,
            cardHtml
        );
        res.status(200).type("html").send(mainPage);
    }catch(error){
        next(error);
    }
});

//product page
router.get("/item", async (req, res, next)=>{
    try{
    const rawId = req.query.id;
    if(rawId === undefined){
        return res.status(400).send("<h1>Missing product id</h1>");
    }

    //convert to a number
    const id = Number(rawId);
    const item = items.find(item => item.id === id);
    if (!item){
        return res.status(404).send("<h1>Item not found</h1>");

    }
     const itemDetail = await fs.readFile(
             path.join(pageRoot, "public","templates", "itemDetail.html"), "utf8"
        );
const detailPage = fillTemplate(itemDetail, item)
return res.status(200).type("html").send(detailPage);
    }catch(error){
        next(error)
    }

    
   
})
export default router;