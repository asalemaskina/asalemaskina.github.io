const categories= ["Комедия", "Ужасы", "Драма", "Боевик", "Фэнтези"];
const films=[];
const openedFilms= {};
class Comment {
    constructor(text,author,stars){
        this.text=text;
        this.author=author;
        this.stars=stars;
    }
}
class Film {
    constructor(name,cat,money,experts) {
        this.name=name;
        this.category=categories[cat];
        this.comments=[];
        this.budget=money;
        this.experts=experts;
    }
    addComment (text,author,stars) {
        this.comments.push( new Comment(text,author,stars));
    }
    getAverageStars () {
        let sumStars=0;
        this.comments.forEach(comment=>sumStars+=comment.stars);
        return (this.comments.length>0)?(sumStars/this.comments.length):0;
    }
}
function getFilmsByCategory(cat) {
const newFilms=[];
for (let film of films) {
    if (film.category===cat){
        newFilms.push(film);
    }
}
return newFilms;
}


document.addEventListener("DOMContentLoaded", function () {
    for (let category of categories) {
        const newEl= document.createElement("div");
        newEl.classList.add("category");
        newEl.innerText= category;
        newEl.addEventListener("click", function () {
           onCategoryChoice (category);
        });
        document.querySelector(".categories").appendChild(newEl);
    }
});
function onCategoryChoice(categoryName) {
    document.querySelector(".films").innerHTML= "";
    const films= getFilmsByCategory(categoryName);
    for (let film of films) {
        renderFilm(film);
    }
}
function openFilmCard(film,newEl) {
    const comments = getFilmComments(film.name);
    let s='<h2>Характеристики:</h2><ul><li>Категория: '+film.category+'</li><li>Бюджет: '+film.budget+'$</li><li>Оценка экспертов: '+film.experts+'</li></ul>';
    comments.forEach(c => {
        s+=`<div class="comment">
<span class="author"> ${c.author}: </span> ${c.text} <span class="stars"> ${c.stars}</span></div>`;
});
    newEl.innerHTML+=`<div class="film-comments"> ${s}</div>`;
    const addCommentButton= document.createElement("button");
    addCommentButton.innerText="Добавить отзыв";
    addCommentButton.addEventListener("click", function (event) {
        event.stopPropagation();
        const commentForm= renderCommentForm(film);
        newEl.appendChild(commentForm);
        newEl.removeChild(addCommentButton);
    });
    newEl.appendChild(addCommentButton);
}
function renderFilm(film) {
    const newEl= document.createElement("div");
    newEl.classList.add("film");
    newEl.innerHTML=`<div class="film-name"> ${film.name}</div>`;
    newEl.addEventListener("click", function () {
        onFilmClick(film,newEl);
    });
    document.querySelector(".films").appendChild(newEl);
}
function onFilmClick(film,newEl) {
    if (openedFilms.hasOwnProperty(film.name) && openedFilms[film.name]) {
        newEl.innerHTML= '<div class="film-name"> ' +film.name+ ' </div>';
        openedFilms[film.name]= false;
    } else {
        openFilmCard(film, newEl);
        openedFilms[film.name]= true;
    }
}

function getFilmByName(filmName) {
    return films.filter(f=> f.name === filmName)[0];
}
function getFilmComments(filmName) {
    const film= getFilmByName(filmName);
    return film.comments;
}

function renderCommentForm(film) {
    const content='<div class="form-title"> Добавьте отзыв к фильму '+ film.name+' </div><div class="form-body"> <input id="author-'+film.name+'" type="text" class="form-author" placeholder="Ваше имя"><br><textarea id="comment-'+film.name+'" placeholder="Ваш отзыв" rows="10" cols="33" class="comment" ></textarea><br>' +
        '<label for="star">Оценка от 1 до 5</label> <br><input id="stars-'+film.name+'" type="number" min="1" max="5"><br> <button onclick="onAddCommentClick(\''+film.name+'\')">Отправить отзыв</button>';
    const form= document.createElement("div");
    form.classList.add("comment-form");
    form.innerHTML= content;
    form.addEventListener("click", function (event) {
        event.stopPropagation();
    });
    return form;
}
function onAddCommentClick(name) {
    const authorValue= document.getElementById("author-"+name).value;
    const commentValue= document.getElementById("comment-"+name).value;
    const starsValue= document.getElementById("stars-"+name).value;
    const film= getFilmByName(name);
    film.addComment(commentValue,authorValue,starsValue);
    onCategoryChoice(film.category);
}
films.push( new Film("Титаник", 2, 1e7,5));
films.push(new Film("Привидение", 2, 1e7,4))
films[0].addComment("awesome!!", "ainka", 5);
films[0].addComment("i cried","misha",5);
films.push (new Film("Гарри Поттер", 4, 2e6,4));
films[2].addComment("Любимый фильм!", "Мария", 5);
films[2].addComment("Little bit boring", "Volan", 4);
films.push(new Film("Один дома", 0, 2e6,5));
films[3].addComment("хаха","Вася", 5);
films.push(new Film("Звонок", 1, 2e5,3));
films[4].addComment("Very terrifying!", "Sarah", 4);
films.push(new Film("Крепкий орешек", 3, 3e6, 3));
