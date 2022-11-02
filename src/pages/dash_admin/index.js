import { renderOptionsCompanies , renderDepartments, renderAllUsers} from "../../scripts/render.js";
import { createModal } from "../../scripts/modal.js";


const btnLogout = document.querySelector(".btnLogout");
const departSelect = document.querySelector(".departSelect")

btnLogout.addEventListener("click",()=>{
    localStorage.removeItem("@kenzieEmpresas:tokenAdmin");
    window.location.replace("../home/index.html")
})

departSelect.addEventListener("change", async()=>{
    await renderDepartments(departSelect.value)
})

renderOptionsCompanies()
renderDepartments()
renderAllUsers()
