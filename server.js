let express=require("express")
let {Client}=require("pg")
let cors=require("cors")
let app=express()
const client=new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"Arduino1",
    database:"airlinemanagement"
})
client.connect();
app.use(cors())
app.get("/flights",(req,res)=>{
    const search = req.query.search;
    const fromid=req.query.from;
    const seatclass=req.query.seatclass
    const tickets=req.query.tickets
    console.log(tickets,seatclass)
    let setedclass=""
    if(seatclass=="business"){  
        setedclass=" and busseats >"
    }
    if(seatclass=="Economy"){
        setedclass=" and ecoseats >"
    }
    if(seatclass=="first"){
        setedclass=" and firstseats >"
    }
    let query;
    console.log(search,fromid)
    if(search!="null" && fromid==undefined){
        query="select * from flights where dest_id="+search
    }
    else if(search!="null" && fromid!="null"){
        query="select * from flights where dest_id="+search+" and from_id="+fromid+setedclass+tickets
        console.log(query)
    }
    else{
        query="select * from flights"
    }
    client.query(query,(err,result)=>{
        if(!err){
            res.json(result.rows)
        }else{
            res.json(err.message)
        }
        client.end
    })
})
app.get("/airport",(req,res)=>{
    client.query("select * from airport",(err,result)=>{
        if(!err){
            res.json(result.rows)
        }else{
            res.json(err.message)
        }
    client.end
    })
})
app.listen(8000,()=>{
    console.log("Listening")
})