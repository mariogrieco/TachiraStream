const io = require('socket.io-client');
window.io = io;
const socket = io.connect('http://tachira.herokuapp.com');
const yo = require('yo-yo')
window.$ = require('jquery')

let references = [[],[]]

// if (!window.Intl) {
//     window.Intl = require('intl'); // polyfill for `Intl`
// }

window.IntlRelativeFormat = require('intl-relativeformat');
require('intl-relativeformat/dist/locale-data/es.js');

var rf = new IntlRelativeFormat('es');


function append(item){
    let spiner = yo`<div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>`;
    var a = document.getElementsByClassName('tweetBox')[0];
    a.insertBefore(item, document.getElementsByClassName('tweets')[0]);
}

function template(data){
  let set = yo`
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
    references[0].push(set) //dom
    references[1].push(data) // object data
    return set
}

function UPDATE(){
  if ( references[0].length > 23 ){
      references[0].slice(23).forEach(function(item){
        item.remove()
      })

      references[0] = references[0].slice(0,23)
      references[1] = references[1].slice(0,23)
  }

  references[0].forEach(function(item,index){
      yo.update(item, template(references[1][index]))
  })
}
  const cola = []


     console.log('load documv')
  socket.on('tweet', function (data) {
    // console.log(data)
    append(template(data))
    UPDATE()
  });
 
  socket.on('err', function (data) {
    alert('Oh no!, Oops porfas reporta este problema!')
  });

  setInterval(UPDATE,2500)