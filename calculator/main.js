
window.addEventListener("load", (event) => {

  const buttons=document.querySelectorAll(".btn");
  /* is where i'll show all the operation */
  const thisOp = document.querySelector("#this_op");
  /* is where i'll show the result of the operation */
  const resultView = document.querySelector("#result");
  /* here i save the numbers of the operation */
  const opNumbers = [0];
  /* here i save the result */
  const result=[];
  /* here i save the last operation */
  let lastOp;
  /* here i save wich operation i'm doing */
  let op = false;
  /* here i save the last button clicked */
  let lastBtn;

  /* add the event click on the buttons */
  buttons.forEach(element => element.addEventListener("click", (e)=>{
    digit(e);
  }))
  /* Alternative */
  /* for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("load", digit())
  } */

  
  function digit(e) {
    const btnClicked = e.target;
    const value = btnClicked.innerHTML;
    /* calculate the width of the text in the div #this_op */
    let thisOp_width=getTextWidth(thisOp.innerHTML, "bold 14.4px verdana")

    /* if the result is infinite i reset the calculator(ex n/0) */
    if(!isFinite(opNumbers[0])) {
      reset()
    }

    /* i set a limit of digits for a number*/
    if (resultView.innerHTML.length >= 20 && btnClicked.hasAttribute("number") && !lastBtn.hasAttribute("operation")){
      btnClicked.parentNode.blur();
      return
    }

    /* if the width of the operation overflow the display, add a scrollbar */
    if (thisOp_width > (document.querySelector(".display-box").offsetWidth )){
      thisOp.style.overflowX="scroll";
    }

    
    if (btnClicked.hasAttribute("ugual")){
      /* if click ugual and the second number is defined, do a operation */
      if (!(typeof opNumbers[1] === "undefined")) {
        result[0] = calculate(op, opNumbers) 
        thisOp.innerHTML=result[0];
        op=false
        lastBtn=btnClicked
        btnClicked.parentNode.blur();
        
        console.log(opNumbers);
        return
      } else {
      /* else nothing */  
        btnClicked.parentNode.blur();
        return
      }
    }

    /* if the button clicked is C, reset the calculator */
    if (btnClicked.hasAttribute("deleteOp")){
      reset()
      btnClicked.parentNode.blur();
      console.log(opNumbers);
      return
    }

    /* if the button clicked is deleteNum */
    if (btnClicked.hasAttribute("deleteNum")){
      /* and the second number is undefined, reset the calculator */
      if(typeof opNumbers[1] === "undefined"){
        reset()
        btnClicked.parentNode.blur();
        return
      } else {
        /* else delete only the second number */
        thisOp.innerHTML=lastOp
        opNumbers[1] = 0;
        resultView.innerHTML = 0;
      }
        
    }

    /* if the button clicke is a percentage button athe second number is undefined */
    if(btnClicked.hasAttribute("percentage") && typeof opNumbers[1]==="undefined")  {
      /* do the percentage e change the view */
      opNumbers[0]= opNumbers[0]/100;
      resultView.innerHTML = opNumbers[0];
      typeof lastOp !== "undefined" ?
        thisOp.innerHTML= lastOp + opNumbers[0] :
        thisOp.innerHTML= opNumbers[0]
      btnClicked.parentNode.blur();
      return
      /* else we are working in the second number so, do the percentage e change the view */
    } else if (btnClicked.hasAttribute("percentage") && typeof opNumbers[1] !== "undefined") {
      opNumbers[1] = opNumbers[1]/100;
      resultView.innerHTML=opNumbers[1];
      thisOp.innerHTML = lastOp + opNumbers[1];
      return
    }

    /* add ord elete the minus sign  */
    if (btnClicked.hasAttribute("plusMinus") && typeof opNumbers[1] === "undefined") {
      opNumbers[0]=-(opNumbers[0]);
      resultView.innerHTML=opNumbers[0];
      thisOp.innerHTML=opNumbers[0];
      return
    } else if (btnClicked.hasAttribute("plusMinus") && typeof opNumbers[1] !== "undefined") {
      opNumbers[1]=-(opNumbers[1]);
      resultView.innerHTML= opNumbers[1];
      thisOp.innerHTML=lastOp + opNumbers[1]
      return
    }
  
    /* if the button clicked is a number or a dot*/
    if(btnClicked.hasAttribute("number") || btnClicked.hasAttribute("dot")){
      /* and the the last operation is finished */
      if (typeof lastBtn !== "undefined" && lastBtn.hasAttribute("ugual")) {
        /* if the button is a dot, reset the calculator, and start with 0. */
        if(btnClicked.hasAttribute("dot")){
          reset()
          opNumbers[0]= "0.";
          resultView.innerHTML = opNumbers[0];
          thisOp.innerHTML = opNumbers[0];
          /* else  restart with a digit number*/
        } else {
          reset()
          opNumbers[0]= value;
          thisOp.innerHTML = value;
          resultView.innerHTML = opNumbers[0] ;
        }
      
      } else {
        /* if the op variables is false we are digit the first number */
        if(!op) {
            opNumbers[0] = opNumbers[0] + "" + value;
            /* adjusting the view */
            resultView.innerHTML = Number(opNumbers[0]);
            if (btnClicked.hasAttribute("dot")){
              thisOp.innerHTML=opNumbers[0]; 
            } else {
              opNumbers[0]= Number(opNumbers[0]).toString()
              thisOp.innerHTML=Number(opNumbers[0]);
            }
        } else {
          /* else we are digit the second number */
          typeof opNumbers[1] ==="undefined" ? 
            opNumbers[1]=value :
            /* if is define  continue to digit */
            opNumbers[1] +=  "" + value
          
          resultView.innerHTML= Number(opNumbers[1])
          thisOp.innerHTML+= "" + value;
        }
      }

    } else if (btnClicked.hasAttribute("operation")) {
      
     /*  if the last button was an operation btn*/
      if ( op !== false && lastBtn.getAttribute("operation")){
        /* chagnge the operation sign  */
        op = e.target.getAttribute("operation");
        let opString=thisOp.innerHTML;
        /* i change the sign in the display too */
        thisOp.innerHTML=opString.slice(0, -1) + e.target.innerHTML;
        btnClicked.parentNode.blur();
        return
      /* if last btn pressed it was not an operation btn, but the operation was defined, we can calculate the result   */
      } else if (op !== false){
        result[0]=calculate( op, opNumbers);
        op = e.target.getAttribute("operation");
        thisOp.innerHTML = thisOp.innerHTML + "" + value
      /* if the operation was not defined, we define it in the op variable */  
      } else {
        op = e.target.getAttribute("operation");
        thisOp.innerHTML = thisOp.innerHTML + "" + value
      }

      lastOp = thisOp.innerHTML
    }
    
    
    console.log(opNumbers);
    //thisOp.innerHTML += "" + value;
    
    btnClicked.parentNode.blur();
    lastBtn=btnClicked



  }
  
  /* function to calulate the result */
  function calculate( op, arr ) {
    let thisResult
    /* transform in Number */
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
    /* show the result */
    document.querySelector("#result").innerHTML = thisResult;
    opNumbers.length = 0;
    /* set the result as a first number of operation */
    opNumbers[0] = thisResult;
    lastOp="";
    return thisResult;
  }

  /* reset the calculator */
  function reset() {
    opNumbers.length = 0;
    opNumbers[0] = 0;
    thisOp.innerHTML = 0;
    resultView.innerHTML = 0;
    lastOp="";
    op = false;
  }

  /* a function that get the width of a text */
  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }




})