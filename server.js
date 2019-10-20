require('dotenv/config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const Router = require('./src/Routes/index');

const server = express();
const portServer = 3306;
const port = process.env.PORT || portServer;
const nodeEnv = 'Development';


server.listen(port, ()=>{
	console.log(`Server is running in port ${port} in ${nodeEnv} Node`);
});

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

server.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*'); //All client
	res.header('Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	if(req.methode==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT,POST, PATCH, DELETE, GET');
		return form.success(res,200, response)	
	}
	next();
})


server.use('/', Router);

module.exports = server;