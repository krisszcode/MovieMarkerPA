
function showHome() {
    hide();
    document.getElementById("home-title").style.display = "block";
}

function showRegister() {
    hide();
    document.getElementsByClassName("register-table")[0].style.display = "block";

}

function showLogin() {
    hide();
    document.getElementsByClassName("login-table")[0].style.display = "block";
}

function showNewfilm() {
    hide();
    document.getElementsByClassName("newfilm-table")[0].style.display = "block";
}

function hide() {
    document.getElementById("home-title").style.display = "none";
    document.getElementsByClassName("register-table")[0].style.display = "none";
    document.getElementsByClassName("login-table")[0].style.display = "none";
    document.getElementsByClassName("required-username")[0].style.display = "none";
    document.getElementsByClassName("required-password")[0].style.display = "none";
    document.getElementsByClassName("required-username-login")[0].style.display = "none";
    document.getElementsByClassName("required-password-login")[0].style.display = "none";
    document.getElementById('failed-register').style.display = "none";
    document.getElementsByClassName("newfilm-table")[0].style.display = "none";
    document.getElementsByClassName("required-title")[0].style.display = "none";
    document.getElementsByClassName("required-rating")[0].style.display = "none";
    document.getElementsByClassName("required-desc")[0].style.display = "none";
    document.getElementsByClassName("movie-list")[0].style.display = "none";
    document.getElementsByClassName("mymovie-list")[0].style.display = "none";
    document.getElementsByClassName("submovie-list")[0].style.display = "none";
    document.getElementsByClassName("sub-list")[0].style.display = "none";
    document.getElementById("row").style.display = "none";
    document.getElementById("myrow").style.display = "none";
    document.getElementById("submovierow").style.display = "none";
}

let user = "";

function getLoggedInUser() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/CheckForCookie');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                if (xhr.responseText != "") {
                    user = "user";
                    hide();
                    document.getElementById("login-buttonnav").style.display = "none";
                    document.getElementById("register-buttonnav").style.display = "none";
                    document.getElementById("logout-buttonnav").style.display = "block";
                    document.getElementById("myMovies-buttonnav").style.display = "block";
                }
                if (xhr.responseText === "admin") {
                    user = "admin";
                    document.getElementById("subscriptions-buttonnav").style.display = "block";
                    document.getElementById("newfilm-buttonnav").style.display = "block";

                }
                else if (xhr.responseText === "") {
                    user = "";
                }
            } else if (status === 500) {
                // There has been an error with the request!            
            }
        }
    }
    xhr.send();
}

function register() {
    userName = document.getElementById("user-name").value;
    userPass = document.getElementById("user-pass").value;
    if (userName === "" || userPass === "") {
        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementsByClassName("required-username")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-username")[0].style.display = "none";
        }
        if (userPass === "") {
            document.getElementsByClassName("required-password")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-password")[0].style.display = "none";
        }
    }
    function reqListener() {
        console.log(this.responseText);
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener)
    xhr.open('Post', '/Account/Register');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                console.log(status);
                // The request has been completed successfully
                hide();
                document.getElementsByClassName("login-table")[0].style.display = "block";
            } else if (status === 500) {
                // There has been an error with the request!
                console.log('failed register')
                let failedRegister = document.getElementById('failed-register')
                failedRegister.innerText = "Username is already taken."
                failedRegister.style.display = "block"
            }
        }

    }
    if (userName != "" && userPass != "") {
        var data = new FormData();
        data.append('username', userName);
        data.append('password', userPass);
        xhr.send(data);

    }
}
function isFloat(n) {
    if (!isNaN(n) && n.toString().indexOf('.') != -1) {
        return true;
    }
    return false;
}

function newfilm() {
    movieTitle = document.getElementById("movie-title").value;
    movieRating = document.getElementById("movie-rating").value;
    movieDesc = document.getElementById("movie-desc").value;
    if (movieTitle === "" || isFloat(movieRating) === false || movieDesc === "") {
        if (movieTitle === "") {
            document.getElementsByClassName("required-title")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-title")[0].style.display = "none";
        }
        if (isFloat(movieRating) === false) {
            document.getElementsByClassName("required-rating")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-rating")[0].style.display = "none";
        }
        if (movieDesc === "") {
            document.getElementsByClassName("required-desc")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-desc")[0].style.display = "none";
        }
    }
    //function reqListener() {
    //    console.log(this.responseText);
    //}
    var xhr = new XMLHttpRequest();
    xhr.open('Post', '/Movie/NewFilm');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                alert("success!");
                // The request has been completed successfully
                hide();
                document.getElementsByClassName("newfilm-table")[0].style.display = "block";
            } else if (status === 500) {
               
            }
        }
    }
    if (movieTitle != "" && isFloat(movieRating) != false && movieDesc != "") {
        var data = new FormData();
        data.append('title', movieTitle);
        data.append('rating', movieRating);
        data.append('desc', movieDesc);
        xhr.send(data);
        console.log(xhr.response)
    }
}

