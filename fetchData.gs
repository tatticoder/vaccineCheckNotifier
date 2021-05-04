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
      const response = callAPI();
      if(response.error){
        Logger.log("API call failed",response)
      }
      else{
        Logger.log("response data is valid")
        // now check availability in each center
      }
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

async function checkAvailability() {

    let datesArray = await fetchNext10Days();
    datesArray.forEach(date => {
        getSlotsForDate(date);
    })
}
function getSlotsForDate(DATE) {
  

            let sessions = slots.data.sessions;
            let validSlots = sessions.filter(slot => slot.min_age_limit <= AGE &&  slot.available_capacity > 0)
            console.log({date:DATE, validSlots: validSlots.length})
            if(validSlots.length > 0) {
                notifyMe(validSlots, DATE);
            }
        
}

function fetchNext10Days() {
  let dates = [];
  let d = new Date();
  for (let i = 0; i < 10; ++i) {
    // d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 1);
    // Logger.log(d.getTime())
    let dd = d.getDate();
    let mm = d.getMonth();
    let yyyy = d.getFullYear();
    let dateString = dd + "-" + mm + "-" + yyyy;
    dates.push(dateString);
  }
  // Logger.log(dates)
  return dates;
}
function callAPI(date, pin) {
  // date = "06-05-2021", pin = 110085;
  // const headers = {
  //   'accept': 'application/json',
  //   'Accept-Language': "hi_IN"
  // };

  // var response = UrlFetchApp.fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`, headers);
  // var sheet = doc.getSheetByName("logs");
  // var d = new Date();
  // var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";
  // console.log(date_format_str);

  // sheet.appendRow([date_format_str, date, pin, response.getResponseCode()]);
// if(response.getResponseCode()!=200){
//   response={"error":response.getResponseCode()};
// }
  // Logger.log(response);
  //  Logger.log(response.getContentText());
  // Logger.log(response.getResponseCode());
  // Logger.log(response.getHeaders());  
var response={
    "centers": [
        {
            "center_id": 7859,
            "name": "Polyclinic Pitampura PHC",
            "address": "DGD C-D BLOLK PITAM PURA VISHAKHA ENCLAVE .",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "2d07fac6-6823-4946-b800-81580fd11f36",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "833de3f6-8680-4d4d-a3f0-c74828a2950f",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "1a6a2779-0a3c-4cd9-a639-d1bf8fb7af41",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "dedf1ab9-3d0a-4ffd-8713-f63d2b714b09",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                },
                {
                    "session_id": "11137979-4f6b-477d-bb3d-daea25b424c9",
                    "date": "12-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 610021,
            "name": "Dr BSA Hospital DH 3",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "871863b7-f3ef-4566-ad3b-8c0e8eed3511",
                    "date": "06-05-2021",
                    "available_capacity": 197,
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
                    "session_id": "2f9f3d07-b8e4-44d2-9fb7-6fefab18dbf8",
                    "date": "07-05-2021",
                    "available_capacity": 195,
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
                    "session_id": "e90ed398-e95e-4be6-82a2-5c3e655c013f",
                    "date": "08-05-2021",
                    "available_capacity": 199,
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
                    "session_id": "9ecff556-5972-4e13-8c89-1ff3779bb2ae",
                    "date": "10-05-2021",
                    "available_capacity": 197,
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
                    "session_id": "74f702ce-4078-4e31-9a25-e2abfb478896",
                    "date": "11-05-2021",
                    "available_capacity": 200,
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
                    "session_id": "4c57868d-2e3e-47cc-9268-3fb115b39e83",
                    "date": "12-05-2021",
                    "available_capacity": 199,
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
        },
        {
            "center_id": 664663,
            "name": "Polyclinic Sec 18 Rohini",
            "address": "Delhi Govt. Dispensary, B-Block, Sector 18, Rohini, Delhi 85.",
            "state_name": "Delhi",
            "district_name": "North Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "611447ce-64b0-42d7-b3b5-ebcb88193be3",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 7863,
            "name": "Polyclinic Rohini Sector4 PHC",
            "address": "A-3 Block, Sector-4 Rohini",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "f65a6783-d03e-4051-a11b-f3a1cd9ae57a",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "a4f376cd-a61e-4725-9c0c-1a892ada7c90",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "c2d8fe58-6c95-4326-8013-37eb1d5ecad0",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 18,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "d0b042e7-5d97-4e6b-8cf7-6ec325147bb3",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 7866,
            "name": "Dr BSA Hospital DH 1",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "06aa9ed6-11f2-4596-8a8a-7f5f943acd79",
                    "date": "06-05-2021",
                    "available_capacity": 137,
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
                    "session_id": "87d48498-c592-400f-a1bb-f9231207afd8",
                    "date": "07-05-2021",
                    "available_capacity": 158,
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
                    "session_id": "9df6ec25-bbfe-42c3-a149-6a9bc2a3853b",
                    "date": "08-05-2021",
                    "available_capacity": 133,
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
                    "session_id": "4455bff4-089b-4663-a93e-8aaaf0fdecf4",
                    "date": "10-05-2021",
                    "available_capacity": 150,
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
                    "session_id": "75af0350-43f8-4ef9-902e-3fe69010c616",
                    "date": "11-05-2021",
                    "available_capacity": 179,
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
                    "session_id": "b520314d-808a-48e7-b24a-ff7ec88435f7",
                    "date": "12-05-2021",
                    "available_capacity": 178,
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
        },
        {
            "center_id": 576488,
            "name": "Dr BSA Hospital DH 2",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "953b3bdf-a1aa-44b3-829b-95621b0582c2",
                    "date": "06-05-2021",
                    "available_capacity": 193,
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
                    "session_id": "d30c8398-5ec9-46e5-a196-bd9e9b511b84",
                    "date": "07-05-2021",
                    "available_capacity": 196,
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
                    "session_id": "3e62cd4a-dad4-461c-90d9-643e2cd7109d",
                    "date": "08-05-2021",
                    "available_capacity": 191,
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
                    "session_id": "add9f12a-3390-4664-aa0f-b1408ae0552e",
                    "date": "10-05-2021",
                    "available_capacity": 195,
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
                    "session_id": "c48ae6f7-7777-4750-90b2-f571c59c92a8",
                    "date": "11-05-2021",
                    "available_capacity": 198,
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
                    "session_id": "130b5701-9743-4afa-ab03-a74e5e141f11",
                    "date": "12-05-2021",
                    "available_capacity": 196,
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
        },
        {
            "center_id": 7899,
            "name": "ESI Disp Rohini PHC",
            "address": "Sec.5 Rohini, Near Post Office",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "96847335-a7ff-4ffd-b42e-9157fa5cce24",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "bd2a36ff-3161-40a7-8c2f-c9b69bc0da3c",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "56c4f141-96ce-49c6-9442-3408abb83e66",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "4b4ecdac-54e8-45a0-9ad7-85e0ec40da4f",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 7912,
            "name": "MCW Rohini Sec7 PHC",
            "address": "LALA HANS RAJ HEALTH COMPLEX, ROHINI SECTOR-7 DELHI -110085",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "44f4d98c-050e-44e0-b408-8dcf2d707ac1",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "fc26f5e7-827b-4461-a1c3-786d0afba646",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "98f6bb1f-09d5-4713-b2e6-f8ce7e70e42d",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "0aa8a26f-92d5-4dff-a210-b890d21e6f01",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 642824,
            "name": "Dr BSA Hospital DH 6",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "1ea74d2a-e8ab-4424-9878-131715d2b4be",
                    "date": "06-05-2021",
                    "available_capacity": 196,
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
                    "session_id": "934cb0b3-6cf2-4bc1-aa7d-ed045686b04d",
                    "date": "07-05-2021",
                    "available_capacity": 191,
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
                    "session_id": "95bf3a6c-b52e-4620-9f1f-78632f838a49",
                    "date": "08-05-2021",
                    "available_capacity": 191,
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
                    "session_id": "38934fba-041e-4a4e-846e-af8be8dccfb5",
                    "date": "10-05-2021",
                    "available_capacity": 196,
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
                    "session_id": "b431e3e3-ff82-440c-ad31-28e59ab3b4a3",
                    "date": "11-05-2021",
                    "available_capacity": 199,
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
                    "session_id": "57046416-45dd-44d1-a256-50697d40c724",
                    "date": "12-05-2021",
                    "available_capacity": 198,
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
        },
        {
            "center_id": 642823,
            "name": "Dr BSA Hospital DH 5",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "93eedf3b-f252-4209-9316-78a052e18e09",
                    "date": "06-05-2021",
                    "available_capacity": 198,
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
                    "session_id": "e7ddfc12-b191-4cc6-88b2-cd436cdfe942",
                    "date": "07-05-2021",
                    "available_capacity": 193,
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
                    "session_id": "c2649c4f-4df6-4c3d-bfb3-683df29f90ed",
                    "date": "08-05-2021",
                    "available_capacity": 193,
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
                    "session_id": "5619323c-6297-49ea-bba6-b31a207de6ff",
                    "date": "10-05-2021",
                    "available_capacity": 195,
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
                    "session_id": "74fc0170-fb7c-4ea6-8090-fdd36f3d5a01",
                    "date": "11-05-2021",
                    "available_capacity": 200,
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
                    "session_id": "3eb41b76-a900-4d73-815f-839e2f612540",
                    "date": "12-05-2021",
                    "available_capacity": 200,
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
        },
        {
            "center_id": 664475,
            "name": "DGD Prashant Vihar",
            "address": "B-Block, Prashant Vihar, Rohini, Delhi-85",
            "state_name": "Delhi",
            "district_name": "North Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "bedab44f-bda6-482d-9c2e-72fff53b6162",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVISHIELD",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 7930,
            "name": "DGD Rohini Sector8 PHC",
            "address": "DGD Sector-8 Rohini Delhi",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "18:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "e43de64a-f368-4a1c-8d33-9ae0aca63203",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                },
                {
                    "session_id": "5a4535a3-4ab2-4786-88c9-8529fb9bb3cc",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                },
                {
                    "session_id": "db6ad4e3-5d33-42a4-9353-b18ecd45294f",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                },
                {
                    "session_id": "0cefa5b6-2a63-4e18-8b6b-90aa9e670229",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                },
                {
                    "session_id": "3efa049f-ddb6-4558-9597-624cebb8f7bd",
                    "date": "12-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-06:00PM"
                    ]
                }
            ]
        },
        {
            "center_id": 664685,
            "name": "SUNRISE HOSPITAL ROHINI North",
            "address": "Plot No.1, Pocket 8b, SECTOR-15,Rohini",
            "state_name": "Delhi",
            "district_name": "North Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Paid",
            "sessions": [
                {
                    "session_id": "a6d03090-8a03-4a60-8d86-09bc2fa7af0e",
                    "date": "06-05-2021",
                    "available_capacity": 0,
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
                    "session_id": "86e22dc8-0bd2-4cb0-a621-71fc8728935a",
                    "date": "07-05-2021",
                    "available_capacity": 0,
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
                    "session_id": "fd0e7289-01ff-4ef3-87c4-f98c001b4534",
                    "date": "08-05-2021",
                    "available_capacity": 0,
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
                    "session_id": "482a1195-f172-414e-b283-d80ce8c88187",
                    "date": "09-05-2021",
                    "available_capacity": 0,
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
                    "session_id": "a7fcb5f8-97b2-470b-a154-58abd9147f2a",
                    "date": "10-05-2021",
                    "available_capacity": 0,
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
        },
        {
            "center_id": 610022,
            "name": "Dr BSA Hospital DH 4",
            "address": "Sector -VI, Rohini, Delhi - 85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "21:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "8a167246-fe90-464b-ac14-fdbf48794ca8",
                    "date": "06-05-2021",
                    "available_capacity": 198,
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
                    "session_id": "a25bcf2a-ad02-4e5f-b5b0-ad85aff232cb",
                    "date": "07-05-2021",
                    "available_capacity": 190,
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
                    "session_id": "06e397d9-410e-4851-810b-77a2cb6b3223",
                    "date": "08-05-2021",
                    "available_capacity": 194,
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
                    "session_id": "c64d5683-b011-4e7b-8d73-a71a9e38e53e",
                    "date": "10-05-2021",
                    "available_capacity": 195,
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
                    "session_id": "14c0db70-c1bf-4554-a3ea-a35f7db4f56c",
                    "date": "11-05-2021",
                    "available_capacity": 200,
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
                    "session_id": "3fbf1ff5-ee14-4a40-9207-b41355de88da",
                    "date": "12-05-2021",
                    "available_capacity": 199,
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
        },
        {
            "center_id": 7861,
            "name": "Polyclinic Sec 2 Rohini PHC",
            "address": "DGD, Sector 2, Rohini, Near Himalaya Appartment, Delhi-85",
            "state_name": "Delhi",
            "district_name": "North West Delhi",
            "block_name": "Not Applicable",
            "pincode": 110085,
            "lat": 28,
            "long": 77,
            "from": "09:00:00",
            "to": "17:00:00",
            "fee_type": "Free",
            "sessions": [
                {
                    "session_id": "eebd8543-df2c-4367-a349-90290377cbd7",
                    "date": "06-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "407a5f03-96ce-461d-a623-4952c04a3a2d",
                    "date": "08-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "a0bc6880-9e6e-4197-9f88-0dd9fa7ee63d",
                    "date": "10-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                },
                {
                    "session_id": "98365ae1-91ee-4b5c-958d-04ced3074145",
                    "date": "11-05-2021",
                    "available_capacity": 0,
                    "min_age_limit": 45,
                    "vaccine": "COVAXIN",
                    "slots": [
                        "09:00AM-11:00AM",
                        "11:00AM-01:00PM",
                        "01:00PM-03:00PM",
                        "03:00PM-05:00PM"
                    ]
                }
            ]
        }
    ]
};
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