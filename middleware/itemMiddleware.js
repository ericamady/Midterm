import { ObjectId } from "mongodb";
import { getItemsCollection } from "../data/mongoClient.js";   

export async function checkItem(req, res, next, value){
try{
const {id} = req.params;
if(!ObjectId.isValid(id)){
    return res.status(400).json({
        status:"fail",
        message:"Invalid item ID",
    });
}
const item = await getItemsCollection().findOne({
    _id: new ObjectId(id),
});
if(!item){
    return res.status(404).json({
        status:"fail",
        message:"Item not found!",
    })
}

req.item = item;
next();

}catch(error){
    next(error);
    }
}
export function validateItemBody(req, res, next){
    const isCreate = req.method === "POST";
    const {name, category, price} = req.body;

    if(isCreate && (!name || !category || price === undefined)){
        return res.status(400).json({
            status:"fail",
            message:"name, category and price are required", 
            });
        }

        if(price !== undefined){
            const numericPrice = Number(price);
            if (Number.isNaN(numericPrice)|| numericPrice < 0){
                return res.status(400).json({
            status:"fail",
            message:"Price must be a non-negative number.", 
            });
            }
        }
        next();
}