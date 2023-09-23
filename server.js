const Express=require("express");
const app=Express();
const bodyParser=require("body-parser");
const {MongoClient}=require("mongodb");
const Cors=require("cors");
app.use(Cors({origin:'*',credentials:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const uri="mongodb+srv://ronitsharma3870:ashu6608@cluster0.rtstlsp.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(uri);
let UserconnectDB,ProductconnectDB;
async function Connect(){
    try{
        await client.connect();
         UserconnectDB= client.db("Users");
        console.log("Connceted to UserDB server!");
         ProductconnectDB= client.db("fruits");
        console.log("Connceted to ProductDB server!");
        }
        catch(e){
            console.log("!!error connecting to MongoDB!!");
        }
       
}
Connect();

app.post("/loginVerification",async (req,res)=>{
    const {Username,Password}=req.body;
    const collection=UserconnectDB.collection("User-info");
    const f=collection.find();
    const arr=await f.toArray();
    var c=0;
    arr.forEach((e)=>{
        if(e.email===Username && e.Password===Password){
        res.json({"LoginStatus":true});
        c++;
        }
    });
    if(c===0)
    res.json({"LoginStatus":false});

});

app.post("/Signup",async (req,res)=>{
    const {_id,FullName,email,Password}=req.body;
    const collection=UserconnectDB.collection("User-info");
    const f=collection.find();
    const arr=await f.toArray();
    var x=0;
    arr.forEach((e)=>{
        if(e.email===email){
            x++;
        res.json({"Status":"Email ID already taken"});
        }
    });
    if(x===0)
    {
        const insert=await collection.insertOne(req.body);
        res.json({"Status":true});
    }
});

app.get("/productData",async (req,res)=>{
    const collection=ProductconnectDB.collection("cart");
    const f=collection.find();
    const arr=await f.toArray();
    res.json(arr);
});


app.listen(5000,()=>{
    console.log("Backend is running on port 4000");
})
