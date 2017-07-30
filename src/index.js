// server
const socket = require('socket.io-client')('http://tachira.herokuapp.com');

//localhost
// const socket = require('socket.io-client')('...');

const yo = require('yo-yo');
const $ = window.$ = require('jquery');
let bufer = [[],[]]
let references = [[],[]]

// if (!window.Intl) {
//     window.Intl = require('intl'); // polyfill for `Intl`
// }

window.IntlRelativeFormat = require('intl-relativeformat');
require('intl-relativeformat/dist/locale-data/es.js');

var rf = new IntlRelativeFormat('es');

function append(item){
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

function UPDATE(){
    references[0].forEach(function(item,index){
      yo.update(item, justGen(references[1][index]))
    })
}

function addToBufer(data){
  var item = document.getElementsByClassName('mNum')[0];
  item.textContent = parseInt(item.textContent)+1
  bufer[0].push(template(data))
  bufer[1].push(data)
}


socket.on('connect', function(){
  console.log('connect')
  removeLoader()
});

socket.on('tweet', function (data) {
   console.log('tweet')
    UPDATE()
    addToBufer(data)
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
    if ( references[0].length > 50 && bufer[0].length > 0) {
      references[0].forEach(function(item,index){
        item.remove()
      });
      references = [[], []];
    }
    if ( bufer[0].length > 0 ) {
        bufer[0].forEach((item, index) => {
          append(item)
          references[0].push(item)
          references[1].push(bufer[1][index])
        })

        bufer = [[], []]
        document.getElementsByClassName('mNum')[0].textContent = '0';
    }
})