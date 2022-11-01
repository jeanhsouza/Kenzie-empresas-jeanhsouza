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