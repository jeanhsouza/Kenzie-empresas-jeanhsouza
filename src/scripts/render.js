import { getSectors, getAllCompanies, getCompanies, getDepartment, getAllUsers, getUsersUnemployed, fireUser} from "./requests.js";
import { createModal, modalEditUser, modalRemoveUser, modalEditDepartment ,modalRemoveDepartament, modalViewDepartament} from "./modal.js";

export async function renderOptions(){
    const sectors = await getSectors()
    const selectSectors = document.querySelector(".selectSectors")

    sectors.forEach(elem => {
        selectSectors.insertAdjacentHTML("beforeend",`
        <option value="${elem.description}">${elem.description}</option>
        `)
    })
}

export async function renderOptionsCompanies(actualSelect){
    const companies = await getAllCompanies()

    companies.forEach(elem =>{
        actualSelect.insertAdjacentHTML("beforeend", `
        <option value="${elem.uuid}">${elem.name}</option>
        `)
    })
}

export async function renderUsersUnemployed(actualSelect){
    const users = await getUsersUnemployed()

    users.forEach(elem =>{
        actualSelect.insertAdjacentHTML("beforeend", `
        <option value="${elem.uuid}">${elem.username}</option>
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

export async function renderDepartments(uuid){
    const departList = document.querySelector(".departList");
    const departments = await getDepartment(uuid);

    departList.innerHTML= ""

    departments.forEach(elem =>{

        const departItem = document.createElement("li");
        const departItemTitle = document.createElement("h3");
        const departDescription = document.createElement("p");
        const departCompanyName = document.createElement("p");
        const departNav = document.createElement("div");
        const departView = document.createElement("img");
        const departEdit = document.createElement("img");
        const departDelete = document.createElement("img");

        departItem.classList = "departItem bg-grey7 flex flex-col gap3 pad-2";
        departItemTitle.classList = "departItemTitle font3"
        departDescription.classList = "departDescription"
        departCompanyName.classList = "departCompanyName"
        departNav.classList = "departNav flex justify-center gap2"
        departView.classList = "departView icon"
        departEdit.classList = "departEdit icon"
        departDelete.classList = "departDelete icon"

        departItemTitle.innerText = elem.name;
        departDescription.innerText = elem.description;
        departCompanyName.innerText = elem.companies.name;
        departView.src = "../../assets/img/eye_blue.svg";
        departEdit.src = "../../assets/img/pen_black.svg";
        departDelete.src = "../../assets/img/trash.svg";

        departView.addEventListener("click", ()=>{
            createModal(modalViewDepartament(elem))
        })

        departEdit.addEventListener("click", ()=>{
            createModal(modalEditDepartment(elem))
        })

        departDelete.addEventListener("click", ()=>{
            createModal(modalRemoveDepartament(elem))
        })

        departNav.append(departView,departEdit,departDelete);
        departItem.append(departItemTitle,departDescription,departCompanyName,departNav);
        departList.appendChild(departItem);

        // departList.insertAdjacentHTML("beforeend", ` 
        // <li class="departItem bg-grey7">
        //     <h3 class="departItemTitle">${elem.name}</h3>
        //     <p class="departDescription">${elem.description}</p>
        //     <p class="departCompanyName">${elem.companies.name}</p>
        //     <div class="departNav">
        //         <img src="../../assets/img/eye_blue.svg" alt="" class="departView">
        //         <img src="../../assets/img/pen_black.svg" alt="" class="departEdit">
        //         <img src="../../assets/img/trash.svg" alt="" class="departDelete">
        //     </div>
        // </li>
        // `)        
    })
}

export async function renderAllUsers(){
    const userList = document.querySelector(".userList");
    const users = await getAllUsers(); 
    const departament = await getDepartment()
        
    users.forEach (async (elem) => {       

        async function verifyCompany(){
            if(elem.department_uuid == null){
                return "Desempregado"
            }
            else{
                const departament = await getDepartment()
                const departamentfilter = departament.filter(item => item.uuid == elem.department_uuid )
                return departamentfilter[0].companies.name
            }
        }

        if(elem.username != "ADMIN"){
            const userItem = document.createElement("li");
            const userItemTitle = document.createElement("h3");
            const userDescription = document.createElement("p");
            const userCompanyName = document.createElement("p");
            const userNav = document.createElement("div");
            const userEdit = document.createElement("img");
            const userDelete = document.createElement("img");

            userItem.classList = "userItem bg-grey7 flex flex-col gap3 pad-2";
            userItemTitle.classList = "userItemTitle font3";
            userDescription.classList = "userDescription";
            userCompanyName.classList = "userCompanyName";
            userNav.classList = "userNav flex justify-center gap2";
            userEdit.classList = "userEdit icon";
            userDelete.classList = "userDelete icon";

            userItemTitle.innerText = elem.username;
            userDescription.innerText = elem.professional_level;
            userCompanyName.innerText = await verifyCompany();
            userEdit.src = "../../assets/img/pen_blue.svg";
            userDelete.src = "../../assets/img/trash.svg";

            userEdit.addEventListener("click", ()=>{
                createModal(modalEditUser(elem.uuid))
            })

            userDelete.addEventListener("click", ()=>{
                createModal(modalRemoveUser(elem))
            })

            userNav.append(userEdit,userDelete);
            userItem.append(userItemTitle,userDescription,userCompanyName,userNav)
            userList.append(userItem);
        }

        

    //     userList.insertAdjacentHTML("beforeend",`
    //     <li class="userItem bg-grey7">
    //         <h3 class="userItemTitle">${elem.username}</h3>
    //         <p class="userDescription">${elem.professional_level}</p>
    //         <p class="userCompanyName">${elem.department_uuid}</p>
    //         <div class="userNav">
    //             <img src="../../assets/img/pen_blue.svg" alt="" class="userEdit">
    //             <img src="../../assets/img/trash.svg" alt="" class="userDelete">
    //         </div>
    //     </li>
    // `)
    })
}

export async function renderUsersSameDepartament(elem,actualList){
    const users = await getAllUsers();
    const usersfilter = users.filter(element => element.department_uuid == elem.uuid)

    usersfilter.forEach(user => {        

        const divItem = document.createElement("li")
            const itemTitle = document.createElement("h3");
            const itemLevel = document.createElement("p")
            const itemCompany = document.createElement("p")
            const divItemButton = document.createElement("div")
            const itemButton = document.createElement("button")

            divItem.classList = "divItem bg-grey7 pad-1"
            itemTitle.classList = "itemTitle"
            itemLevel.classList = "itemLevel"
            itemCompany.classList = "itemCompany"
            divItemButton.classList = "divItemButton"
            itemButton.classList = "itemButton"

            itemTitle.innerText = user.username
            itemLevel.innerText = user.professional_level
            itemCompany.innerText = elem.companies.name
            itemButton.innerText = "Desligar"

            itemButton.addEventListener("click", async()=>{
                const divList = document.querySelector(".divList")
                const contSelect = document.querySelector(".contSelect")
                const selectDefault = document.querySelector(".selectDefault")

                await fireUser(user.uuid);
                divList.innerHTML = ""
                contSelect.innerHTML= ""
                contSelect.appendChild(selectDefault)
                renderUsersUnemployed(contSelect)
                renderUsersSameDepartament(elem,divList)
            })
            
            divItem.append(itemTitle,itemLevel,itemCompany,divItemButton)
            divItemButton.appendChild(itemButton)
            
            actualList.appendChild(divItem)           

   
    })
}