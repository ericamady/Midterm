import express from "express";
import{getAllItems, getItem, createItem, updateItem, deleteItem} 
from "../controller/itemController.js";
 
import{ 
    checkItem,
    validateItemBody,

} from "../middleware/itemMiddleware.js"
const router = express.Router();
router.param("id", checkItem);
router.route("/").get(getAllItems).post(validateItemBody, createItem);
router
.route("/:id")
.get(getItem)
.patch(validateItemBody,updateItem)
.delete(deleteItem);
export default router;