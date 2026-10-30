
import { getItemsCollection } from "../data/mongoClient.js";
import slugify from "slugify";
//CRUD Functions
export async function getAllItems(req, res, next){
    try{
        const items = await getItemsCollection().find({}).toArray();
        res.status(200).json({
        status: 'success',
        results: items.length,
        requestedAt: req.requestTime,
        data:{items},
        
    });

    } catch(error){
        next(error);
    }
    
}

export function getItem(req, res){
    res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {item: req.item},
    
    });
}
// calls function from productStore
export async function createItem(req, res, next){
    try{
        const items = getItemsCollection();
            const newItem ={
            name:req.body.name,
            slug:slugify(req.body.name,{
                lower:true,
                strict:true
            }),
            category: req.body.category ?? "",
            price: Number(req.body.price),
            image: req.body.image
          
        };
        const result = await items.insertOne(newItem);
        const createItem = await items.findOne({
            _id: result.insertedId,
        });

       
        res.status(201).json({
            status:"success",
            data: {item: createItem},
        });
    }catch(error){
        next(error);
    }
}

export async function updateItem(req, res, next){
    try{
     const updates = {...req.body}
     delete updates._id;
     if(updates.price !== undefined){
        updates.price = Number(updates.price);
     }
     await getItemsCollection().updateOne(
        {_id:req.item._id},
        {$set:updates},
     );

     const updateItem = await getItemsCollection().findOne({
        _id: req.item._id,
     });
     res.status(200).json({
         status: "Success",
         data: {item: updateItem},
     });

    }catch(error){
        next(error);
    }
}


export async function deleteItem(req, res, next){
    try{
      await getItemsCollection().deleteOne({
        _id: req.item._id,
      });

        res.status(204).send();
    }catch(error){
        next(error);
    }
}