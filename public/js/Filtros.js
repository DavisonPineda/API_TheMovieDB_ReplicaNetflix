
const main = document.getElementById('pagina');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');






//LLenar de años el select
var myDate = new Date();
var año = myDate.getFullYear();
var year = document.getElementById('fYear');
const llenar_select = () => {
    for (var i = año; i > 1900 + 1; i--) {
        year.innerHTML += `<option value="${i}">${i}
        </option>`;
    }
}
llenar_select();



// Año seleccionado
const por_fecha = () => {
    var value_year = document.getElementById('fYear').value;
    if (value_year != 'year') {

        getMovies(BASE_URL+ '/discover/movie?'+'&api_key='+api_key+`&primary_release_year=${value_year}`+"&language="+idioma);

    }
}




//Agregar Clasificacion
var div_clasificacion = document.getElementById('flClasificacion');
const agregar_clasificaciones = () => {
    fetch('https://api.themoviedb.org/3/certification/movie/list?api_key='+api_key)
        .then(res => res.json()).then(data => {
            data.certifications.US.forEach(item => {
                div_clasificacion.innerHTML += `<p class="fTipo">
                <input onchange="imprimirClasificacion()" type="radio" name="clasificacion" required value="&certification_country=US&certification=${item.certification}" />
                ${item.certification}
              </p>`;
            })
        })
}
agregar_clasificaciones();



// Imprimir Clasificacion 
const imprimirClasificacion = () => {
    var value_clasificacion = document.getElementsByName('clasificacion');
    for (let i = 0; i < value_clasificacion.length; i++) {
        if (value_clasificacion[i].checked) {


            getMovies(BASE_URL+ '/discover/movie?'+'&api_key='+api_key+ value_clasificacion[i].value+"&language="+idioma);

        
        }
    }
}



// evaluar tipo de contenido 
const evaluar_tipo = () => {
    var valor = ''; //valor por defecto pelis
    var value_tipo = document.getElementsByName('tipo');
    for (let i = 0; i < value_tipo.length; i++) {
        if (value_tipo[i].checked) { //Si se ha seleccionado pelicula o serie
            valor = value_tipo[i].value;
           
        }
    }
    if (valor == 'serie') {


        getMovies(BASE_URL + "/discover/tv?"+"&api_key="+api_key+"&language="+idioma);
      var clik=1;

     }else if (valor == 'mejor') {

        getMovies(BASE_URL + api_mejor_calificadas+"&api_key="+api_key+"&language="+idioma);
   
    } else if (valor == 'proxima') {
        getMovies(BASE_URL + api_proximamente+"&api_key="+api_key+"&language="+idioma); 
    }
}





var lastUrl = '';
var selectedGenre = []


function setGenre() {
   
    tagsEl.innerHTML= '';
    fetch( genres_list_http +
      new URLSearchParams({
        api_key: api_key,
        language: idioma
      })
  )  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((genre) => {

        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL+'&language='+idioma +'&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
  })
}







function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
           
        })
        tagsEl.append(clear);
    }
    
}

getMovies(API_URL);
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
      
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
       
        if (movie.title == null) {
            movie.title = movie.name
        }

    
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = ` 
    
        <div class="movie2"> 
                     <img src="${movie.poster_path? img_url+movie.poster_path: "http://via.placeholder.com/1080x1580" }" alt="${movie.title}">
         </div>
            <div class="movie2-info">
             <h3>${movie.title} </h3> 
             
            
             </div>`
        main.appendChild(movieEl); // se imprime los datos

    })
}







// Evento de Busqueda

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&language='+idioma+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

