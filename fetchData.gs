var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
var logSheet = doc.getSheetByName("logs");
// function tempsheet(){
//         doc.insertSheet("latest added sheet2");
// }
async function cronJob() {

  //read all sheet names
  //read 1 sheet data for recieving column
  // if atelast one is true call api
  const sheetList = sheetnames();
  var sheet = "";
  var doc = SpreadsheetApp.getActiveSpreadsheet();

  for (var ind = 0; ind < sheetList.length; ++ind) {
    // read all subscribers in this sheet
    sheet = doc.getSheets()[ind];
    sheet.activate();
    // don't read log sheet
    if ("logs" == sheet.getName()) { continue; }
    var values = sheet.getRange("D:D").getValues();
    // if atleast 1 subscriber is found, set api flag
    var apiCall = false;
    for (var j = 0; j < values.length; ++j) {
      if (values[1][0]) {
        apiCall = true;
        break;
      }
    }
    // if api flag is set call api and send mail to subscribers
    if (apiCall) {
      var data = sheet.getDataRange().getValues();
      const response = callAPI(getToday(),sheet.getName());
Logger.log(data)
      var row_45 = "";
      var row_18 = "";
      var odd_18 = false;
      var odd_45 = false;

      if (!response.error) {
        // console.log("response valid");
        response.centers.forEach(center => checkAvailability(center));
        if (row_45 != "") {
          // send mail to people 
          for (kk = 1; kk < data.length; ++kk) {
            if (data[i][3] == "true" && data[i][2] == 45)
              sendMail(data[i][0], row_45)
          }
        }
        if (row_18 != "") {
          // send mail to people 
          for (kk = 1; kk < data.length; ++kk) {
            if (data[i][3] == "true" && data[i][2] == 18)
              sendMail(data[i][0], row_18)
          }
        }
      }

      function checkAvailability(center) {
        for (let index = 0; index < center.sessions.length; ++index) {
          const session = center.sessions[index];
          if (session.available_capacity > 0) {
            // console.log(session.available_capacity);
            if (session.min_age_limit == 18) {
              // append row to 18
              row_18 += `<tr${odd_18 ? ' style="background: #eee;"' : ''}><td data-column="Hospital">${center.name},${center.address}</td><td data-column="Min age">${session.min_age_limit}</td><td data-column="Date">${session.date}</td><td data-column="No of slots">${session.available_capacity}</td><td data-column="Vaccine">${session.vaccine}(${center.fee_type})</td></tr>`; odd_18 = (!odd_18);

            }
            // append to 45 in any case 
            row_45 += `<tr${odd_45 ? ' style="background: #eee;"' : ''}><td data-column="Hospital">${center.name},${center.address}</td><td data-column="Min age">${session.min_age_limit}</td><td data-column="Date">${session.date}</td><td data-column="No of slots">${session.available_capacity}</td><td data-column="Vaccine">${session.vaccine}(${center.fee_type})</td></tr>`; odd_45 = (!odd_45);

          }
        }
      }
    }
  }
}
function sendMail(recipient, rows) {
  const subject = 'Vaccine Slots available near you';
  const prefix = '<p>Here is a list of available vaccination slots in your neghbourhood next week.<br>This list is best viewed on large screen sizes.</p><table width="100%"><thead><tr style="background-color: #3498db ;color: white; font-weight: bold; "><th>Hospital</th><th>Min age</th><th>Date</th><th>No of slots</th><th>Vaccine</th></tr></thead><tbody>';
  const suffix = '</tbody></table><p>You are recieving this mail because you subscribed to <a href="https://sicarius.in/covid" target="_blank" rel="noopener noreferrer">this service</a>. To unsubscribe visit <a href="https://sicarius.in/covid-unsubscribe" target="_blank" rel="noopener noreferrer">https://sicarius.in/covid-unsubscribe</a>.<center><h6 style="margin:auto;">Hosted by <a href="https://sicarius.in">Sicarius Web Tech</a></h6></center></p>';
  const mail_data = {
    name: 'Vaccine Notification bot',
    htmlBody: prefix + rows + suffix
  };
  try {
    MailApp.sendEmail(recipient, subject, rows, mail_data);
    logSheet.appendRow([getNow(), "mail_send","success",recipient]);
  } catch (err) {
    logSheet.appendRow([getNow(),"mail_send","fail", recipient, err]);
  }
}
function getNow(){
    let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth();
    let yyyy = d.getFullYear();
    let HH=d.getHours();
    let MM=d.getMinutes();
    let SS=d.getSeconds();
    return dd + "-" + mm + "-" + yyyy+" "+HH+":"+MM+":"+SS;
}
function getToday(){
   let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth();
    let yyyy = d.getFullYear();
    return dd + "-" + mm + "-" + yyyy;
}

function callAPI(date, pin) {
  // date = "06-05-2021", pin = 110085;
  const headers = {
    'accept': 'application/json',
    'Accept-Language': "hi_IN"
  };
  var response = UrlFetchApp.fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`, headers);

  logSheet.appendRow([getNow(), 'api_fetch', response.getResponseCode(), pin, date]);
  if (response.getResponseCode() != 200) {
    response = { "error": response.getResponseCode() };
  }
  // Logger.log(response.getHeaders());  
  return response
}
function sheetnames() {
  // returns a array of strings containing names of all sheets
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) out.push(sheets[i].getName())
  Logger.log(out);
  return out
}