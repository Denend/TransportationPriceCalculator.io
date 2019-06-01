const selectWeightElem = document.getElementById('selectWeightElem')
const selectWhereElem = document.getElementById('selectWhereElem')
const selectFromElem = document.getElementById('selectFromElem')
url = 'http://localhost:3000'
document.getElementById('switchButton').addEventListener('click',switchDirections,false);
document.getElementById('submitButton').addEventListener('click',submitData,false);
selectWhereElem.addEventListener('change', validateSelects, false);
selectFromElem.addEventListener('change', validateSelects, false);

function reqListener () {
  let responce = this.responseText
  responce.split("\n").forEach((e,i)=>{
     console.log(i + " " + e)
   });
}

function mapToSelects () {
  //Map weight
  let resp = this.responseText;
  let parsedWeight = JSON.parse(resp).weight;
  console.log(parsedWeight);
  console.log(Array.isArray(JSON.parse(resp)));
  parsedWeight.forEach(e=>{
    let option = document.createElement('OPTION');
    option.innerHTML = e;
    selectWeightElem.appendChild(option);
  })

  //Map directions

  let parsedDirections = JSON.parse(resp).directions;
  console.log(parsedDirections);
  console.log(Array.isArray(JSON.parse(resp)));
  parsedDirections.forEach(e=>{
    let option = document.createElement('OPTION');
    let option1 = document.createElement('OPTION');
    option.innerHTML = e;
    option1.innerHTML = e;
    selectFromElem.appendChild(option1);
    selectWhereElem.appendChild(option);
  })

}


function validateSelects(evt){

  console.log(evt.target.options[evt.target.selectedIndex].innerHTML)
  if(evt.target.options[evt.target.selectedIndex].innerHTML !== 'CZ'){
    if(evt.target.id==='selectWhereElem'){
      selectFromElem.innerHTML=''
      let option1 = document.createElement('OPTION');
      option1.innerHTML = 'CZ';
      selectFromElem.appendChild(option1);
    }else if(evt.target.id==='selectFromElem'){

      selectWhereElem.innerHTML='';
      let option = document.createElement('OPTION');
      option.innerHTML = 'CZ';
      selectWhereElem.appendChild(option);

  }
  }
}

function switchDirections(){
  let whereInsights = selectWhereElem.innerHTML;
  selectWhereElem.innerHTML = selectFromElem.innerHTML;
  selectFromElem.innerHTML = whereInsights;
}

var oReq1 = new XMLHttpRequest();
oReq1.addEventListener("load", mapToSelects);
oReq1.open("GET", url+"/weightOptions");
oReq1.send();

const testObj = {
  ya:'lol',
  degrad:'yep'
}
function submitData(){
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url+"/post_data", true);
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
      console.log(this.responseText);
      document.getElementById('deliveryPrice').innerHTML= this.responseText;
  };
  //selectWhereElem.options[selectWhereElem.selectedIndex].innerHTML
  let finalWeightIndex = selectWeightElem.selectedIndex-1;
  let from = selectFromElem.options[selectFromElem.selectedIndex].innerHTML;
  let where = selectWhereElem.options[selectWhereElem.selectedIndex].innerHTML;
  let whereToGo = (from==='CZ')?where:from;
  console.log(whereToGo);
  if(from==='---'||where==='---'||finalWeightIndex==-1){alert('please fill out all the forms');
  } else {

    xhr.send(`weightIndex=${finalWeightIndex}&whereToGo=${whereToGo}`);

 }
}
