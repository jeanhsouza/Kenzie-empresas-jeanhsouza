import { login } from "../../scripts/requests.js";

const btnHome = document.querySelector(".btnHome");
const btnRegister = document.querySelector(".btnRegister")


btnRegister.addEventListener("click",()=>{
    window.location.replace("../register/index.html")
})

btnHome.addEventListener("click",()=>{
    window.location.replace("../home/index.html")
})

async function eventLogin (){    
    const form = document.querySelector(".boxForm");
    const elements = [...form.elements]; 
    
    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const body = {}

        elements.forEach((elem)=>{
            
            if (elem.tagName == "INPUT"){
                body[elem.id] = elem.value;
                
            }              


        })

        // console.log(body)

        await login(body)

    })

    
}

eventLogin ()