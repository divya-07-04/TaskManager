const api = "http://localhost:8081";

async function signup(){

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;

    let role =
    document.getElementById("role").value;

    if(
        name === "" ||
        email === "" ||
        password === "" ||
        role === ""
    ){
        alert("Please fill all fields");
        return;
    }

    let user = {

        name:name,
        email:email,
        password:password,
        role:role
    };

    await fetch(api + "/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)
    });

    alert("Signup Successful");

    window.location.href = "login.html";
}

async function login(){

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let user = {

        email:email,
        password:password
    };

    let response = await fetch(api + "/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)
    });

    let data = await response.json();

    if(data && data.id){

        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        window.location.href = "index.html";
    }
    else{
        alert("Invalid Credentials");
    }
}