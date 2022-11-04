
export function dropdown(){
    const boxHamb = document.querySelector(".boxHamb")
    const navBoxHeader = document.querySelector(".navBoxHeader")
    boxHamb.addEventListener("click", ()=>{
        if(navBoxHeader.classList.contains("none")){
            navBoxHeader.classList.remove("none")
            navBoxHeader.classList.add("flex"); 
            boxHamb.src = "../../assets/img/img_close.svg"        

        }
        else{
            navBoxHeader.classList.add("none")
            navBoxHeader.classList.remove("flex"); 
            boxHamb.src = "../../assets/img/img_hamb.svg" 
        }
    })
}