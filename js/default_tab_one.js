function goToFirstTab(rules,contact,des_tab,description){
    x = document.getElementsByClassName("city");
    document.getElementById(rules).className = document.getElementById(rules).className.replace(" w3-red","");
    document.getElementById(contact).className = document.getElementById(contact).className.replace(" w3-red","");

    document.getElementById(des_tab).className += " w3-red";
    for (i = 0; i < x.length; i++) {
        x[i].click();
        x[i].style.display = "none";
        // x[i].style.overflowY = "scroll";

    }
    // document.getElementsByClassName("tab1").style.display = "block";

    // tablinks[0].className = tablinks[i].className.replace(" w3-red", "");
    document.getElementById(description).style.display = "block";
}