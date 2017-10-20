//Eventlistener : luisterd naar klik van de submit button
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save de Bookmarks
function saveBookmark(e){
  // haal de form waardes
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  // ga na of bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    // init array
    var bookmarks = [];
    // voeg toe aan de array
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
  // Haal de bookmarks van de localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // voeg de bookmarks toe
  bookmarks.push(bookmark);
  //re-set terug naar localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  fectchBookmarks();
  // voorkomt dat het formulier submit
  e.preventDefault();
}

// delete bookmarks
function deleteBookmark(url){

  //Haal de bookmarks van de localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop door de bookmarks op zoek naar de url
  for(var i=0; i<bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // wis de bookmarks url
      bookmarks.splice(i,1);
    }
  }
  //re-set terug naar localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // vang opnieuw de bookmarks na aanpassing
  fectchBookmarks();
}

// vang de bookmarks
function fectchBookmarks(){
  //haal de bookmarks van de localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // console.log(bookmarks);
  // haal de output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // opbouw va de html output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Bezoek</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Verwijder</a>'+
                                  '</h3>'+
                                  '</div>';

  }
}

// validatie van het formulier
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Vul het formulier is aub!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Gebruik een geldige URL!');
    return false;
  }

  return true;
}
