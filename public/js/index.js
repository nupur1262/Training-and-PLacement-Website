function myFunction(){
    var x = document.getElementById("myInput");
if (x.type === "password") {
x.type = "text";
 
} else {
x.type = "password";
}
}
function mFunction(){
    var x = document.getElementById("pass-hidden");
if (x.type === "password") {
x.type = "text";

} else {
x.type = "password";
}
}

var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');

function register()
{
    x.style.left='-400px';
    y.style.left='50px';
    z.style.left='110px';

}
function login()
{
    x.style.left='50px';
    y.style.left='450px';
    z.style.left='0px';
}

function myyFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
  function myRead() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("mBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = ""; 
      moreText.style.display = "inline";
    }
  }
  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




// Contact1
// Get the modal
var Modal = document.getElementById("Modal");

// Get the button that opens the modal
var btnK = document.getElementById("knowMore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closee")[0];

// When the user clicks the button, open the modal 
btnK.onclick = function() {
  Modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  Modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == Modal) {
    Modal.style.display = "none";
  }
}




// contact2
// Get the modal
var Modall = document.getElementById("Modall");

// Get the button that opens the modal
var btnKn = document.getElementById("knowMoree");

// Get the <span> element that closes the modal
var spann = document.getElementsByClassName("closeee")[0];

// When the user clicks the button, open the modal 
btnKn.onclick = function() {
  Modall.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spann.onclick = function() {
  Modall.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == Modal) {
    Modall.style.display = "none";
  }
}

// contact3
// Get the modal
var Modalll = document.getElementById("Modalll");

// Get the button that opens the modal
var btnKnM = document.getElementById("knowMoreee");

// Get the <span> element that closes the modal
var spannn = document.getElementsByClassName("closeeee")[0];

// When the user clicks the button, open the modal 
btnKnM.onclick = function() {
  Modalll.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spannn.onclick = function() {
  Modalll.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == Modalll) {
    Modalll.style.display = "none";
  }
}