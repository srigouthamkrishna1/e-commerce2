const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require('./config/db');
const router=require('./routes')
const cookieparser=require('cookie-parser')



const app=express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}
))
app.use(express.json())
app.use(cookieparser())




app.use('/api',router)

const PORT=process.env.PORT


connectDB().then(()=>{
    console.log('connected to database')
    app.listen(PORT,()=>{
        console.log('server is running')
    })
})

