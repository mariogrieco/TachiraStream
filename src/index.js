var io = require('socket.io-client');
window.io = io;

const yo = require('yo-yo')
const socket = io.connect('http://tachira.herokuapp.com');

// if (!window.Intl) {
//     window.Intl = require('intl'); // polyfill for `Intl`
// }

// var IntlRelativeFormat = require('intl-relativeformat');
// require('intl-relativeformat/dist/locale-data/es.js');

// var rf = new IntlRelativeFormat('es');

function append(item){
    let spiner = yo`<div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>`;
    var a = document.getElementsByClassName('tweetBox')[0];
    a.insertBefore(item, document.getElementsByClassName('tweets')[0]);
}

function template(data){
    return yo`
        <article class="tweets">
         <div class="por">
          ${data.user.name} (@${data.user.screen_name})
          ${ data.user.verified ? yo`<div class="verifu"></div>` : ''}
         </div>
         <div class="hora">
         ${data.created_at}
         </div>
         <div class="contenido">
          ${data.text}
         </div>
        </article>
    `;
}

  socket.on('tweet', function (data) {
      //created_at
      //text
    append(template(data))
    // console.log(data);
  });
 
  socket.on('err', function (data) {
    // console.log('Oh no', data);
    alert('Oh no!, Oops porfas reporta este problema!')
  });