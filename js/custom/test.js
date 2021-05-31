//  1. Enter sheet name where data is to be written below
//  2. Run > setup
//
//  3. Publish > Deploy as web app
//    - enter Project Version name and click 'Save New Version'
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously)
//
//  4. Copy the 'Current web app URL' and post this in your form/script action
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)
const SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
const DOC = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));

// If you don't want to expose either GET or POST methods you can comment out the appropriate function
function doGet(e){
  return getActionHandler(e);
}

function doPost(e){
  return postActionHandler(e);
}

function postActionHandler(e) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    
    var sheetName = e.parameter["sheetName"];
    var sheet = DOC.getSheetByName(sheetName);

    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return ContentService
          .createTextOutput(JSON.stringify({
            result : "success",
            row : nextRow
          }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({
          result :"error",
          error : {
            message : e.message,
            stack : e.stack
          }
        }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

// function getAction2(e){
//   console.log(e);
//   console.log("get");
//   try {
//     var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
//     var sheet = doc.getSheetByName(SHEET_NAME);
//     var range = sheet.getRange('A1');
//     console.log(">>>>"+range.getValue());
//     // return json success results
//     return ContentService
//     .createTextOutput(JSON.stringify({"result":"success", "sheetName": sheetnames()}))
//     .setMimeType(ContentService.MimeType.JSON);
//   }
//   catch(e) {
//     // if error return this
//     return ContentService
//       .createTextOutput(JSON.stringify({
//           "result":"error",
//           "message": e.message,
//           "stack": e.stack,
//           "error" : e
//         }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//   finally {}
    
// }


function getActionHandler(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  
  try {
    let returnData = {};
    var getType = e.parameter["getType"];
    var sheetName = e.parameter["sheetName"];

    checkgetType(getType);
    
    if(getType === 'data'){
      checkSheetName(sheetName);
      var sheet = DOC.getSheetByName(sheetName);

      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var rawData = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues()
      var data = [];

      if (rawData) {
        for (var r=0; r < rawData.length; r++) {
          if (rawData[r][0] === "") {
            continue;
          }
          var row = {};
          for (var i=0; i< headers.length; i++) {
            row[headers[i]] = rawData[r][i];
          }
          data.push(row)
        }
      }

      returnData = {
        list : data,
        sheetName : sheetName,
        getType : getType,
        dataType : 'sheetData',

      }
    }

    if(getType === 'sheetNames'){
      returnData = {
        dataType : 'sheetNames',
        list: sheetNames()
      }
    }
    

    returnData.result = "success";
    return ContentService
      .createTextOutput(JSON.stringify(returnData))
      .setMimeType(ContentService.MimeType.JSON);

  }
  catch (e) {
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({
          result :"error",
          error : {
            message: e.message,
            stack: e.stack
            // message: e.message.replace(/\n/gi, '<br>'),
            // stack: e.stack.replace(/\n/gi, '<br>')
          }
        }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  finally { //release lock
    lock.releaseLock();
  }
}

function sheetNames() {
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i=0 ; i<sheets.length ; i++) out.push(sheets[i].getName())
  console.log(out);
  return out 
}


function checkSheetName(sheetName) {
  if(sheetName === undefined || sheetName === '')
    throw new Error('Parameter sheetName is undefined');
}

function checkgetType(getType) {
  if(getType === undefined || getType === '')
    throw new Error('Parameter getType is undefined');
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}