function myFunction() {
  // The code below logs the HTML code of the Google home page.
  // var response = UrlFetchApp.fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  // Logger.log(response.getContentText());
  // Logger.log(response.getResponseCode());
  // Logger.log(response.getHeaders());

  //read all sheet names
  //read 1 sheet data for recieving column
  // if atelast one is true call api
  const sheetList = sheetnames();
  var sheet = "";
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  for (var ind = 0; ind < sheetList.length; ++ind) {
    sheet = doc.getSheets()[ind];
    sheet.activate();
    sheet.appendRow(['test', 'ki', 'chala', 'ki', 'ni']);

    // Logger.log(sheetList[ind],sheet)

    // var data = sheet.getDataRange().getValues();
    // for (var i = 0; i < data.length; ++i) {
    //   Logger.log('mail: ' + data[i][0]);
    //   Logger.log('pinc: ' + data[i][1]);
    //   Logger.log('age: ' + data[i][2]);
    //   Logger.log('subs: ' + data[i][3]);
    //   Logger.log('Timestamp: ' + data[i][4]);
    // }
  }
}
function sheetnames() {
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) out.push(sheets[i].getName())
  Logger.log(out);
  return out
}