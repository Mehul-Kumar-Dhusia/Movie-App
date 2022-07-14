let section = document.getElementById('section') ;
let toggle = document.getElementById('toggle') ;
let form = document.getElementById('form') ;
let inputBar = document.getElementById('input-bar') ;
let movieTitle = document.getElementById('movie-title') ;
let nav = document.getElementById('nav') ;

let BASE_URL = 'https://api.themoviedb.org/3/' ;
let API_KEY = 'api_key=4e27f12fce9f23a24d9ca62ede5439c9' ;
let API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY ;
let SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY + '&query=' ;
let GENERE_URL = BASE_URL + 'genre/movie/list?' + API_KEY ;

getMovie(API_URL) ;

function getMovie(url){
    fetch(url).then(response => response.json()).then(data =>{
        console.log(data);
        showMovie(data.results) ;
    })
}

function showMovie(data){
    data.map(data =>{
        let {poster_path , vote_average , title , genre_ids , overview} = data;
        let genreId = genre_ids[0] ;
        let link = 'https://image.tmdb.org/t/p/w500' + poster_path ;
        let rating = vote_average + '/10' ;

        
        // let genreName = toGetGenere(genreId) ;

        fetch(GENERE_URL).then(response => response.json()).then(data =>{
            data.genres.forEach(data =>{
                if(genreId == data.id){

                    section.innerHTML += 
                    `<div class = "bg-white group relative shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-200">
                            <img src="${link}" alt="">
                            <div class="p-4 space-y-3 bg-white">
                                <button class="px-4  py-1  bg-black  text-green-300  rounded-sm  text-sm  opacity-80">${data.name}</button>
                                <div class="rating">${rating}</div>
                                <h1 id="movie-title" class="md:text-2xl text-xl">${title}</h1>
                            </div>

                            <div class="min-h-[30%] p-4 max-h-[100%] h-autp absolute bottom-0 bg-white scale-y-0 group-hover:scale-y-100 transition-all duration-300">

                               <h1 class = "font-medium text-lg mb-2">Overview</h1>
                               <p>${overview}</p>
                              
                          </div>
                                
                        </div>`
                }
                
            })
        })
        
    })
}

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

// toggle.addEventListener('click' , () =>{
     
// })

// function toGetGenere(id){
//     fetch(GENERE_URL).then(response => response.json()).then(data =>{
//         data.genres.forEach(data =>{
//             if(id == data.id){
//                 return data.name ;
//             }
//             else{
//                 return 'fantasy' ;
//             }   
//         })
//     })
// }