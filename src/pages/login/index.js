const btnHome = document.querySelector(".btnHome");
const btnRegister = document.querySelector(".btnRegister")


btnRegister.addEventListener("click",()=>{
    window.location.replace("../register/index.html")
})

btnHome.addEventListener("click",()=>{
    window.location.replace("../home/index.html")
})