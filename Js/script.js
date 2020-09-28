// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listener

eventListener();

function eventListener(){
    // Cuando se envia el formulario
    let agregarTweet = document.getElementById('formulario')
    agregarTweet.addEventListener('submit', agregarTweets);
    // borrar tweets
    listaTweets.addEventListener('click', borrarTweets);
    // cargar contenido
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



// Funciones

// Añadir tweets del formulario

function agregarTweets(e){
    e.preventDefault();
    // leer el valor de textarea
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.textContent = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);

    // añadiendo a localStorage
    agregarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweets(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        let aceptar = confirm('¿Desea eliminar el tweet?');
        if(aceptar == true){
            e.target.parentElement.remove();
            borrarTweetLocalStorage(e.target.parentElement.innerText);

        }
    }
}

// mostrar datos de localStorage en la lista
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.textContent = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el boton borrar al tweet
        li.appendChild(botonBorrar);
        // añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// Agregar tweet a localStorage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de String a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

// comprobar que haya elementos en localStorage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    // Revisamos valores de localStorage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Eliminar tweet de localStorage
function borrarTweetLocalStorage(tweet){

    let tweets;
    let tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}