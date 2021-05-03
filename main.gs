/*function myFunction() {

  /* To do

// form se post accept karna hai
// sheet me pincode ke hisab se dallo
// sheewise iterate karo
//remove fucntion bhi dalna hai
// cron job banani hai
Accept data from form post
sanitize data
append data to respective pincode sheet
Add additional mets data such as date added and emaildisabled
run a time triggered job on a interval which iterates over sheets and checks if there is atleast 1 person who wants email else move to next sheet
for every sheet try to make 1 API call and check response code 200
if successful, make a list of centers with available slots and min age 18 and send to everyone in that pincode who want it
check for 45 age group slots on same data and send to 45 wala group (only who want it) 
add spam warnings to form front end, add unsubscribe option

  // The code below logs the HTML code of the Google home page.
var response = UrlFetchApp.fetch("https://pokeapi.co/api/v2/pokemon/ditto");
Logger.log(response.getContentText());
Logger.log(response.getResponseCode());
Logger.log(response.getHeaders());
}
*/
// ------------
//  1. Enter sheet name where data is to be written below
var SHEET_NAME = "110085";

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
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    //use hard coded pincodes for now, change to dynammic later
    var sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      doc.insertSheet(SHEET_NAME);
      sheet = doc.getSheetByName(SHEET_NAME);
      sheet.appendRow(['mail', 'pinc', 'age', 'subs', 'Timestamp']);
    }


    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers) {
      if (headers[i] == "Timestamp") { // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

function setup() {
  console.log("ran setup")
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}