function login() {
    userName = document.getElementById("loginuser-name").value
    userPass = document.getElementById("loginuser-pass").value

    if (userName === "" || userPass === "") {

        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementsByClassName("required-username-login")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-username-login")[0].style.display = "none";
        }
        if (userPass === "") {
            document.getElementsByClassName("required-password-login")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("required-password-login")[0].style.display = "none";
        }
    }
    else {
        // New POST request to controller
        var xhr = new XMLHttpRequest()
        xhr.open('Post', '/Account/Login')

        xhr.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    user = "user";
                    console.log(xhr.responseText)
                    hide();
                    document.getElementById("login-buttonnav").style.display = "none";
                    document.getElementById("register-buttonnav").style.display = "none";
                    document.getElementById("logout-buttonnav").style.display = "block";
                    document.getElementById("myMovies-buttonnav").style.display = "block";

                    if (xhr.responseText == "admin") {
                        user = "admin";
                        document.getElementById("subscriptions-buttonnav").style.display = "block";
                        document.getElementById("newfilm-buttonnav").style.display = "block";
                    }

                } else if (status === 500) {
                    // There has been an error with the request!
                    console.log('failed login')
                    let failedlogin = document.getElementById('failed-login')
                    failedlogin.innerText = "Invalid. Please try again."
                    failedlogin.style.display = "block"
                }
            }
        };
        // Sending login details to controller 
        if (userName != "" && userPass != "") {
            var data = new FormData()
            data.append('username', userName)
            data.append('password', userPass)
            xhr.send(data)
        }
    }
}
/* -----  log in function ends -----  */


function logout() {
    hide();
    user = "";
    document.getElementById("login-buttonnav").style.display = "block";
    document.getElementById("register-buttonnav").style.display = "block";
    document.getElementById("logout-buttonnav").style.display = "none";
    document.getElementById("myMovies-buttonnav").style.display = "none";
    document.getElementById("subscriptions-buttonnav").style.display = "none"
    document.getElementById("newfilm-buttonnav").style.display = "none";
    document.getElementById("home-title").style.display = "block";
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    xhr.send();
}


function movies() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Movie/ListMovies');
    hide();
    console.log("req sent");
    document.getElementsByClassName("movie-list")[0].style.display = "block";
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                console.log(xhr.responseText);
                let jsonModel = JSON.parse(xhr.responseText);
                let ul = document.getElementById("row");
                ul.innerHTML = "";
                for (var i = 0; i < jsonModel.length; i++) {
                    if (jsonModel.length > 0) {
                        document.getElementById("row").style.display = "block";
                        let liel = document.createElement("li");
                        liel.setAttribute("class", "element");
                        liel.innerText = liel.innerText + "Movie title: " + jsonModel[i].title + " Movie rating: " + jsonModel[i].rating + " Movie desc: " + jsonModel[i].desc;
                        ul.appendChild(liel);
                        if (user != "") {
                            let button = document.createElement("button");
                            button.setAttribute("class", "addbuttons");
                            button.setAttribute("id", "addbuttonid" + jsonModel[i].title);
                            liel.appendChild(button);
                            button.innerText = "Add Movie";
                            button.addEventListener("click", function () {
                                var id = button.getAttribute('id');
                                addMovie(id);
                            });
                        }
                    }
                }
            }
        }
    };
    xhr.send();
}

function addMovie(id) {
    console.log("ez a title az addmovie fgvből: " + id);
    var xhr = new XMLHttpRequest();
    xhr.open('Post', '/Movie/AddMovie');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                if (xhr.responseText === '"Added"') {
                    alert("Movie added to your list");  
                }
                if (xhr.responseText === '"CantAdd"') {
                    alert("you cannot add a movie twice, and can't subscribe more than 5 movies!")
                }
            }
        }
    };
    var data = new FormData()
    data.append('title', id);
    console.log(id);
    xhr.send(data);
}

