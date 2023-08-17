const userdata = (e) => {
    e.preventDefault();

    let user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    console.log(user);
    var regexname = /^[a-zA-Z ]{2,30}$/;
    var regexemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var regexpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // name
    if (!(regexname.test(user.name))) {
        document.getElementById("username").innerHTML = "not valid name";
        document.getElementById("username").style.color = "red";
    }
    else {
        document.getElementById("username").innerHTML = "valid name"
    }
    // email
    if (!(regexemail.test(user.email))) {
        document.getElementById("useremail").innerHTML = "not valid email";
        document.getElementById("useremail").style.color = "red";
    }
    else {
        document.getElementById("useremail").innerHTML = "valid email"
    }
    // password
    if (!(regexpassword.test(user.password))) {
        document.getElementById("userpassword").innerHTML = "not valid password";
        document.getElementById("userpassword").style.color = "red";
    }
    else {
        document.getElementById("userpassword").innerHTML = "valid password"
    }

    if ((regexname.test(user.name) && (regexemail.test(user.email)) && (regexpassword.test(user.password)))) {

        fetch(`http://localhost:3000/user?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    alert("user existis")
                    setTimeout(() => {
                        window.location.href = "/pages/login.html"
                    },3000)
                }
                else {
                    fetch ("http://localhost:3000/user",{
                        method:"POST",
                        headers:{"content-type":"application/json"},
                        body:JSON.stringify(user),
                    });
                }
            });

    }
}

document.getElementById('usedata').addEventListener('submit', userdata);





