<template>
<div class="pulse"></div>
</template>
  
<style>
.pulse {
  width: .4rem;
  height: .4rem;
  border-radius: 100%;
  background: lightgreen;
  box-shadow: 0 0 0 rgba(170, 255, 164, 0.4);
  animation: pulse 1.5s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgb(48 137 24 / 80%);
  }
  70% {
      -webkit-box-shadow: 0 0 0 .7rem rgb(74 204 44 / 0%);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgb(74 204 44 / 0%);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(173, 255, 150, 0.8);
    box-shadow: 0 0 0 0 rgba(179, 255, 158, 0.8);
  }
  70% {
    -moz-box-shadow: 0 0 0 .7rem rgb(74 204 44 / 0%);
    box-shadow: 0 0 0 .7rem rgb(74 204 44 / 0%);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgb(74 204 44 / 0%);
      box-shadow: 0 0 0 0 rgb(74 204 44 / 0%);
  }
}
</style>
  