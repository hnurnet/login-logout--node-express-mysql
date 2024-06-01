import expresss from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { decode } from "jsonwebtoken";
import db from "./database/db.js";


const app = expresss();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
    credentials: true
}));
app.use(expresss.json());
app.use(cookieParser());

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({message: "We need token please provide it!"})
    }
    else{
        jwt.verify(token, "our-jsonwebtoken-secret-key",(err,decoded) =>{
            if(err){
                return res.json({message: "Authentication Error."})
            }
            else{
                req.name = decoded.name;
                next()
            }
        })
    }
}

app.get("/", verifyUser,(req,res) => {
    return res.json({status: "Success", name:req.name});
})


app.post('/login', (req,res) => {
    const sql = "select * from login where email = ? and password = ?";
    db.query(sql,[req.body.email,req.body.password], (err,data) => {
        if(err) return res.json({message: "Server Side Error!"});
        if(data.length > 0){
            const name = data[0].name;
            const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {
                expiresIn: '1d'
            }); 
            res.cookie('token', token);
            return res.json({status: "Success"})
        }
        else {
            return res.json({message: "No Record Existed!"});
        }
    })
});


app.get("/logout", (req,res) => {
    res.clearCookie("token")
    return res.json({status: "Success"})

})












app.listen(8800, () => console.log("Server connected on port 8800!"))