//Show salary summary//
$.ajax({
    type: "GET",
    url: `http://localhost:8000/employee/salary`,
    success: function (result) {
        console.log(result);
        $("#employee_punch_workingHours").append(result.month_working_hour);
        $("#employee_punch_hourlyRate").append(result.hourly_rate);
        $("#employee_punch_totalSalary").append(result.month_salary);
        $("#punchInEmId").append(" " + result.employee_id);
    }
});

//punch in insert data
let employeePunchIn = function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:8000/employee/punchin`,
        success: function (result) {
            console.log(result)
            $("#punchInOTPW").append(" " + result);
            return true;
        }
    });
}

$(document).ready(function () {
    $("#employee_punch_inBtn").click(function () {
        employeePunchIn();
        $("#punchIn_alert").css("visibility", "visible");
        $(employee_punch_inBtn).attr('disabled', true);
    });
})


//punch out insert data
let employeePunchOut = function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:8000/employee/punchout`,
        success: function (result) {
            return true;
        }
    });
}

$(document).ready(function () {
    $("#employee_punch_outBtn").click(function () {
        employeePunchOut();
        $("#punchOut_alert").css("visibility", "visible");
        $(employee_punch_outBtn).attr('disabled', true);
    });
})










