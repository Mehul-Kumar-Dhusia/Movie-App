let section = document.getElementById('section') ;

let BASE_URL = 'https://api.themoviedb.org/3/' ;
let API_KEY = 'api_key=4e27f12fce9f23a24d9ca62ede5439c9' ;
let API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY ;

let SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4e27f12fce9f23a24d9ca62ede5439c9&query=' ;

getMovie(API_URL) ;

function getMovie(url){
    fetch(url).then(response => response.json()).then(data =>{
        showMovie(data.results) ;
    })
}

function showMovie(data){
    console.log(data.title);
    data.map(data =>{
        let {poster_path , vote_average , title} = data;
        let link = 'https://image.tmdb.org/t/p/w500' + poster_path ;
        let rating = vote_average + '/10' ;
        section.innerHTML += 
           `<div class = "shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-200">
                <img src="${link}" alt="">
                <div class="p-4 space-y-3">
                    <button class="px-4  py-1  bg-black  text-green-300  rounded-sm  text-sm  opacity-80">Fantasy</button>
                    <div class="rating">${rating}</div>
                    <h1 id="movie-title" class="text-2xl">${title}</h1>
                </div>    
            </div>`
    })
}


let form = document.getElementById('form') ;
let inputBar = document.getElementById('input-bar') ;
let movieTitle = document.getElementById('movie-title') ;

form.addEventListener('keyup' , (e) =>{
    e.preventDefault() ;
    let searchMovieName = inputBar.value ;
    section.innerHTML = '' ;
    if(searchMovieName){
        getMovie(SEARCH_URL + searchMovieName) ;
    }
    else{
        getMovie(API_URL) ;
    }
})

form.addEventListener('submit' , e =>{
    e.preventDefault() ;
})





