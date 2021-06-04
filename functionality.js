console.log(1);

window.onload = loadData;
var movieList = [];


function prepareTableCell(name1, rating, date, type, da) {

    var table = document.querySelector('#myTable');
    var row = table.insertRow();

    var nameCell = row.insertCell(0);
    var ratingCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var typeCell = row.insertCell(3);
    var daCell = row.insertCell(4);


    nameCell.innerHTML = name1;
    ratingCell.innerHTML = rating;
    dateCell.innerHTML = date;
    typeCell.innerHTML = type;
    daCell.innerHTML = da;


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

    </tr>
    <tr>
        
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

        prepareTableCell(movieList[i].name1, movieList[i].date, movieList[i].type, movieList[i].rating, movieList[i].da);






    }

}


function loadData() {



    if (localStorage.getItem('MovieList') != null) {
        movieList = JSON.parse(localStorage.getItem('MovieList'));
        refreshTable();


    }


}
function addMovie() {



    let movie = {
        name1: document.getElementById('name1').value,
        rating: document.getElementById('rating').value,
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        da: document.getElementById('da').checked

    }

    movieList.push(movie);



    let pre = document.querySelector('#myTable');
    pre.textContent = '\n' + JSON.stringify(movieList, '\t', 2);

    localStorage.setItem('MovieList', JSON.stringify(movieList));

    console.log(movieList);


    var btnAdd = document.querySelector('button');
    var table = document.querySelector('#myTable');

    var nameInput = document.querySelector('#name1');
    var dateInput = document.querySelector('#date');
    var typeInput = document.querySelector('#type');
    var ratingInput = document.querySelector('#rating');
    var releasedInput = document.querySelector('#da');






    var name1 = nameInput.value;
    var date = dateInput.value;
    var type = typeInput.value;
    var rating = ratingInput.value;
    var da = releasedInput.checked;


    let template = `

    <tr>
    <th>Name of Movie</th>
    <th>Release Date</th>
    <th>Type of Movie</th>
    <th>Rating</th>
    <th>Released on dvd</th>

    </tr>
    <tr>
        
        <td>${name1}</td>
        <td>${date}</td>
        <td>${type}</td>
        <td>${rating}</td>
        <td>${da}</td>
        
        
    </tr>
    `;

    table.innerHTML += template;



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





function onButtonClick() {
    if (!ValidareNumeRating())
        return;

    if (!dataCalendaristica())
        return;
    
    

    // addMovie();
    refreshTable();
    

}