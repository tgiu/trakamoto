/**
* Imports JSON data to your spreadsheet Ex: IMPORTJSON("https://api.coinpaprika.com/v1/tickers/"&A2&dashboard!$BH$44,"quotes/USD/price")
* @param url URL of your JSON data as string
* @param xpath simplified xpath as string
* @customfunction
*/
function IMPORTJSON(url,xpath){
  
  try{
    // /rates/EUR
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();
    var json = JSON.parse(content);
    
    var patharray = xpath.split("/");
    //Logger.log(patharray);
    
    for(var i=0;i<patharray.length;i++){
      json = json[patharray[i]];
    }
    
    //Logger.log(typeof(json));
    
    if(typeof(json) === "undefined"){
      return "Node Not Available";
    } else if(typeof(json) === "object"){
      var tempArr = [];
      
      for(var obj in json){
        tempArr.push([obj,json[obj]]);
      }
      return tempArr;
    } else if(typeof(json) !== "object") {
      return json;
    }
  }
  catch(err){
      return "Error getting data";  
  }
  
}

function IMPORTJSONPDATE(){
  var d = new Date();
  var timeStamp = d.toLocaleTimeString();
  var cellValue = timeStamp;
  SpreadsheetApp.getActiveSheet().getRange('BC43').setValue(cellValue);
  SpreadsheetApp.getActiveSheet().getRange('BH44').setValue("?quotes=USD");
}

function IMPORTJSONPDATE2(){
  var d2 = new Date();
  var timeStamp2 = d2.toLocaleTimeString();
  var cellValue2 = timeStamp2;
  SpreadsheetApp.getActiveSheet().getRange('BC43').setValue(cellValue2);
  SpreadsheetApp.getActiveSheet().getRange('BH44').setValue("");
}
