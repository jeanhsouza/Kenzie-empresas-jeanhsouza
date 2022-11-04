import { renderInfoUser } from "../../scripts/render.js";
import { createModal, modalEditLogUser } from "../../scripts/modal.js";

async function verifyPermission() {
    const user = localStorage.getItem("@kenzieEmpresas:tokenUser") || ""
    if(user == "") {
        window.location.replace("../home/index.html")
    }
    else{
        await renderInfoUser(divInfoUser)
    }
}


const btnLogout = document.querySelector(".btnLogout");
const editUser = document.querySelector(".btnEditUser")
const divInfoUser = document.querySelector(".infoUser")

verifyPermission()

btnLogout.addEventListener("click",()=>{
    localStorage.removeItem("@kenzieEmpresas:tokenUser");
    window.location.replace("../home/index.html")
})

editUser.addEventListener("click",async()=>{
    createModal(await modalEditLogUser())
})



