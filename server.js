import app from "./app.js"
import { connectDatabase } from "./data/mongoClient.js";
const PORT = 3000;

async function startServer(){
    try{
        await connectDatabase();
        app.listen(PORT, ()=>{
        console.log(`Server running at http://localhost:${PORT}`);
});
    }catch(error){
        console.error("Could not start the application:", error.message);
        process.exit(1);

    }
}

startServer();