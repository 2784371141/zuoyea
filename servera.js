const express = require("express")
const app = express()
//跨域
app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();  
});
//数据库
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/dengzsgc",{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("数据库连接成功");
}).catch((err)=>{
    console.log(err);
})
//设立规则
const ruleSchema = new mongoose.Schema({
    username: String,
    password:String
  });
  // 创建集合
  const jihe = mongoose.model("jihe", ruleSchema);
//注册接口
app.get("/zhuce",(req,res)=>{
    jihe.create(req.query).then(data=>{
        // console.log(data);
        data?res.send({status:0,msg:"注册成功"}):res.send({status:1,msg:"注册失败"})
    })
})
//登录接口
app.get("/login",(req,res)=>{
    jihe.find({username:req.query.username,password:req.query.password}).then(data=>{
        data?res.end("添加成功"):res.end("添加失败")
})
})
//监听
app.listen("1314",()=>{
    console.log("欢迎访问1314服务器");
})