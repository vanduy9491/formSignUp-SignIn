const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_in_btn.addEventListener("click", function () {
    container.classList.remove("sign-up-mode");
});

sign_up_btn.addEventListener("click", function () {
    container.classList.add("sign-up-mode");
});

function setStorage(data) {
    window.localStorage.setItem('inforUser', JSON.stringify(data));
}

function getStorage(key) {
    return JSON.parse(window.localStorage.getItem(key))
}
let userList = [];

function init() {
    if (getStorage('inforUser') == null) {
        setStorage(userList);
    } else {
        userList = getStorage('inforUser');
    }
}

function setInfor() {
    let Uname = document.getElementById("uname").value;
    let password = document.getElementById("pw").value;
    let rePassword = document.getElementById("rpw").value;
    let email = document.getElementById("email").value;
    if (password != rePassword) {
        showMessage2('Mật khẩu không trùng khớp!! Vui lòng kiểm tra lại');
        return false;
    }
    let pw = password.length;
    if (pw < 6 && pw != "") {
        showMessage2('Mật khẩu quá ngắn, vui lòng nhập trên 6 ký tự');
        return false;
    }
    let user = {
        'userName': Uname,
        'password': password,
        'email': email,
    }
    if (Uname == "" || password == "" || email == "") {
        showMessage2(" Vui lòng nhập đầy đủ thông tin");
        return false;
    } else {
        let isFind = false;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userName == Uname) {
                isFind = true;
                userList[i] = user;
            }
        }
        if (!isFind) {
            userList.push(user)
        }
        if (Uname.indexOf(' ') >= 0) {
            showMessage2('Username không được nhập khoảng trắng');
            return false;
        } else {
            setStorage(userList);
        }
        let the_email = document.getElementById("email").value;
        let at = the_email.indexOf("@");
        let dot = the_email.lastIndexOf(".");
        let space = the_email.indexOf(" ");

        if ((at != -1) &&
            (at != 0) &&
            (dot != -1) &&
            (dot > at + 1) && (dot < the_email.length - 1) &&
            (space == -1)) {
            return true;
        } else {
            showMessage2("Email không hợp lệ");
            return false;
        }
    }

}

function check(user) {
    for (let contact of userList) {
        let check1 = contact.userName;
        if (check1 == user) {
            return true
        }
    }
    return false;
}

function showMessage1(message) {
    let msg = document.getElementById('msg');
    msg.classList.remove('d-none');
    msg.classList.add('alert-error');
    let content = msg.children[0];
    content.innerHTML = message;
}

function showMessage2(message) {
    let msg = document.getElementById('msg2');
    msg.classList.remove('d-none');
    msg.classList.add('alert-error');
    let content = msg.children[0];
    content.innerHTML = message;
}

function closeMessage() {
    let msg = document.getElementById('msg');
    msg.classList.add('d-none');
}

function closeMessage2() {
    let msg = document.getElementById('msg2');
    msg.classList.add('d-none');
}

function validate() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    if (userName == "" && password == "") {
        showMessage1("Hãy nhập Username và Password")
        return false;
    } else if (userName == "") {
        showMessage1("Hãy nhập Username ")
        return false;
    } else if (password == "") {
        showMessage1("Hãy nhập  Password")
        return false;
    }
    if (check(userName)) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userName === userName) {
                if (userList[i].password === password) {
                    return true;
                } else {
                    showMessage1('Sai mật khẩu');
                    return false;
                }
            }
        }
    } else {
        showMessage1("Username không tồn tại");
        return false;
    }
}