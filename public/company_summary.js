// // //handlebar setup
// let summaryTemplate = Handlebars.compile(
//     `
//     {{#each employee}}
//     <div class='row d-flex justify-content-center align-items-center'> <br><br><br><br><br><br><br><br><br><br>
//         <img class="col-12" src="../images/company_employeeSum.jpg" style="max-width:150px; border-radius: 50%;">
//         <h1 class="text-center" id={{@index}} data-id="{{@index}}"> Name: {{alias}}  #<span id="valueId{{employee_id}}">{{employee_id}}</span></h1>
//         <div class='d-flex justify-content-center align-items-center'>
//             <div onclick="myFunction()" class='row'>
//                 <div class="column col-6">
//                     <a id="calendarEmployeeId{{employee_id}}" href="http://localhost:8000/biz/worker/{{employee_id}}/calendar"> <i
//                             class="fa-solid fa-calendar-days fa-xl"></i></a>
//                 </div>
//                 <div class="column col-6">
//                     <a id="" href=" http://localhost:8000/biz//worker/{{employee_id}}/info"> <i
//                             class="fa-solid fa-user-pen fa-xl"></i></a>
//                 </div>
//             </div>
//         </div> <br> <br>
//     </div>
//     {{/each}}
//           `
// );

// $.ajax({
//     type: "GET",
//     url: `http://localhost:8000/biz/showworkers/api`,
//     success: function (result) {
//         console.log(result);
//         $("#companySummary").html(summaryTemplate({
//             employee: result
//         }));

//         // let calendarId;
//         // let employeeIdArray = [];


//         // for (let d = 0; d < result.length; d++) {
//         //     employeeIdArray.push(result[d].employee_id);
//         //     // getElementById(`calendarEmployeeId${employeeIdArray[d]}`)
//         // }

//         // function myFunction() {
//         //     document.getElementsByTagName("div").style.background = "red";
//         // }

//         // $("#calendarEmployeeId4").click();






//         //company calendar - edit data


//         //company worker info - show data


//         //company worker info - edit data


//     }
// });


// // company calendar - show data
// let emId;
// for (let g = 0; g < result.length; g++) {
//     emId = result[g].employee_id;
//     console.log(emId);

//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8000/biz/worker/${emId}/calendar/api`,
//         async: true,
//         success: function (result) {
//             console.log(result);
//             // console.log(result.date.length);

//             let status_id;
//             let cal_array = []
//             for (let c = 0; c < result.date.length; c++) {
//                 if (result.status[c] == "ON_TIME") {
//                     status_id = "1";
//                 } else if (result.status[c] == "LATE") {
//                     status_id = "2";
//                 } else if (result.status[c] == "ABSENT") {
//                     status_id = "3";
//                 } else if (result.status[c] == "EARLY GOING") {
//                     status_id = "4";
//                 } else if (result.status[c] == "HALF DAY") {
//                     status_id = "5";
//                 }

//                 cal_array.push({
//                     id: status_id,//staff_id
//                     name: result.status[c],//"Punctual", "Late", "Absence"
//                     description: result.description[c],//additional information e.g.late/absence reason
//                     date: result.date[c], //default format: February/15/1999  ,or  [ today.getMonth() + 1 + "/" + week_date.start + "/" + today.getFullYear(), today.getMonth() + 1 + "/" + week_date.end + "/" + today.getFullYear() ]
//                     type: "event", //"punctual", "late", "absence" // color according to the type
//                 })

//                 c = c++
//             }

//             $("#evoCalendar").evoCalendar({
//                 format: "yyyy/mm/dd", // default format: MM dd, yyyy
//                 titleFormat: "MM",
//                 calendarEvents:
//                     cal_array
//             });
//         }
//     });
// }