var movieList = [];

function loadData() {
    if (localStorage.getItem('MovieList') != null) {
        movieList = JSON.parse(localStorage.getItem('MovieList'));
        refreshTable();
    }
}
window.onload = loadData;

function onButtonClick() {
    if (!ValidareNumeRating())
        return;

    if (!dataCalendaristica())
        return;
    
    
    addMovie();
    refreshTable();
}

function ValidareNumeRating() {
    var name = document.getElementById("name").value;
    if (name == '') {
        text = "name input not valid";
        document.getElementById("errorMessage").innerHTML = text;
        return false;
    }

    var rating = document.getElementById("rating").value;
    if (isNaN(rating) || rating < 1 || rating > 5) {
        text = "Rating must be between 1 and 5";
        document.getElementById("errorMessage").innerHTML = text;
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
        document.getElementById("errorMessage").innerHTML = text;
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;


    if (!(day > 0 && day <= monthLength[month - 1])) {
        text = "day must be between 1 and 31";
        document.getElementById("errorMessage").innerHTML = text;
        return false;
    }

    return true;
}

function refreshTable() {
    var sortedColumnHeader = document.querySelector("#myTable .descending, #myTable .ascending");
    if(sortedColumnHeader) {
        var isDescending = sortedColumnHeader.classList.contains("descending");

        var compareFunction;
        // trebuie sa dam valoare la compare function bazat pe id-ul header-ului pe care am dat click
        switch(sortedColumnHeader.id) {
            case "date":
                compareFunction = compareDate;
                break;
            case "dvd":
                compareFunction = compareStringsDVD;
                break;
            case "rating":
                compareFunction = compareRating;
                break;
            case "genre":
                compareFunction = compareStringsGenre;
                break;
            case "name":
                compareFunction = compareStrings;
                break;
            default: throw "column not supported";
        }

        movieList = movieList.sort(compareFunction);
        if(isDescending) {
            movieList = movieList.reverse();
        }
    }
    
    var tableRows = document.querySelectorAll('#myTable tr');
    for (var i = 1; i < tableRows.length; i++) {
        tableRows[i].remove();
    }

    for (var i = 0; i < movieList.length; i++) {
        buildTableRow(movieList[i].name, movieList[i].date, movieList[i].type, movieList[i].rating, movieList[i].da, i);
    }
}

function buildTableRow(name, rating, date, type, da, index) {
    var table = document.querySelector('#myTable');
    var row = table.insertRow();

    var nameCell = row.insertCell(0);
    var ratingCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var typeCell = row.insertCell(3);
    var daCell = row.insertCell(4);
    var actionCell = row.insertCell(5);

    
    nameCell.innerHTML = name;
    ratingCell.innerHTML = rating;
    dateCell.innerHTML = date;
    typeCell.innerHTML = type;
    daCell.innerHTML = da;
    actionCell.innerHTML = '<button onClick="deleteRows('+index+')">Delete</button>';
}

function deleteRows(index) {    
    movieList = movieList.filter((_, arrayIndex) => {
        return arrayIndex != index;
    });

    localStorage.setItem('MovieList',JSON.stringify(movieList));
    console.log('newMovieList: ',movieList);

    refreshTable();
}

function addMovie() {
    let movie = {
        name: document.getElementById('name').value,
        rating: document.getElementById('rating').value,
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        da: document.getElementById('da').checked
    }

    movieList.push(movie);
    localStorage.setItem('MovieList', JSON.stringify(movieList));
    console.log(movieList);
}

function compareStrings(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function compareRating(a,b) {

    return a.rating - b.rating;

}

function compareDate(a,b) {
    var aa = a.date.split('/').reverse().join(),
    bb = b.date.split('/').reverse().join();
return aa < bb ? -1 : (aa > bb ? 1 : 0);
}

function compareStringsGenre(a, b) {
    var textA = a.type.toUpperCase();
    var textB = b.type.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function compareStringsDVD(a, b) {
     
        return (a.da === b.da)? 0 : a.da? -1 : 1;
}

let sortDirection = false;
function sortColumn(event) {
    var clickedColumnHeader = event.target;

    // trecem prin toate headerele din tabel (inafara de cel pe care am dat click) si scoatem clasele "ascending+descending"
    var tableHeaders = document.querySelectorAll('#myTable th');
    for(var i=0; i<tableHeaders.length;i++)
    {
        if(tableHeaders[i] !== clickedColumnHeader){
            tableHeaders[i].classList.remove("ascending");
            tableHeaders[i].classList.remove("descending");
        }
    }

    //verificare daca are clasa "ascending"
    // daca nu o are
    //      sortam ascending
    //      adaugam clasa "ascending" pe header
    // daca o are
    //      sortam descending
    //      scoatem clasa "ascending" de pe header
    //      adaugam clasa "descending" pe header

    if(clickedColumnHeader.classList.contains("ascending") )
    {
        clickedColumnHeader.classList.remove("ascending");
        clickedColumnHeader.classList.add("descending");
    }
    else
    {
        clickedColumnHeader.classList.remove("descending");
        clickedColumnHeader.classList.add("ascending");
    }

    refreshTable();
}

