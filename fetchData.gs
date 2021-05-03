function myFunction() {

  //read all sheet names
  //read 1 sheet data for recieving column
  // if atelast one is true call api
  const sheetList = sheetnames();
  var sheet = "";
  var doc = SpreadsheetApp.getActiveSpreadsheet();

  for (var ind = 0; ind < sheetList.length; ++ind) {
    sheet = doc.getSheets()[ind];
    sheet.activate();
    var values=sheet.getRange("D:D").getValues();
var apiCall=false;

    for (var j = 0; j < values.length; ++j) {
      if (values[1][0]) {
        apiCall=true;
        break;
      }
    }
  if(apiCall){
  // var response = UrlFetchApp.fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  // Logger.log(response.getContentText());
  // Logger.log(response.getResponseCode());
  // Logger.log(response.getHeaders());  
  var response = {
    "sessions": [
      {
        "center_id": 610022,
        "name": "Dr BSA Hospital DH 4",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "a25bcf2a-ad02-4e5f-b5b0-ad85aff232cb",
        "date": "07-05-2021",
        "available_capacity": 199,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      },
      {
        "center_id": 7866,
        "name": "Dr BSA Hospital DH 1",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "87d48498-c592-400f-a1bb-f9231207afd8",
        "date": "07-05-2021",
        "available_capacity": 190,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      },
      {
        "center_id": 576488,
        "name": "Dr BSA Hospital DH 2",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "d30c8398-5ec9-46e5-a196-bd9e9b511b84",
        "date": "07-05-2021",
        "available_capacity": 198,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      },
      {
        "center_id": 610021,
        "name": "Dr BSA Hospital DH 3",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "2f9f3d07-b8e4-44d2-9fb7-6fefab18dbf8",
        "date": "07-05-2021",
        "available_capacity": 199,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      },
      {
        "center_id": 642823,
        "name": "Dr BSA Hospital DH 5",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "e7ddfc12-b191-4cc6-88b2-cd436cdfe942",
        "date": "07-05-2021",
        "available_capacity": 200,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      },
      {
        "center_id": 642824,
        "name": "Dr BSA Hospital DH 6",
        "state_name": "Delhi",
        "district_name": "North West Delhi",
        "block_name": "Not Applicable",
        "pincode": 110085,
        "from": "09:00:00",
        "to": "21:00:00",
        "lat": 28,
        "long": 77,
        "fee_type": "Free",
        "session_id": "934cb0b3-6cf2-4bc1-aa7d-ed045686b04d",
        "date": "07-05-2021",
        "available_capacity": 200,
        "fee": "0",
        "min_age_limit": 45,
        "vaccine": "COVISHIELD",
        "slots": [
          "09:00AM-12:00PM",
          "12:00PM-03:00PM",
          "03:00PM-06:00PM",
          "06:00PM-09:00PM"
        ]
      }
    ]
  };
  }

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
  // returns a array of strings containing names of all sheets
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) out.push(sheets[i].getName())
  Logger.log(out);
  return out
}