function myMovies() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Movie/ListMyMovies');
    hide();
    console.log("req sent");
    document.getElementsByClassName("mymovie-list")[0].style.display = "block";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                console.log(xhr.responseText);
                let jsonModel = JSON.parse(xhr.responseText);
                let ul = document.getElementById("myrow");
                ul.innerHTML = "";
                for (var i = 0; i < jsonModel.length; i++) {
                    if (jsonModel.length > 0) {
                        document.getElementById("myrow").style.display = "block";
                        let liel = document.createElement("li");
                        liel.setAttribute("class", "myelement");
                        liel.innerText = liel.innerText + "Movie title: " + jsonModel[i].title;
                        ul.appendChild(liel);
                        let delbutton = document.createElement("button");
                        delbutton.setAttribute("class", "deletebuttons");
                        delbutton.setAttribute("id", "deletebuttonsid" + jsonModel[i].title);
                        liel.appendChild(delbutton);
                        delbutton.innerText = "delete movie";
                        delbutton.addEventListener("click", function () {
                            var delmyid = delbutton.getAttribute('id');
                            deleteMyMovie(delmyid);
                        });
                    }
                }
            }
        }
    };
    xhr.send();
}

function deleteMyMovie(delmyid) {
    var xhr = new XMLHttpRequest();
    xhr.open('Delete', '/Movie/DeleteMyMovie');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                alert("Deleted successfully")
                myMovies();
            }
        }
    }
    var data = new FormData()
    data.append('title', delmyid);
    console.log(delmyid);
    xhr.send(data);
}


function subscriptions(){
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Movie/ListMovies');
    hide();
    document.getElementsByClassName("submovie-list")[0].style.display = "block";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                console.log(xhr.responseText);
                let jsonModel = JSON.parse(xhr.responseText);
                let ul = document.getElementById("submovierow");
                ul.innerHTML = "";
                for (var i = 0; i < jsonModel.length; i++) {
                    if (jsonModel.length > 0) {
                        document.getElementById("submovierow").style.display = "block";
                        let liel = document.createElement("li");
                        liel.setAttribute("class", "subelements");
                        liel.innerText = liel.innerText + "Movie title: " + jsonModel[i].title;
                        ul.appendChild(liel);
                        let subbutton = document.createElement("button");
                        subbutton.setAttribute("class", "showsubbuttons");
                        subbutton.setAttribute("id", "showsubid" + jsonModel[i].title);
                        liel.appendChild(subbutton);
                        subbutton.innerText = "show subs";
                        subbutton.addEventListener("click", function () {
                            var subid = subbutton.getAttribute('id');
                            showSubs(subid);
                        });
                        let delbutton = document.createElement("button");
                        delbutton.setAttribute("class", "deletebuttons");
                        delbutton.setAttribute("id", "deletebuttonsid" + jsonModel[i].title);
                        liel.appendChild(delbutton);
                        delbutton.innerText = "delete movie";
                        delbutton.addEventListener("click", function () {
                            var delid = delbutton.getAttribute('id');
                            deleteMovie(delid);
                        });
                    }
                }

            }
        }
    };
    xhr.send();
}

function showSubs(subid) {
    var xhr = new XMLHttpRequest();
    hide();
    document.getElementsByClassName("sub-list")[0].style.display = "block";
    xhr.open('POST', '/Movie/GetUserByMovie');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                let jsonModel = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                let ul = document.getElementById("subrow");
                ul.innerHTML = "";
                for (var i = 0; i < jsonModel.length; i++) {
                    document.getElementById("subrow").style.display = "block";
                    let liel = document.createElement("li");
                    liel.setAttribute("class", "subelement");
                    console.log(jsonModel[i]);
                    liel.innerText = liel.innerText + "sub name: " + jsonModel[i].name;
                    ul.appendChild(liel);
                }
            }
        }
    };
    var data = new FormData()
    data.append('title', subid);
    console.log(subid);
    xhr.send(data);
}


function deleteMovie(delid) {
    var xhr = new XMLHttpRequest();
    xhr.open('Delete', '/Movie/DeleteMovie');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            console.log(status);
            if (status === 0 || (status >= 200 && status < 400)) {
                alert("Deleted successfully")
                subscriptions();
            }
        }
    }
    var data = new FormData()
    data.append('title', delid);
    console.log(delid);
    xhr.send(data);
}
