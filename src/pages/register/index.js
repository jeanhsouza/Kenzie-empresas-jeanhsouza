import { register } from "../../scripts/requests.js";
import { dropdown } from "../../scripts/dropdown.js";

const btnHome = document.querySelector(".btnHome");
const btnLogin = document.querySelector(".btnLogin")


btnLogin.addEventListener("click",()=>{
    window.location.replace("../login/index.html")
})

btnHome.addEventListener("click",()=>{
    window.location.replace("../home/index.html")
})

async function eventRegister(){
    const form = document.querySelector(".boxForm");
    const elements = [...form.elements];
    
    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const body = {}

        elements.forEach((elem)=>{
            if (elem.tagName == "INPUT" || elem.tagName == "SELECT" && elem.value !== ""){
                body[elem.id] = elem.value;

            }
        })

        // console.log(body)


        await register(body)    

    })
}

dropdown()
eventRegister()