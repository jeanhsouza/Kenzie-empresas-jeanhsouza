import { getSectors, getAllCompanies, getCompanies} from "./requests.js";

export async function renderOptions(){
    const sectors = await getSectors()
    const selectSectors = document.querySelector(".selectSectors")

    sectors.forEach(elem => {
        selectSectors.insertAdjacentHTML("beforeend",`
        <option value="${elem.description}">${elem.description}</option>
        `)
    })
}

export async function renderAllCompanies(){
    const listSector = document.querySelector(".listSector");
    const companies = await getAllCompanies()

    companies.forEach(elem => {
        listSector.insertAdjacentHTML("beforeend", `
        <li class="itemSector bg-grey7 flex flex-col gap3 pad-2">
            <h3 class="itemTitle font3">${elem.name}</h3>
            <p class="itemText font4">Abre às ${elem.opening_hours}h</p>
            <span class="itemTag">${elem.sectors.description}</span>
        </li>
    `)
    })   

}

export async function renderCompanies(sector){
    const listSector = document.querySelector(".listSector");
    const companies = await getCompanies(sector);
    listSector. innerHTML = "";

    companies.forEach(elem => {
        listSector.insertAdjacentHTML("beforeend", `
        <li class="itemSector bg-grey7 flex flex-col gap3 pad-2">
            <h3 class="itemTitle font3">${elem.name}</h3>
            <p class="itemText font4">Abre às ${elem.opening_hours}h</p>
            <span class="itemTag">${elem.sectors.description}</span>
        </li>
    `)
    })   

}