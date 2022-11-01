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
            localStorage.setItem("@kenzieEmpresas:token",response.token)  
            await isAdmin()
            
            
        }

       

    }catch(err){
        console.log(err)

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
            window.location.replace("../login/index.html")
            
        }

      
    }catch(err){
        console.log(err)
    }
}

async function isAdmin(){
    const tokenUser = localStorage.getItem("@kenzieEmpresas:token");
    console.log(tokenUser)

    const request = await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
      });
  
      const response = await request.json();

      if(response.is_admin){
        window.location.replace("../dash_admin/index.html")

      }
      else{
        window.location.replace("../dash_user/index.html")
      }
}

