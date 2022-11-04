import { renderOptions, renderAllCompanies, renderCompanies } from "../../scripts/render.js";
import { dropdown } from "../../scripts/dropdown.js";

const selectSectors = document.querySelector(".selectSectors");
const btnlogin = document.querySelector(".btnlogin");
const btnRegister = document.querySelector(".btnRegister")

selectSectors.addEventListener("change", async ()=>{
    await renderCompanies(selectSectors.value)
})

btnRegister.addEventListener("click",()=>{
    window.location.replace("../register/index.html")
})

btnlogin.addEventListener("click",()=>{
    window.location.replace("../login/index.html")
})

dropdown()
await renderOptions()
await renderAllCompanies()