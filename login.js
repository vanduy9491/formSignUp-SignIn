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
        alert('Mật khẩu không trùng khớp!! Vui lòng kiểm tra lại');
        return false;
    }
    let pw = password.length;
    if (pw < 6 && pw != "") {
        alert('Mật khẩu quá ngắn, vui lòng nhập trên 6 ký tự');
        return false;
    }
    let user = {
        'userName': Uname,
        'password': password,
        'email': email,
    }
    if (Uname == "" || password == "" || email == "") {
        alert(" Vui lòng nhập đầy đủ thông tin");
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
            alert('Username không được nhập khoảng trắng');
            return false;
        } else {
            setStorage(userList);
        }
    }
    return true
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

function validate() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    if (userName == "" && password == "") {
        alert("Vui lòng nhập Username và password");
        return false;
    } else if (userName == "") {
        alert("Hãy nhập Username");
        return false;
    } else if (password == "") {
        alert("Hãy nhập password");
        return false;
    }
    if (check(userName)) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userName === userName) {
                if (userList[i].password === password) {
                    alert('Đăng nhập thành công');
                    return true;
                } else {
                    alert('Sai mật khẩu');
                    return false;
                }
            }
        }
    } else {
        alert("Username không tồn tại");
        return false;
    }
}