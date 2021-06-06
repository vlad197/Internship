//console.log(1);

window.onload = loadData;
var movieList = [];

function prepareTableCell(name1, rating, date, type, da,index) {

    var table = document.querySelector('#myTable');
    var row = table.insertRow();
    row.id = 'row'+index;
    var nameCell = row.insertCell(0);
    var ratingCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var typeCell = row.insertCell(3);
    var daCell = row.insertCell(4);

    var actionCell = row.insertCell(5);
    var indexCell = row.insertCell(6);


    nameCell.innerHTML = name1;
    ratingCell.innerHTML = rating;
    dateCell.innerHTML = date;
    typeCell.innerHTML = type;
    daCell.innerHTML = da;
    actionCell.innerHTML = '<button onClick="deleteRows('+index+')">Delete</button>';
    indexCell.innerHTML = '<div id="index'+index+'" >'+index+'</div>';


}




function refreshTable() {
    var table = document.querySelector('#myTable');

    table.innerHTML += '';

    for (var i = 0; i < movieList.length; i++) {
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
    var row = document.getElementById("row"+index);
    
    row.remove();

    var newMovieList = movieList.filter((obj) => {
        return obj.index != index;

    });

    localStorage.setItem('MovieList',JSON.stringify(newMovieList));
    console.log('newMovieList: ',newMovieList);
}


function addMovie() {
    let movie = {
        name1: document.getElementById('name1').value,
        rating: document.getElementById('rating').value,
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        da: document.getElementById('da').checked,
        index:document.getElementById('index').value

    }

    movieList.push(movie);
    

    let pre = document.querySelector('#myTable');
    pre.textContent = '\n' + JSON.stringify(movieList, '\t', 2);

    localStorage.setItem('MovieList', JSON.stringify(movieList) );

    console.log(movieList);


    var btnAdd = document.querySelector('button');
    var table = document.querySelector('table');

    var nameInput = document.querySelector('#name1');
    var dateInput = document.querySelector('#date');
    var typeInput = document.querySelector('#type');
    var ratingInput = document.querySelector('#rating');
    var releasedInput = document.querySelector('#da');
    var indexInput = document.querySelector('#index');

    var name1 = nameInput.value;
    var date = dateInput.value;
    var type = typeInput.value;
    var rating = ratingInput.value;
    var da = releasedInput.checked;
    var index = indexInput.value;



    let template = `

    <tr>
    <th>Name of Movie</th>
    <th>Release Date</th>
    <th>Type of Movie</th>
    <th>Rating</th>
    <th>Released on dvd</th>
    <th>Delete</th>
    <th>Index</th>

    </tr>
    <tr>
        
        <td>${index}</td>
        <td>${name1}</td>
        <td>${date}</td>
        <td>${type}</td>
        <td>${rating}</td>
        <td>${da}</td>
        <td>${index}</td>
    </tr>
    `;

    table.innerHTML += template;
}

function sortTable(c) {
     
    const sortedTable = movieList.sort(function(a, b) {
        var textA = a.name1.toUpperCase();
        var textB = b.name1.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    
    localStorage.setItem('MovieList', JSON.stringify(sortedTable));
    location.reload();
    
    
}

function sortTableType(c) {

    
    const sortedTable = movieList.sort(function(a, b) {
        var textA = a.type.toUpperCase();
        var textB = b.type.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });



    localStorage.setItem('MovieList', JSON.stringify(sortedTable));
    location.reload();
}


function sortRating(c) {

  const sortareRating =  movieList.sort(function (a, b) {
        return a.rating - b.rating;
      });


      localStorage.setItem('MovieList', JSON.stringify(sortareRating));
      location.reload();


}



function onButtonClick() {
    if (!ValidareNumeRating())
        return;

    if (!dataCalendaristica())
        return;
    
    
    addMovie();
    
    refreshTable();
}