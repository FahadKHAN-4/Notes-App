const connectToMongo = require('./db');
const express = require('express'); 

//MongoDB
connectToMongo();

//Express
const app = express(); 
const PORT = 3000; 

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res)=>{ 
// 	res.status(200); 
// 	res.send("Welcome to root URL of Server"); 
// }); 

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT);
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
