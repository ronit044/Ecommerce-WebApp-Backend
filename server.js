const Express=require("express");
const app=Express();
const bodyParser=require("body-parser");
const {MongoClient}=require("mongodb");
const Cors=require("cors");
const UserconnectDB = require("./MongoDB/userDBConnect");
const ProductconnectDB = require("./MongoDB/ProductDBConnect");
app.use(Cors({origin:"http://localhost:3000",credentials:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.get("/logInData",async (req,res)=>{
//     const db=await connectDB;
//     const collection=db.collection("User-info");
//     const f=collection.find();
//     const arr=await f.toArray();
//     res.json(arr);
// })

app.post("/loginVerification",async (req,res)=>{
    const {Username,Password}=req.body;
    const db=await UserconnectDB;
    const collection=db.collection("User-info");
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
    const db=await UserconnectDB;
    const collection=db.collection("User-info");
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
    const db=await ProductconnectDB;
    const collection=db.collection("cart");
    const f=collection.find();
    const arr=await f.toArray();
    res.json(arr);
});


app.listen(4000,()=>{
    console.log("Backend is running on port 4000");
})