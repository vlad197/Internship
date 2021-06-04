console.log(1);

window.onload = loadData;
var movieList = [];


function prepareTableCell(name1, rating, date, type, da,index) {

    var table = document.querySelector('#myTable');
    var row = table.insertRow();

    var nameCell = row.insertCell(0);
    var ratingCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var typeCell = row.insertCell(3);
    var daCell = row.insertCell(4);

    var actionCell = row.insertCell(5);


    nameCell.innerHTML = name1;
    ratingCell.innerHTML = rating;
    dateCell.innerHTML = date;
    typeCell.innerHTML = type;
    daCell.innerHTML = da;
    actionCell.innerHTML = '<button onClick="deleteRows('+index+')">Delete</button>';


}




function refreshTable() {

    var table = document.querySelector('#myTable');


    let template = `

    <tr>
    <th>Name of Movie</th>
    <th>Release Date</th>
    <th>Type of Movie</th>
    <th>Rating</th>
    <th>Released on dvd</th>
    <th>Delete</th>

    </tr>
    <tr>
        
        <td>${index}</td>
        <td>${name1}</td>
        <td>${date}</td>
        <td>${type}</td>
        <td>${rating}</td>
        <td>${da}</td>
        
        
        
    </tr>
    `;

    table.innerHTML += '';


    for (var i = 0; i < movieList.length; i++) {
        var name1 = movieList[i].name1;
        var rating = movieList[i].rating;
        var date = movieList[i].date;
        var type = movieList[i].type;
        var da = movieList[i].da;
        var index = movieList[i].index;

        prepareTableCell(movieList[i].name1, movieList[i].date, movieList[i].type, movieList[i].rating, movieList[i].da, movieList[i].index);






    }

}


function loadData() {



    if (localStorage.getItem('MovieList') != null) {
        movieList = JSON.parse(localStorage.getItem('MovieList'));
        refreshTable();


    }


}







function ValidareNumeRating() {
    var table = document.getElementById("myTable");
    var name = document.getElementById("name1").value;
    if (name == '') {
        text = "name input not valid";
        document.getElementById("myTable").innerHTML = text;

        return false;

    }

    var rating = document.getElementById("rating").value;

    if (isNaN(rating) || rating < 1 || rating > 5) {
        text = "Rating must be between 1 and 5";
        document.getElementById("myTable").innerHTML = text;
        return false;
    }

    return true;


}

function dataCalendaristica() {
    var data = document.getElementById("date").value;




    var parts = data.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);


    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        text = "year must be between 1000 and 3000 and month between 1 and 12";
        document.getElementById("myTable").innerHTML = text;
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;


    if (!(day > 0 && day <= monthLength[month - 1])) {
        text = "day must be between 1 and 31";
        document.getElementById("myTable").innerHTML = text;
        return false;
    }

    return true;
}


function deleteRows(index) {

    var table = document.getElementById("#myTable");
    var index = document.getElementById("#index");

    table.deleteRow(index+1);





}


function onButtonClick() {
    if (!ValidareNumeRating())
        return;

    if (!dataCalendaristica())
        return;
    
    

    
    refreshTable();
    

}