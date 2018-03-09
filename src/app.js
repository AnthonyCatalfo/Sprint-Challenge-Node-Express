var express = require('express');
const fetch = require("node-fetch");

var app = express();
const urlYesterday = "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";
const urlToday = "https://api.coindesk.com/v1/bpi/currentprice.json";


app.get('/compare', (req, res) => {

    fetch(urlYesterday)
        .then(response => {
            response.json().then(json => {
                console.log(Object.values(json.bpi)[0])
                let yesterdayPrice = Object.values(json.bpi)[0];


                fetch(urlToday)
                    .then(response => {
                        response.json().then(json => {
                            let todayPrice = json.bpi.USD.rate_float
                            console.log(todayPrice)
                            let diff = todayPrice - yesterdayPrice
                            console.log(diff)
                            res.send({today: todayPrice, yesterday:yesterdayPrice ,diff:diff})
                        });
                    }).catch(err =>{
                        console.log(err);
                    });
            });
        });

}

);

app.listen(3050);
console.log('Listening on port 3050...');