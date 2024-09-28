const express = require("express")
const app = express();
const usermodel = require("./connection")
app.use(express.json());

app.listen(4000,()=>{
  console.log("server listining on port on 4000");
})

// post request to sand data in data-base
app.post("/register",async(req,res)=>{
  const {name}=req.body;
  const data = await usermodel.create({name:name})
  res.send(data);
})

app.get("/getuserdata",async(req,res)=>{
  const userdata = await usermodel.find();
  return res.status(200).send(userdata);
})

app.get("/getuserdatabyid/:id",async(req,res)=>{
  const {id}=req.params;
  const userdata = await usermodel.findById(id)
  return res.status(200).send(userdata)
})

app.get("/getsingleuserdata",async(req,res)=>{
  const {name}=req.body;
  const userdata = await usermodel.findOne({name:name})
  return res.status(200).send(userdata)
})

app.put("/updateuserdata/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const {email,password}=req.body;
    const data = await usermodel.findByIdAndUpdate({_id:id},{email,password},{new:true})
    return res.status(200).setDefaultEncoding(data)
  }catch (error){
    return res.status(500).send(error.massage);
  }
})

app.put("/updateuserdata",async(req,res)=>{
  try{
    const {email,password,id,name}=req.body;
    const data = await usermodel.findByIdAndUpdate({_id:id},{email,password},{new:true})
    return res.status(200).send(data)
  }catch (error){
    return res.status(500).send(error.massage);
  }
})

app.delete("/deleteuserbyid/:id",async(req,res)=>{

try {


   const data = await usermodel.findByIdAndDelete({_id:req.params.id});
   return res.statuS(200).send(data);
} catch (error) {
    return res.sendStatus(500).send(error); 
}

})

app.delete("/deleteuserbyid",async(req,res)=>{
  const {name}=req.body;

  try {
     const data = await usermodel.findOneAndDelete({name:name});
     return res.statuS(200).send(data);
  } catch (error) {
      return res.sendStatus(500).send(error);  
  }
  })

  app.post("/postdata",async(req,res)=>{
    const {name,email,password,date}=req.body;
    const newdate = new Date(date);
    const data = await usermodel.create({name,email,password,date:newdate});
    return res.status(200).send(data);
  })

  // app.get("/advanceserch", async(req,res)=>{
  //   const data = await usermodel.find({}).limit(3).sort({date:1});
  //   return res.status(200).send({data:data});
  // })
  app.get("/advanceserch", async(req,res)=>{
    const data = await usermodel.find({name:"bhart"});
    return res.status(200).send({data:data});
  }) 

  app.get("/andoperator", async(req,res)=>{
    const {name, email}=req.body;
    const data = await usermodel.findOne({$and:[{name:name},{email:email}]});
    if(data){
      return res.send(data);
    }
    else{
      return res.send("no data found")
    }
  })

  app.get("/oroperator", async(req,res)=>{
    const {name, email}=req.body;
    const data = await usermodel.findOne({$or:[{name:name},{email:email}]});
    if(data){
      return res.send(data);
    }
    else{
      return res.send("no data found")
    }
  })

  app.get("/oprator", async(req,res)=>{
    const {date}= req.body;
    const newdate = new Date(date);
    const data = await usermodel.find({ date : {$gte : newdate } })
    return res.status(200).send(data);
  })

  app.get("/pagination",async(req,res)=>{
    const page = req.query.page || 0;
    const perpage = 3;
    const users=[];
    const data = await usermodel.find().skip()(page * prepage).limit(4)
    data.forEach(user => users.push(user))
    return res.status(200).send(users);
  }) 

app.get("/existoperator",async(req,res)=>{
const data = await usermodel.find({email:{$exists:false}})
return res.status(200).send(data);
})

app.get("/postdata",async(req,res)=>{
  const data = await usermodel.insertMany([
    {category : "food", budget: 400, spent:450},
    {category : "drinks", budget: 121, spent:150},
    {category : "clothes", budget: 113, spent:50},
    {category : "misc", budget: 513, spent:300},
    {category : "travel", budget: 200, spent:650},

  ])
  return res.send(data)
})

app.get("/exproperator",async(req,res)=>{
  const data = await usermodel.find({$expr:{$lt:["$spent", "$budget"]}})
  return res.send(data);
})  

app.get("/modoperator",async(req,res)=>{
  const data = await usermodel.find({budget : {$mod:[4 , 0]}})
  return res.send(data);
})

app.get("/regex", async(req,res)=>{
  const data = await usermodel.find({category: {$regex:/^d/}})
  return res.send(data);m
})

