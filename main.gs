//  1. Enter sheet name where data is to be written below
var SHEET_NAME = 110085;

//  2. Run > setup
//
//  3. Publish > Deploy as web app 
//    - enter Project Version name and click 'Save New Version' 
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously) 
//
//  4. Copy the 'Current web app URL' and post this in your form/script action 
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

// If you don't want to expose either GET or POST methods you can comment out the appropriate function
function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {

  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.

  try {
    SHEET_NAME = e.parameter.pinc;
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var logSheet = doc.getSheetByName("logs");
    //use hard coded pincodes for now, change to dynammic later
    var sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      doc.insertSheet(SHEET_NAME);
      sheet = doc.getSheetByName(SHEET_NAME);
      sheet.appendRow(['mail', 'pinc', 'age', 'subs', 'Timestamp']);
      logSheet.appendRow([getNow(), 'Sheet_creation', '', SHEET_NAME]);
    }

    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers) {
      if (headers[i] == "Timestamp") { // special case if you include a 'Timestamp' column
        row.push(getNow2());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "successfully added data to sheets", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "could not add data to sheets", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

function getNow2(){
    let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth();
    let yyyy = d.getFullYear();
    let HH=d.getHours();
    let MM=d.getMinutes();
    let SS=d.getSeconds();
    return dd + "-" + mm + "-" + yyyy+" "+HH+":"+MM+":"+SS;
}
function setup() {
  console.log("ran setup")
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}
