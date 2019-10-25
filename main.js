//Récupération des éléments HTML
var titleElement = document.getElementById("title");
var dotElement = document.getElementById('dot');

//Création des éléments du slider
ajaxGet(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe",
    function(response) {

        var apiResponse = JSON.parse(response);
        var movieArray = apiResponse.results;
        
        movieArray.forEach(function(mov, index) {

            //Slide
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'mySlides fade');
            titleElement.appendChild(newDiv);

            //Image
            var newImage = document.createElement("img");
            newImage.setAttribute('src', 'https://image.tmdb.org/t/p/w500'
                +mov.backdrop_path);
            newImage.setAttribute('style', 'width:100%');
            newDiv.appendChild(newImage);

            // Titre
            var newElement = document.createElement("h5");
            newElement.setAttribute('class', 'text');
            newElement.textContent = mov.title;
            newElement.appendChild(document.createElement('br'));
            newDiv.appendChild(newElement);

            //Note
            var newNote = document.createElement('span');
            newNote.setAttribute('class', 'note');
            for(var i = 1; i<= 10; i++){
                var newStar = document.createElement('img');
                newStar.setAttribute('class', 'star');
                newStar.setAttribute('src', i < Math.round(mov.vote_average) ? 'star.png' : 'stargrey.png');
                newNote.appendChild(newStar);
            }
            newElement.appendChild(newNote);

            //Overview
            var newOverview = document.createElement('p');
            newOverview.setAttribute('class', 'texte');
            newOverview.textContent = mov.overview.substring(0, 200) + '...';
            newDiv.appendChild(newOverview);

            //Dot
            var newDot = document.createElement('a');
            newDot.setAttribute('class', 'dot');
            newDot.onclick = function() {
                currentSlide(index + 1)
            };
            dotElement.appendChild(newDot);
        });
        showSlides();
    }
);

//Slider
var slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
