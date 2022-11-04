import { editUsers, deleteUsers, createDepartament, editDepartament, deleteDepartment , hireUser, editInfoUser} from "./requests.js";
import { renderAllUsers, renderDepartments, renderOptionsCompanies, renderUsersUnemployed, renderUsersSameDepartament, renderInfoUser} from "./render.js";

export function createModal(modalToRender){
    const body = document.querySelector("body");

    const modalBg = document.createElement("div");
    const modalBox = document.createElement("div");
    const modalClose = document.createElement("span");

    modalBg.classList = "modalBg flex items-center justify-center";
    modalBox.classList = "modalBox";
    modalClose.classList = "modalClose";

    modalClose.innerText = "X";
    modalClose.addEventListener("click",()=>{
        window.location.reload()
        modalBg.remove()
    })

    modalBox.append(modalToRender,modalClose)
    modalBg.appendChild(modalBox)
    body.appendChild(modalBg)

}

export function modalEditUser(uuid){
    const modalDiv = document.createElement("div");
    const divTitle = document.createElement("h1");
    const divForm = document.createElement("form")
    const divSelectWork = document.createElement("select");
    const divSelectLevel = document.createElement("select");
    const divFormBtn =  document.createElement("button");

    divSelectWork.insertAdjacentHTML("beforeend",`
        <option value="">Selecionar modalidade de trabalho</option>
        <option value="home office">Home Office</option>
        <option value="presencial">Presencial</option>
        <option value="híbrido">Híbrido</option>
    `)
    
    divSelectLevel.insertAdjacentHTML("beforeend",`
        <option value="">Selecionar nível profissional</option>
        <option value="estágio">Estágio</option>
        <option value="júnior">Júnior</option>
        <option value="pleno">Pleno</option>
        <option value="sênior">Sênior</option>
    `)

    modalDiv.classList = "modalDiv flex flex-col bg-grey7"
    divTitle.classList = "divTitle mg-bot1 font2"
    divForm.classList = "divForm flex flex-col gap2"
    divSelectWork.classList = "divSelectWork input1"
    divSelectLevel.classList = "divSelectLevel input1"
    divSelectWork.id = "kind_of_work"
    divSelectLevel.id = "professional_level"
    
    divTitle.innerText = "Editar Usuário";
    divFormBtn.innerText = "Editar"
    divFormBtn.type = "Submit"

    divFormBtn.addEventListener("click",async(e)=>{
        const userList = document.querySelector(".userList")
        const modalBg = document.querySelector(".modalBg")
        const elements = [...divForm.elements];

        e.preventDefault()

        const body = {}

        elements.forEach((elem)=>{
            
            if (elem.tagName == "SELECT"){
                body[elem.id] = elem.value;
                
            }             

        })
        
        await editUsers(body,uuid)
        userList.innerHTML = ""
        await renderAllUsers()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divForm);
    divForm.append(divSelectWork,divSelectLevel,divFormBtn);

    return modalDiv

}

export function modalRemoveUser(elem){
    const modalDiv = document.createElement("div")
    const divTitle = document.createElement("h1")
    const divBtn = document.createElement("button")

    modalDiv.classList = "modalDiv"
    divTitle.classList = "divTitle font2 mg-top1 mg-bot1"

    divTitle.innerText = `Realmente deseja remover o usuário ${elem.username}?`
    divBtn.innerText = "Deletar"

    divBtn.addEventListener("click", async ()=>{
        const userList = document.querySelector(".userList")
        const modalBg = document.querySelector(".modalBg")

        await deleteUsers(elem.uuid)
        userList.innerHTML = ""
        await renderAllUsers()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divBtn)

    return modalDiv
}

export async function modalCreateDepartament(uuid){
    const modalDiv = document.createElement("div");
    const divTitle = document.createElement("h1");
    const divForm = document.createElement("form")
    const divInputDepartName = document.createElement("input");
    const divInputDepartDescription = document.createElement("input");
    const divSelectCompany = document.createElement("select");
    const divSelectCompanyOption = document.createElement("option");
    const divFormBtn =  document.createElement("button");
    
    modalDiv.classList = "modalDiv flex flex-col bg-grey7"
    divTitle.classList = "divTitle mg-bot1 font2"
    divForm.classList = "divForm flex flex-col gap2"
    divInputDepartName.classList = "divInputDepartName input1"
    divInputDepartDescription.classList = "divInputDepartDescription input1"
    divSelectCompany.classList = "divSelectCompany input1"
    divInputDepartName.id = "name"
    divInputDepartDescription.id = "description"
    divSelectCompany.id = "company_uuid"
    
    divTitle.innerText = "Criar Departamento";
    divFormBtn.innerText = "Criar o departamento"
    divInputDepartName.placeholder = "Nome do departamento"
    divInputDepartDescription.placeholder = "Descrição" 
    divSelectCompanyOption.value = ""  
    divSelectCompanyOption.innerText = "Selecionar empresa" 
    divFormBtn.type = "Submit"

    divSelectCompany.appendChild(divSelectCompanyOption);
    await renderOptionsCompanies(divSelectCompany)

    divFormBtn.addEventListener("click",async(e)=>{
        const departList = document.querySelector(".departList")
        const modalBg = document.querySelector(".modalBg")
        const elements = [...divForm.elements];

        e.preventDefault()

        const body = {}

        elements.forEach((elem)=>{
            
            if (elem.tagName == "INPUT" ||elem.tagName == "SELECT"){
                body[elem.id] = elem.value;
                
            }             

        })

        // console.log(body)
        
        await createDepartament(body)
        departList.innerHTML = ""
        await renderDepartments()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divForm);
    divForm.append(divInputDepartName,divInputDepartDescription,divSelectCompany,divFormBtn);

    return modalDiv

}

export function modalEditDepartment(elem){
    const modalDiv = document.createElement("div");
    const divTitle = document.createElement("h1");
    const divTextarea = document.createElement("textarea");
    const divButton = document.createElement("button");
    
    modalDiv.classList = "modalDiv flex flex-col bg-grey7"
    divTitle.classList = "divTitle mg-bot1 font2" 
    divTextarea.classList = "divTextarea"
    divTextarea.id = "description"

    divTitle.innerText = "Editar Departamento";
    divTextarea.innerText = elem.description;
    divButton.innerText = "Salvar alterações";

    divButton.addEventListener("click", async() =>{
        const departList = document.querySelector(".departList")
        const modalBg = document.querySelector(".modalBg")

        const body = {[divTextarea.id]: divTextarea.value}

        await editDepartament(body,elem)
        departList.innerHTML = ""
        await renderDepartments()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divTextarea,divButton)

    return modalDiv

}

export function modalRemoveDepartament(elem){
    const modalDiv = document.createElement("div")
    const divTitle = document.createElement("h1")
    const divBtn = document.createElement("button")

    modalDiv.classList = "modalDiv"
    divTitle.classList = "divTitle font2 mg-top1 mg-bot1"

    divTitle.innerText = `Realmente deseja deletar o Departamento ${elem.name} e demitir seus funcionários??`
    divBtn.innerText = "Confirmar"

    divBtn.addEventListener("click", async ()=>{
        const departList = document.querySelector(".departList")
        const modalBg = document.querySelector(".modalBg")

        await deleteDepartment(elem.uuid)
        departList.innerHTML = ""
        await renderDepartments()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divBtn)

    return modalDiv
}

export function modalViewDepartament(elem){
    const modalDivView = document.createElement("div")
    const divTitle = document.createElement("h1")
    const divHeader = document.createElement("div")
    const headerText = document.createElement("div")
    const textDescription = document.createElement("p")
    const textCompany = document.createElement("p")
    const headerCont = document.createElement("div")
    const contSelect = document.createElement("select")
    const selectDefault = document.createElement("option")
    const contBtn = document.createElement("button")
    const divList = document.createElement("ul")  

    modalDivView.classList = "modalDivView"
    divTitle.classList = "divTitle font2 mg-bot1"
    divHeader.classList = "divHeader flex"
    headerText.classList = "headerText"
    textDescription.classList = "textDescription"
    textCompany.classList = "textCompany"
    headerCont.classList = "headerCont flex flex-col"
    contSelect.classList = "contSelect"
    selectDefault.classList = "selectDefault"
    contBtn.classList = "contBtn"
    divList.classList = "divList bg-grey6 pad-1 flex flex-col wrap gap2"    

    divTitle.innerText = elem.name
    textDescription.innerText = elem.description
    textCompany.innerText = elem.companies.name
    selectDefault.innerText = "Selecionar usuário"
    selectDefault.value = "";
    contBtn.innerText = "Contratar"   

    contSelect.appendChild(selectDefault)
    renderUsersUnemployed(contSelect)
    renderUsersSameDepartament(elem,divList)

    contBtn.addEventListener("click", async()=>{
        const body = {
            user_uuid:contSelect.value,
            department_uuid: elem.uuid
        }

        await hireUser(body)
        divList.innerHTML = ""
        contSelect.innerHTML= ""
        contSelect.appendChild(selectDefault)
        renderUsersUnemployed(contSelect)
        renderUsersSameDepartament(elem,divList)
    })

    divHeader.append(headerText,headerCont)
    headerText.append(textDescription,textCompany)
    headerCont.append(contSelect,contBtn)
    modalDivView.append(divTitle,divHeader,divList)

    return modalDivView
}

export async function modalEditLogUser(){
    const modalDiv = document.createElement("div");
    const divTitle = document.createElement("h1");
    const divForm = document.createElement("form")
    const divInputName = document.createElement("input");
    const divInputEmail = document.createElement("input");
    const divInputPassword = document.createElement("input");
    const divFormBtn =  document.createElement("button");
    
    modalDiv.classList = "modalDiv flex flex-col bg-grey7"
    divTitle.classList = "divTitle mg-bot1 font2"
    divForm.classList = "divForm flex flex-col gap2"
    divInputName.classList = "divInputName input1"
    divInputEmail.classList = "divInputEmail input1"
    divInputPassword.classList = "divInputPassword input1"
    divInputName.id = "username"
    divInputEmail.id = "email"
    divInputPassword.id = "password"
    
    divTitle.innerText = "Editar Perfil";
    divFormBtn.innerText = "Editar Perfil"
    divInputName.placeholder = "Seu nome"
    divInputEmail.placeholder = "Seu e-mail" 
    divInputEmail.type = "email"    
    divInputPassword.placeholder = "Sua senha" 
    divInputPassword.type = "password"    
    divFormBtn.type = "Submit"


    divFormBtn.addEventListener("click",async(e)=>{
        const modalBg = document.querySelector(".modalBg")
        const elements = [...divForm.elements];
        const divInfoUser = document.querySelector(".infoUser")
        

        e.preventDefault()

        const body = {}

        elements.forEach((elem)=>{
            
            if (elem.tagName == "INPUT" ){
                body[elem.id] = elem.value;
                
            }             

        })

        await editInfoUser(body)
        window.location.reload()
        modalBg.remove()
    })

    modalDiv.append(divTitle,divForm);
    divForm.append(divInputName,divInputEmail,divInputPassword,divFormBtn);

    return modalDiv

}