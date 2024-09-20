// init project
var express = require('express');
var app = express();
const service = require('./service.js')


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",function(req,res){
    let param = req.params.date;
    
  if(param){
    if(typeof(param)=="string" && !Date.parse(param))
    {
      param = parseInt(param,10);
    }
    
    let date = new Date(param);
    
    if(!isNaN(date))
    {
      var currentTime = date.getTime();
      var currentUTC = date.toUTCString();
      data = {
        unix : currentTime,
        utc  : currentUTC
      }
      res.json(data)
    }
    else{
      res.json({error: "Invalid Date"});
      }
    }
  
  else
  {
    var date = new Date();
    var currentTime = date.getTime();
    var currentUTC = date.toUTCString();
    res.json({unix : currentTime, utc : currentUTC });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
