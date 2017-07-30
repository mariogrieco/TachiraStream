const io = window.io = require('socket.io-client');
const yo = require('yo-yo')
const $ = window.$ = require('jquery')
let bufer = [[],[]]
let references = [[],[]]
// const socket = io.connect('localhost:80');
const socket = io.connect('http://tachira.herokuapp.com');

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

function removeLoader(){
  document.getElementsByClassName('spinner')[0].remove()
}

function UPDATE(){
    references[0].forEach(function(item,index){
      yo.update(item, template(references[1][index]))
    })
}

function addToBufer(data){
  var item = document.getElementsByClassName('mNum')[0];
  item.textContent = parseInt(item.textContent)+1
  bufer[0].push(template(data))
  bufer[1].push(data)
}

$('document').ready(() => {
  console.log('open port, document ready')

  removeLoader()

  socket.on('tweet', function (data) {
    UPDATE()
    addToBufer(data)
  });
 
  socket.on('err', function (data) {
    alert('Oh no!, Oops porfas reporta este problema!')
  });

  $('.gMore').on('click', () => {
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
})