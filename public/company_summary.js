// //handlebar setup
let summaryTemplate = Handlebars.compile(
    `
{{#each employee}}
<div class='row d-flex justify-content-center align-items-center'> <br><br><br><br><br><br><br><br><br><br>
    <img class="col-12" src="../images/company_employeeSum.jpg" style="max-width:200px; border-radius: 50%;">
    <h1 class="text-center" style="color:#9EADBD" id={{@index}} data-id="{{@index}}">  {{alias}}  #<span style="color:#9EADBD" id="valueId{{employee_id}}">{{employee_id}}</span></h1>
    <div class='d-flex justify-content-center align-items-center'>
        <div class='row'>
            <div class="column col-6">
                <a id="calendarEmployeeId{{employee_id}}" href="http://localhost:8000/biz/worker/{{employee_id}}/calendar"> <i
                        class="fa-solid fa-calendar-days fa-xl" style="color:#205072"></i></a>
            </div>
            <div class="column col-6">
                <a id="" href=" http://localhost:8000/biz/worker/{{employee_id}}/info"> <i
                        class="fa-solid fa-user-pen fa-xl" style="color:#205072"></i></a>
            </div>
        </div>
    </div> <br> <br>
</div>

{{/each}}
      `
);

$.ajax({
    type: "GET",
    url: `http://localhost:8000/biz/showworkers/api`,
    success: function (result) {
        console.log(result);
        $("#companySummary").html(summaryTemplate({
            employee: result
        }));
    }
});