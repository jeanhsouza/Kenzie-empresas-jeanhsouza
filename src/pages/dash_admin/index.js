import { renderOptionsCompanies , renderDepartments, renderAllUsers} from "../../scripts/render.js";
import { createModal, modalCreateDepartament } from "../../scripts/modal.js";


const btnLogout = document.querySelector(".btnLogout");
const btnCreate = document.querySelector(".btnCreate")
const departSelect = document.querySelector(".departSelect")

btnLogout.addEventListener("click",()=>{
    localStorage.removeItem("@kenzieEmpresas:tokenAdmin");
    window.location.replace("../home/index.html")
})

btnCreate.addEventListener("click", async ()=>{
    createModal(await modalCreateDepartament())
})

departSelect.addEventListener("change", async()=>{
    await renderDepartments(departSelect.value)
})

renderOptionsCompanies(departSelect)
renderDepartments()
renderAllUsers()
