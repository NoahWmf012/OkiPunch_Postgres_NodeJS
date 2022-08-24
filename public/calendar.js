//knex code editing//
require("dotenv").config();
const knex = require("knex")({
    // CODE HERE
    client: 'postgresql',
    connection: {
        database: "template1",
        user: "postgres",
        password: "password",

        dateStrings: true
    },

});

let in_time = "";
let out_time = "";
let employee_id = "";
let inDate = [];
let outdate = "";
in_date_result = "";

//below return it as correct date, 19->20, 20->21
for (i = 1; i <= 3; i++) {
    let query = knex.select("employee_id", "in_date").from("attendance")
        .where("employee_id", i);

    query.then((rows) => {
        console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
        for (let j = 0; j < rows.length; j++) {
            let value = (rows[j].in_date); 

            value = value.toString();

            const date = value.split(' ', 4).join(' ');
            const time = value.split(' ').slice(4).join(' ').split(' ')[0];

            let [month, day, year] = date.split(' ').slice(1).join(' ').split(' ');

            const [hours, minutes, seconds] = time.split(':');
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            month = (months.indexOf(month) + 1)
            let alteredDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds)));

            console.log(alteredDate)
        }
    }).catch((error) => {
        console.log(error);
    });
}




