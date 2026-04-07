let requestURL = 'list.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';

request.send();

request.onload = function() {
  let listJSON = request.response;
  listJSON = JSON.parse(JSON.stringify(listJSON));

  pageList(listJSON.lists)
}

function pageList(els) {
  let section = document.querySelector('.js-lists');

  els.forEach(function(el) {
    let link = el.link;
    let img = el.img;
    let copy = el.copy;
    let item = el.item;
    let price = el.price;
    let size = el.size;
    
    let itemList = '<li class="'+ size +'">' +
    '<a href="' + link + '">' +
    '<img src="' + img + '" alt="' +item+'">' +
    '<div class="detail">' +
    '<p>' + copy + '</p>' +
    '<p>' + item + '</p>' +
    '<p>' + price + '</p>' +
    '<p class="detailBtn">くわしく見る</p>' +
    '</div>' +
    '</a>' +
    '</li>';

    section.insertAdjacentHTML('beforeend', itemList);
  });
}