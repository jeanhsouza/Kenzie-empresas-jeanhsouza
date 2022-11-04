
export function dropdown(){
    const boxHamb = document.querySelector(".boxHamb")
    const navBoxHeader = document.querySelector(".navBoxHeader")
    boxHamb.addEventListener("click", ()=>{
        if(boxHamb.src == "http://127.0.0.1:5500/src/assets/img/img_hamb.svg"){
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