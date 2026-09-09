// server/app.js
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

// middleware(pomocne mezikroky)
app.use(cors());
app.use(express.json());

//testovaci trase(route/endpoint)
app.get('/health',(req,res)=>{
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, ()=>{
    console.log(`[Server] server je na portu: http://localhost:${PORT}`);

});