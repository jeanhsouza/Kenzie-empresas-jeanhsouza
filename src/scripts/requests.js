import { toast } from "./toast.js";

const baseURL = "http://localhost:6278";

export async function getSectors (){
    const request = await fetch (`${baseURL}/sectors`)
    try{
        const response = await request.json()
        return response

    }catch{

    }
}

export async function getAllCompanies (){
    const request = await fetch (`${baseURL}/companies`)
    try{
        const response = await request.json()
        return response
    }catch{

    }
}

export async function getCompanies (sector){
    const request = await fetch (`${baseURL}/companies/${sector}`)
    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function login(body){
    try{

        const request = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(body)
        })

        const response = await request.json();

        if (request.ok){        
          toast("sucess","Login realizado com sucesso!")
          setTimeout(async()=>{
            await isAdmin(response.token) 
          },3000)
        }else{
          toast("fail","Email ou senha invalidos!")
        }

       

    }catch(err){
      toast("fail","Email ou senha invalidos!")

    }
}

export async function register(body){
    try{

        const request = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(body)
        })

        if(request.ok){          
          toast("sucess","Criação de usuário bem sucedida!")
          setTimeout(()=>{
            window.location.replace("../login/index.html") 
          },3000)
            
        }
        else{
          toast("fail","Não foi possível criar este usuário!")
        }

      
    }catch(err){
        console.log(err)
    }
}

async function isAdmin(token){

    const request = await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const response = await request.json();

      if(response.is_admin){
        localStorage.setItem("@kenzieEmpresas:tokenAdmin",token) 
        window.location.replace("../dash_admin/index.html")

      }
      else{
        localStorage.setItem("@kenzieEmpresas:tokenUser",token) 
        window.location.replace("../dash_user/index.html")
      }
}

export async function getDepartment (uuid = ""){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments/${uuid}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },       
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function getAllUsers (){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/users`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function editUsers(body,uuid){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/admin/update_user/${uuid}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function deleteUsers(uuid){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/admin/delete_user/${uuid}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function createDepartament(body){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function editDepartament(body,elem){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments/${elem.uuid}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function deleteDepartment(uuid){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments/${uuid}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function getUsersUnemployed (){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/admin/out_of_work`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function hireUser(body){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments/hire/`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function fireUser(iduser){
    const token = localStorage.getItem("@kenzieEmpresas:tokenAdmin")
    const request = await fetch (`${baseURL}/departments/dismiss/${iduser}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function getInfoUser(){
  const token = localStorage.getItem("@kenzieEmpresas:tokenUser")
    const request = await fetch (`${baseURL}/users/profile`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },       
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function getInfoCoworkers(){
  const token = localStorage.getItem("@kenzieEmpresas:tokenUser")
    const request = await fetch (`${baseURL}/users/departments/coworkers/`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },       
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function getInfoCompany(){
  const token = localStorage.getItem("@kenzieEmpresas:tokenUser")
    const request = await fetch (`${baseURL}/users/departments`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },       
      })

    try{
        const response = await request.json()
        return response
    }catch{
        
    }
}

export async function editInfoUser(body){
  const token = localStorage.getItem("@kenzieEmpresas:tokenUser")
  const request = await fetch (`${baseURL}/users`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    })

  try{
      const response = await request.json()
      return response
  }catch{
      
  }
}