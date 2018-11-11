const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

const serverPort = 3001;

app.use(cors());

app.get('/api/products', function (req, res) {
    res.sendFile(__dirname + '/src/static/data/goods.json');
});

app.get('/api/products/:id', function (req, respond) {
    axios.get('http://localhost:3001/api/products')
        .then((res) => {
            let {products} = res.data;
            let resArr = products.filter((product) => product.id == req.params.id);
            if (resArr.length == 0) throw new Error('No data found!!!');
            respond.json(resArr[0]);
        })
        .catch(err => {
            respond.send('Error: No data found!!!');
            console.log('Error ' + err.message);
        });
});

app.use('*', function (req, res) {
    res.redirect('/api/products');
});


app.listen(serverPort);
console.log(`API server was runned at ${serverPort}.`);
