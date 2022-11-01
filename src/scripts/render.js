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
        <li class="itemSector bg-grey7">
            <h3 class="itemTitle">${elem.name}</h3>
            <p class="itemText">${elem.opening_hours}</p>
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
        <li class="itemSector bg-grey7">
            <h3 class="itemTitle">${elem.name}</h3>
            <p class="itemText">${elem.opening_hours}</p>
            <span class="itemTag">${elem.sectors.description}</span>
        </li>
    `)
    })   

}