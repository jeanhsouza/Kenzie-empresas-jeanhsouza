const btnHome = document.querySelector(".btnHome");
const btnLogin = document.querySelector(".btnLogin")


btnLogin.addEventListener("click",()=>{
    window.location.replace("../login/index.html")
})

btnHome.addEventListener("click",()=>{
    window.location.replace("../home/index.html")
})