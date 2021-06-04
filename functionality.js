console.log(1);


var movieList = [];
function addMovie() {



    let movie = {
        name1: document.getElementById('name1').value,
        rating: document.getElementById('rating').value,
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        da: document.getElementById('da').checked

    }

    movieList.push(movie);
    
    //console.log(movieList);

    let pre = document.querySelector('table');
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






    var name1 = nameInput.value;
    var date = dateInput.value;
    var type = typeInput.value;
    var rating = ratingInput.value;
    var da = releasedInput.checked;



    let template = `
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

//document.addEventListener('DOMContentLoaded', ()=>{
//  document.getElementById('button').addEventListener('click',addMovie);
//});




function ValidareNumeRating() {
    var table = document.getElementById("myTable");
    var name = document.getElementById("name1").value;
    if (name == '') {
        text = "name input not valid";
        document.getElementById("myTable").innerHTML = text;
        // return;
        return false;

    }

    var rating = document.getElementById("rating").value;

    if (isNaN(rating) || rating < 1 || rating > 5) {
        text = "Rating must be between 1 and 5";
        document.getElementById("myTable").innerHTML = text;
        return false;
    }

    return true;

    //  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
}

function dataCalendaristica() {
    var data = document.getElementById("date").value;


    //  if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data))
    //  return false;


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

function insereaza() {

    var btnAdd = document.querySelector('button');
    var table = document.querySelector('table');

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
                        <td>${name1}</td>
                        <td>${date}</td>
                        <td>${type}</td>
                        <td>${rating}</td>
                        <td>${da}</td>
                        
                        
                    </tr>
                    `;

    table.innerHTML += template;






}

function reseteaza() {




    document.getElementById("name1").value = '';
    document.getElementById("date").value = '';
    document.getElementById("type").value = '';
    document.getElementById("rating").value = '';
    document.getElementById("da").checked = '';



}


function onButtonClick() {
    //   if (!ValidareNumeRating())
    //      return;

    //   if (!dataCalendaristica())
    //       return;
    //   insereaza();
    //   reseteaza();

    addMovie();

}