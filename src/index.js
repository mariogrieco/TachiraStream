// server
const socket = require('socket.io-client')('https://tachira.herokuapp.com');

//localhost
// const socket = require('socket.io-client')('...');

const yo = require('yo-yo');
const $ = window.$ = require('jquery');
let bufer = [];
let references = [];

// if (!window.Intl) {
//     window.Intl = require('intl'); // polyfill for `Intl`
      //  require('intl/locale-data/jsonp/es.js');
// }

window.IntlRelativeFormat = require('intl-relativeformat');
require('intl-relativeformat/dist/locale-data/es.js');

var rf = new IntlRelativeFormat('es');

function append(item){
    var a = document.getElementsByClassName('tweetBox')[0];
    a.insertBefore(item, document.getElementsByClassName('tweets')[0]);
}

function justGen(data){
  return yo`
        <article class="tweets">
         <div class="por">
          ${data.user.name} - <span class="arrow">@${data.user.screen_name}</span>
          ${ data.user.verified ? yo`<div class="verifu"></div>` : ''}
         </div>
         <div class="hora">
         ${new Date(data.created_at) > new Date() ? rf.format(new Date()) : rf.format(new Date(data.created_at)) }
         </div>
         <div class="contenido">
          ${data.text}
         </div>
        </article>
    `;
}

function removeLoader(){
  document.getElementsByClassName('spinner')[0].remove()
}

// *
function UPDATE(){
    references.forEach(function(item){
      yo.update(item, justGen(item.data))
    })
}

function addToBufer(data){
  var item = document.getElementsByClassName('mNum')[0];
  item.textContent = parseInt(item.textContent)+1;
  var ctx = justGen(data);
  ctx.data = data;
  bufer.push(ctx)
}


socket.on('connect', function(){
  console.log('connect')
  removeLoader()
  
});


socket.on('tweet', function (data) {
   console.log('tweet')
    addToBufer(data)
    UPDATE()
});
 
socket.on('err', function (data) {
    alert('Oh no!, Oops porfas reporta este problema!')
});

socket.on('disconnect', function(){
  console.log('disconnect')
  let item = yo`
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>`;

      var a = document.getElementsByClassName('tweetBox')[0];
          a.insertBefore(item, document.getElementsByClassName('tweets')[0]);
});

$('.gMore').on('click', () => {
    if ( references.length >= 50 && bufer.length >= 1) {
      references.forEach(function(item){
        item.remove()
      });
      references = [];
    }
    if ( bufer.length > 0 ) {
        bufer.forEach((item, index) => {
          append(item)
          references.push(item)
        })
        bufer = [];
        document.getElementsByClassName('mNum')[0].textContent = '0';
    }
})