
(function () {
    'use strict';

    var style = `
/* css */
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

/* background */
body {
   background: rgba(21,31,46,0.8) url("https://i.imgur.com/LHj4Gil.jpg") center/100% fixed;
   background-repeat: no-repeat;
   background-size: cover;
}
/* global setting */
* {
  font-family: Caveat;
  color: #fff !important;
}
* {
  border-color: rgba(21,31,46,0.8);
}
/* scrollbar */
  ::-webkit-scrollbar {
    background: transparent;
    width: 5px;
}
  ::-webkit-scrollbar-corner {
    background: transparent;
}
  ::-webkit-scrollbar-track {
  background: transparent;
}
  ::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(6,171,255,1) 5%, rgba(102,0,204,1) 97%);
  -webkit-border-radius: 1ex;
.SI7vke ::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #06abff 5%, #6600CC 97%);
}
.SI7vke ::-webkit-scrollbar-track {
  background: rgba(21,31,46,0.8) !important;
}
.SI7vke ::-webkit-scrollbar {
  width: 5px !important;
}
`;

    var elem = document.createElement('style');
    elem.type = 'text/css';
    elem.innerText = style;
    document.head.appendChild(elem);
})();
