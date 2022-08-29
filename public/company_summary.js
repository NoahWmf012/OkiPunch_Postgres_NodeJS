// //handlebar setup
var summaryTemplate = Handlebars.compile(
    `
    {{#each employee}}
    <div class='row d-flex justify-content-center align-items-center'>
        <br><br><br><br><br><br><br><br><br><br>
        <img class="col-12" src="../images/company_employeeSum.jpg" style="max-width:150px; border-radius: 50%;">
        <h1 class="text-center" id={{@index}} data-id="{{@index}}"> Name: {{alias}} {{employee_id}}</h1>
        <div class='d-flex justify-content-center align-items-center'>
        <div class='row'>
            <div class="column col-6">
                <a href=""> <i class="fa-solid fa-calendar-days fa-xl"></i></a>
            </div>
            <div class="column col-6">
                <a href=""> <i class="fa-solid fa-user-pen fa-xl"></i></a>
            </div>
            </div>
        </div>
     <br> <br>
    </div>
    {{/each}}
          `
);

$.ajax({
    type: "GET",
    url: `http://localhost:8000/biz/showworkers/api`,
    success: function (result) {
        $("#companySummary").html(summaryTemplate({
            employee: result
        }));
    }
});
