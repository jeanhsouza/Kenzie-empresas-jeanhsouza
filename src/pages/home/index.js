import { renderOptions, renderAllCompanies, renderCompanies } from "../../scripts/render.js";

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

await renderOptions()
await renderAllCompanies()