// Get the modal
let modal = document.getElementById('id01');

window.onload = () => {
    modal.style.display = "block";

    let loginBtn = document.getElementById('loginBtn');
    let registerBtn = document.getElementById('registerBtn');

    loginBtn.addEventListener('click', () => {
        let usr = document.getElementById('logEmailId').value;
        let psw = document.getElementById('logPasswordId').value;

        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (this.responseText === "success") {
                modal.style.display = "none";
                localStorage.setItem("emailWAPP", usr);

                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET","api/getLocation.php?usr="+usr,true);
                xmlhttp.send();
                xmlhttp.onload = function () {
                    let locArr = JSON.parse(xmlhttp.responseText);
                    localStorage.setItem("defaultWeatherLocation", JSON.stringify(locArr[0]));
                    dispatchEvent(new Event('locationchanged'));
                }
            } else {
                let errorMsg = document.getElementById('errMsg');
                errorMsg.style = "display: block; color: black; margin-top: 25px;";
                errorMsg.innerHTML = "Please Enter Correct Login Details";
            }
        };

        xmlhttp.open("GET","api/login.php?user="+usr+"&&password="+psw,true);
        xmlhttp.send();
    });

    registerBtn.addEventListener('click', () => {
        let regSec = document.getElementById('registerSec');
        let loginSec = document.getElementById('loginSec');
        loginSec.style = "display: none";
        regSec.style = "display: block";
    });

    let registerSecBtn = document.getElementById('registerSecBtn');

    registerSecBtn.addEventListener('click', () => {
        let usr = document.getElementById('registerEmailId').value;
        let psw = document.getElementById('registerPasswordId').value;
        let confirmPsw = document.getElementById('confPassId').value;

        if (usr === '' || psw === '' || confirmPsw === '') {
            let errorMsg = document.getElementById('errMsgReg');
            errorMsg.style = "display: block; color: black; margin-top: 25px;";
            errorMsg.innerHTML = "One of the field is empty!!!";
        } else if (psw !== confirmPsw) {
            let errorMsg = document.getElementById('errMsgReg');
            errorMsg.style = "display: block; color: black; margin-top: 25px;";
            errorMsg.innerHTML = "Please enter the same password in confirm password!!!";
        } else {
            let xmlhttp = new XMLHttpRequest();

            let usrObj = {
                email: usr,
                password: psw
            };

            let post = JSON.stringify(usrObj);

            xmlhttp.open("POST","api/registration.php",true);
            xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xmlhttp.send(post);

            xmlhttp.onload = function () {
                if(xmlhttp.responseText === "success") {
                    alert("Registration successful !!!, Please login to continue");

                    let regSec = document.getElementById('registerSec');
                    let loginSec = document.getElementById('loginSec');
                    loginSec.style = "display: block";
                    regSec.style = "display: none";
                } else {
                    let errorMsg = document.getElementById('errMsgReg');
                    errorMsg.style = "display: block; color: black; margin-top: 25px;";
                    errorMsg.innerHTML = xmlhttp.responseText;
                }
            }
        }
    });
}