
  // document.getElementsByClassName('tablink')[0].click()

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  // document.getElementById("Description1").style.display = "block";

  for (i = 0; i < x.length; i++) {
    x[i].click();
    x[i].style.display = "none";
    // x[i].style.overflowY = "scroll";

  }
  tablinks = document.getElementsByClassName("tablink");
  // document.getElementsByClassName('tablink')[0].click()
  
  for (i = 0; i < x.length; i++) {
    // tablinks[0].click();
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");

  }
  document.getElementById(cityName).style.display = "block";
  // document.getElementById(cityName).style.overflowY = "scroll";
  // document.getElementById(cityName).style.height = "50%";

  evt.currentTarget.className += " w3-red";
}

