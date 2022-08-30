//Show salary summary//
$.ajax({
    type: "GET",
    url: `http://localhost:8000/employee/info/api`,
    success: function (result) {
        //show employee information
        $("#aliasEmployee").append(result.alias);
        $("#titleEmployee").append(result.title);
        $("#employee_punch_hourlyRate").append(result.hourly_rate);
        $("#staffNoEmployee").append(result.employee_id);
        $("#nameEmployee").append(result.last_name + " " + result.first_name);
        $("#hourlyrateEmployee").append(result.hourly_rate + "/h");
        $("#phoneNoEmployee").append(result.phone_number);
        $("#addressEmployee").append(result.address);
        $("#dateOfBirthEmployee").append(result.date_of_birth);
        $("#genderEmployee").append(result.gender);

        //show update form value
        $("#editPhoneNo").val(result.phone_number);
        $("#editAddress").val(result.address);
    }
});



//update employee information
// $.ajax({
//     type: "PUT",
//     url: `http://localhost:8000/employee/info/update`,
//     success: function () {
//         //update form value
//     }
// });

