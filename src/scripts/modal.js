import { editUsers, deleteUsers, createDepartament, editDepartament, deleteDepartment} from "./requests.js";
import { renderAllUsers, renderDepartments, renderOptionsCompanies} from "./render.js";

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

