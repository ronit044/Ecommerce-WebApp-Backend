const {MongoClient}=require("mongodb");
const uri="mongodb+srv://ronitsharma3870:ashu6608@cluster0.rtstlsp.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(uri,{useUnifiedTopology: true});

async function connectDB(){
    try{
    await client.connect();
    console.log("Connceted to ProductDB server!");
    return client.db("fruits");
    }
    catch(e){
        console.log("!!error connecting to ProductDB!!");
    }
   
}

module.exports = connectDB();