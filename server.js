const express = require('express');
const bodyParser= require('body-parser');
const axios= require('axios');
const ejs = require('ejs');
const { response } = require('express');
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); 

app.set('view engine', ejs);
app.get('/', function(request, response){
    let url = `https://api.thevirustracker.com/free-api?countryTimeline=EE`;

    axios.get(url)
    .then(function(res){

        //console.log(response.data);

        let coronaObject = res.data.timelineitems;
        let arrKeys = Object.keys(coronaObject[0]);
        let firstItem = coronaObject[0][arrKeys[0]]; 
        //console.log(coronaObject[0]);
        let lastItem = coronaObject[0][arrKeys[arrKeys.length-2]];

        console.log(firstItem);
        console.log(lastItem);

        //object
        let data = {
            firstDay : arrKeys[0],
            firstDayData : firstItem,
            lastDay : arrKeys[arrKeys.length-2],
            lastDayData : lastItem
        };

        response.render("index.ejs", {corona: data})
        
    })
    .catch(function(error){
        console.log(error);
    });
});

app.post('/', (req, res) => {
    let corona= req.body.currency;
    let url = `https://api.thevirustracker.com/free-api?countryTimeline=EE`;

    console.log(corona);
    axios.get(url)
    .then(function(response){

        //console.log(response.data);

        let coronaObject = response.data.timelineitems;
        console.log(coronaObject[0]);
        res.render("index.ejs", {corona: coronaObject})
        
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});