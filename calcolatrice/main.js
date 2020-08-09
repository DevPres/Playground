
/* Per la prossima volta! rcrea una funzione di reset che ti riporti la calcolatrice allo stato iniziale, poi aggiungi le modifiche caso per caso. cerca di accorciare il codice,  */

//ps isOp e op sono due variabili semaforo. fanno più o meno la stessa cosa e devi pulirle, puoi comunque usarne una.

window.addEventListener("load", (event) => {

  const buttons=document.querySelectorAll(".btn");
  const opNumbers = [0];
  const result=[];
  let lastOp;
  
  let isOp=false;
  let op = false;
  let lastBtn;

  buttons.forEach(element => element.addEventListener("click", (e)=>{
    digit(e);
  }))
//
  /* Alternative */
  /* for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("load", digit())
  } */

  function digit(e) {
    
    const btnClicked = e.target;
    const thisOp=document.querySelector("#this_op");
    //const opValue = btnClicked.innerHTML;
    const resultView = document.querySelector("#result");
    const value = btnClicked.innerHTML;
    
    if (btnClicked.hasAttribute("ugual")){
      if (!(typeof opNumbers[1] === "undefined")) {
        result[0] = calculate(op, opNumbers) 
        btnClicked.parentNode.blur();
        thisOp.innerHTML=result[0];
        console.log(opNumbers);
        op=false
        lastBtn="ugual"
        return
      } else {
        return
      }
    }

    if (btnClicked.hasAttribute("deleteOp")){
      opNumbers.length=0;
      opNumbers[0]=0;
      thisOp.innerHTML= "";
      resultView.innerHTML=0;
      op=false;
      isOp=false;
      console.log(opNumbers);
      return
    }

    if (btnClicked.hasAttribute("deleteNum")){
      if(typeof opNumbers[1] === "undefined"){
        opNumbers[0] = 0;
        thisOp.innerHTML = "";
        resultView.innerHTML = 0;
        op = false;
        isOp = false;
        return
      } else {
        
        thisOp.innerHTML=lastOp
        console.log(thisOp.innerHTML);
        opNumbers[1] = 0;
        resultView.innerHTML = 0;
      }
        
    }
  
   
    if(!btnClicked.hasAttribute("operation") && !btnClicked.hasAttribute("delete")){

      if (lastBtn === "ugual") {
        if(btnClicked.hasAttribute("dot")){
          opNumbers[0]= "0.";
          resultView.innerHTML = opNumbers[0];
          thisOp.innerHTML = opNumbers[0];
          isOp=false
        } else {
          opNumbers.length=0;
          opNumbers[0]= value;
          thisOp.innerHTML = value;
          resultView.innerHTML = opNumbers[0] ;
        }
      } else {
        if(!isOp) {
            
            opNumbers[0] = opNumbers[0] + "" + value;
            resultView.innerHTML = Number(opNumbers[0]);
            if (opNumbers[0].toString().charAt(0) === "0") {
              opNumbers[0] = opNumbers[0].toString().slice(1)
            }

            btnClicked.hasAttribute("dot") ? 
              thisOp.innerHTML=opNumbers[0] :
              thisOp.innerHTML=Number(opNumbers[0]);
          
          
          
        } else {
          typeof opNumbers[1] ==="undefined" ? 
            opNumbers[1]=value :
            opNumbers[1] +=  "" + value
          
          resultView.innerHTML= Number(opNumbers[1]);

          /* btnClicked.getAttribute("data") === "dot" ?
            thisOp.innerHTML += "" + value :
            thisOp.innerHTML += "" + Number(opNumbers[1]); */
          thisOp.innerHTML+= "" + value;
          

          //isOp=false ; 
        }
      }

    } else if (btnClicked.hasAttribute("operation")) {
      
      //here we click an operation btn. now i check if the last btn was an operation btn
      //in this case I change the sign of the operation
      if ( op !== false && lastBtn.getAttribute("operation")){
        op = e.target.getAttribute("operation");
        let opString=thisOp.innerHTML;
        //i change the sign in the display too
        thisOp.innerHTML=opString.slice(0, -1) + e.target.innerHTML;
        btnClicked.parentNode.blur();
        return
      //if last btn pressed it was not an operation btn, but the operation was defined, we can calculate the result  
      } else if (op !== false){
        result[0]=calculate( op, opNumbers);
        /* resultView.innerHTML=result[0];
        opNumbers.length=0;
        opNumbers[0]=result[0] */
        op = e.target.getAttribute("operation");
        thisOp.innerHTML = thisOp.innerHTML + "" + value
        isOp=true;
      //if the operation was not defined, we define it in the op variable  
      } else {
        op = e.target.getAttribute("operation");
        thisOp.innerHTML = thisOp.innerHTML + "" + value
        isOp=true;
      }

      lastOp = thisOp.innerHTML
    }
    
    
    console.log(opNumbers);
    //thisOp.innerHTML += "" + value;
    
    btnClicked.parentNode.blur();
    lastBtn=btnClicked



  }
  
  
  function calculate( op, arr ) {
    let thisResult
    arr[0]= Number(arr[0]);
    arr[1]= Number(arr[1]);
    switch (op) {
      case 'multiply':
        thisResult = arr.reduce((x, y) => x * y);
        break;
      case 'divide':
        thisResult = arr.reduce((x, y) => x / y);
        break;
      case 'plus':
        thisResult = arr.reduce((x, y) => x + y);
        break;
      case 'minus' :
        thisResult = arr.reduce((x, y) => x - y);
        break;
    }
    document.querySelector("#result").innerHTML = thisResult;
    opNumbers.length = 0;
    opNumbers[0] = thisResult;
    return thisResult;

  }

 

/* function debug() {
  console.log(opNumbers);
  console.log(op);
  console.log();
  console.log();
} */


})