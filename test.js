anime({
targets: 'div.box.b1',
translateY:[
  {value:70,duration :520},
  {value :0,duration :1000}
],
rotate:{
  value:'2turn',
}
});



var buttonEl = document.getElementById('b1');
var buttonEl2 = document.getElementById('b2');
var buttonEl3 = document.getElementById('b3');
var buttonEl4 = document.getElementById('b4');

function animateButton(scale, duration, elasticity) {
  anime.remove(buttonEl);
  anime({
    targets: buttonEl,
    scale: scale,
    duration: duration,
    elasticity: elasticity
  });
}

function enterButton() { animateButton(1.2, 800, 400) };
function leaveButton() { animateButton(1.0, 600, 300) };

buttonEl.addEventListener('mouseenter', enterButton, false);
buttonEl.addEventListener('mouseleave', leaveButton, false);





/*anime({
  targets: ['div.box.b1','div.box.b2'],
  scale: 1.2,
  duration: 600,
  autoplay:false
});*/
/*
var buttonEl = document.querySelector('button');

var buttonAnimation = anime({
  targets: buttonEl,
  scale: 1.2,
  duration: 800,
  autoplay: false
});

function enterButton() {
  if (buttonAnimation.reversed) buttonAnimation.reverse();
  console.log(buttonAnimation);
  buttonAnimation.play();
}

function leaveButton() {
  if (!buttonAnimation.reversed) buttonAnimation.reverse();
  buttonAnimation.play();
}

buttonEl.addEventListener('mouseenter', enterButton, false);
buttonEl.addEventListener('mouseleave', leaveButton, false);
*/
