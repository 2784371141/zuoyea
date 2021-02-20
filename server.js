//引入模块
const url = require("url");
const express = require("express");
let app = express();
const body_parser = require("body-parser");
app.use(
  body_parser.urlencoded({
    extended: false,
  })
);
//跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
//连接数据库
let mongoose = require("mongoose");
const { query } = require("express");
mongoose
  .connect("mongodb://localhost/zsgcdl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("连接数据库成功");
  })
  .catch((err) => {
    console.log(err);
  });
  //设立规则
const ruleSchema = new mongoose.Schema({
    username: String,
    age:String,
    phone:String,
    qq:String   
  });
  // 创建集合
  const jihe = mongoose.model("zsgc", ruleSchema);
  //show函数的接口
  app.get("/show",(req,res)=>{
      jihe.find().then(data=>{
          res.send(data);
      })
  })
  //增加的接口
  app.get("/add", (req, res) => {
    jihe.create(req.query).then((data) => {
      data
        ? res.send({status: 1, msg: "添加成功"})
        : res.send({status: 0, msg: "添加失败"});
    });
  });
  //删除的接口
  app.get("/del",(req,res)=>{
      jihe.findOneAndDelete({_id:req.query.id}).then(data=>{
        data?res.send({status:1,msg:"删除成功"}):res.send({status:0,msg:"删除失败"})
    })
  })
  //反显
  app.get("/gai",(req,res)=>{
      jihe.find({_id:req.query.id}).then(data=>{
          res.send(data)
      })
  })
  //确修
  app.get("/quexiu",(req,res)=>{
      jihe.updateOne({_id:req.query.id},{
          username : req.query.username,
          age:req.query.age,
          phone:req.query.phone,
          qq:req.query.qq
      }).then(data=>{
          data.ok==1?res.send({status:1,msg:"修改成功"}):res.send({stasus:0,msg:"修改失败"})
      })
  })
  //监听
  app.listen("1314",()=>{
      console.log("欢迎访问1314服务器");
  })