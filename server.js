const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const fs = require('fs')
const XLSX = require('xlsx');
var bodyParser  =  require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//PARASING FILE
var workbook = XLSX.readFile('Case_study_excel_format.xlsx');
let output = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1, {header:'1'});
//GETING WEIGHT
const weightKeys = Object.keys(output[0]);
let slicedWeight = weightKeys.slice(weightKeys.indexOf('below\r\n(<2kg)'),weightKeys.length)

//GETING DIRECTION From
let targetKey = 'To / From';
const directionsArray = output.map(e=>Object.values(e)[1])




function calculatePrice(goTo,weightIndex){
  let target_arr = output.filter(e=>{if(Object.values(e)[1]===goTo){return e}})
  let pricesArray = Object.values(target_arr[0]).slice(3,Object.values(target_arr[0]).length);
  if(goTo==='CZ'){return pricesArray[0]}
  let deliveryPrice = pricesArray[weightIndex];
  console.log(deliveryPrice);
  return deliveryPrice;
}

const jsonMainObject = {
  weight:slicedWeight,
  directions:directionsArray
}


//CREATING ENDPOINTS

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(data)
})

app.get('/weightOptions', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(jsonMainObject)
})

app.post('/post_data', (req, res) => {
  let query=req.body;
  let whereToGo = query.whereToGo;
  let weightIndex = query.weightIndex;
  console.log(whereToGo,weightIndex);
  let calculatedPrice = calculatePrice(whereToGo,weightIndex);
  let resData = calculatedPrice.toString();


  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end("Your price is going to be "+resData+' €')



  //res.send(data)
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
