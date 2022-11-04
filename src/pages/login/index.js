import { login } from "../../scripts/requests.js";
import { dropdown } from "../../scripts/dropdown.js";

const btnHome = document.querySelector(".btnHome");
const btnRegister = document.querySelector(".btnRegister")
const AcessRegister = document.querySelector(".AcessRegister")

AcessRegister.addEventListener("click",()=>{
    window.location.replace("../register/index.html")
})

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

dropdown()
eventLogin ()