

// Proporcionado
let api_key="ca84594165144fe196a7e2d9b8116999";
let img_url = "https://image.tmdb.org/t/p/w500";
let genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";
let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";
let original_img_url = "https://image.tmdb.org/t/p/original";
let movie_detail_http = "https://api.themoviedb.org/3/movie";
let idioma = 'es-ES';  // Asignamos el Lenguaje


//Adaptado 
let BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+'&api_key='+api_key;
let searchURL = BASE_URL + '/search/movie?'+'&api_key='+api_key;
let api_mejor_calificadas = '/movie/top_rated?';
let api_proximamente = '/movie/upcoming?';