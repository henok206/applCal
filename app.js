  //alert("working!");
  let hourEle=document.querySelector('.hour');
  let minuteEle=document.querySelector('.minute');
  let valueEle=document.querySelector('.value');

  let acEle=document.querySelector('.ac');
  let pmEle=document.querySelector('.pm');
  let percentEle=document.querySelector('.percent');
  let divisionEle=document.querySelector('.division');
  let multiplicationEle=document.querySelector('.multiplication');
  let subtractionEle=document.querySelector('.subtraction');
  let additionEle=document.querySelector('.addition');
  let decimmalEle=document.querySelector('.decimmal');
  let EquallEle=document.querySelector('.Equall');

  let number0Ele=document.querySelector('.number-0');
  let number1Ele=document.querySelector('.number-1');
  let number2Ele=document.querySelector('.number-2');
  let number3Ele=document.querySelector('.number-3');
  let number4Ele=document.querySelector('.number-4');
  let number5Ele=document.querySelector('.number-5');
  let number6Ele=document.querySelector('.number-6');
  let number7Ele=document.querySelector('.number-7');
  let number8Ele=document.querySelector('.number-8');
  let number9Ele=document.querySelector('.number-9');

  let numberEleArray=[number0Ele,number1Ele,number2Ele,number3Ele,
      number4Ele,number5Ele,number6Ele,number7Ele,number8Ele,
      number9Ele
  ];
    //varable
    let valueStrInMemory=null;
    let operatorInMemory=null;
   //function
   let getValueAsStr=()=>{
    let currentValueEleStr=valueEle.textContent;
    return currentValueEleStr.split(',').join('');
   }
   let getValueAsNum=()=>{
     return parseFloat(getValueAsStr());
   }
    let setStrAsValue=(valueStr)=>{
      if(valueStr[valueStr.length-1]===('.')){
        valueEle.textContent+='.';
        return;
      }
      let [wholeNumStr,decimalStr]=valueStr.split('.');
        if(decimalStr){
          valueEle.textContent=
          parseFloat(wholeNumStr).toLocaleString()+ '.'+ decimalStr;
        }else{
          valueEle.textContent=parseFloat(wholeNumStr).toLocaleString();
        }
      valueEle.textContent=parseFloat(valueStr).toLocaleString();
    };

  let handleNumberClick=(numStr)=>{
    let currentValueEleStr=getValueAsStr();
     if(currentValueEleStr==='0'){
      setStrAsValue(numStr);
     }else{
      setStrAsValue(currentValueEleStr + numStr);
      }
  
  } 

      let getResultOfOperationAsStr=()=>{
        let currentValueNum=getValueAsNum();
        let valueNumInMemory=parseFloat(valueStrInMemory);
        let newValueNum;
        if(operatorInMemory==='addition'){
          newValueNum=valueNumInMemory+currentValueNum;
        }
        else if(operatorInMemory==='subtraction'){
         newValueNum=valueNumInMemory-currentValueNum;
        } 
        else if(operatorInMemory==='multiplication'){
         newValueNum=valueNumInMemory*currentValueNum;
        } 
        else if(operatorInMemory==='division'){
         newValueNum=valueNumInMemory/currentValueNum;
        }
        return newValueNum.toString();
      };


  let handleOperatorClick=(operation)=>{
     let currentValueEleStr=getValueAsStr();
     
     if(!valueStrInMemory){
       valueStrInMemory=currentValueEleStr;
       operatorInMemory=operation;
       setStrAsValue('0');
       return;
     }
      
     
     valueStrInMemory=getResultOfOperationAsStr();
     operatorInMemory=operation;
     setStrAsValue('0');
  };

  
  //add event lisner for functions
  acEle.addEventListener('click',()=>{
     setStrAsValue('0');
       valueStrInMemory=null;
       operatorInMemory=null;
  });
  
  pmEle.addEventListener('click',()=>{
     let currentValueNum=getValueAsNum();
     let currentValueEleStr=getValueAsStr();

        if(currentValueEleStr==='-0'){
          setStrAsValue('0');
          return;
        }
      if(currentValueNum>=0){
        setStrAsValue('-'+ currentValueEleStr);
      }else{
         setStrAsValue(currentValueEleStr.substring(1));
      }
  });

  percentEle.addEventListener('click',()=>{
     let currentValueNum=getValueAsNum();
     let newValueNum=currentValueNum/100;
     setStrAsValue(newValueNum.toString());
       valueStrInMemory=null;
       operatorInMemory=null;
  });
  //add event listner for oprator
  additionEle.addEventListener('click',()=>{
     handleOperatorClick('addition');
  });
 subtractionEle.addEventListener('click',()=>{
     handleOperatorClick('subtraction');
  });
  multiplicationEle.addEventListener('click',()=>{
    handleOperatorClick('multiplication');
  });
  divisionEle.addEventListener('click',()=>{
    handleOperatorClick('division');
  });

  EquallEle.addEventListener('click',()=>{
     if(valueStrInMemory){
       setStrAsValue(getResultOfOperationAsStr());
       valueStrInMemory=null;
       operatorInMemory=null;
     }
  });







  //add Event Listner to Number and Decimal
  for(let i=0; i<numberEleArray.length; i++){
    let numberEle=numberEleArray[i];
    numberEle.addEventListener('click',()=>{
      handleNumberClick(i.toString());
    });
  }
  decimmalEle.addEventListener('click',()=>{
    let currentValueEleStr=getValueAsStr();
      if(!currentValueEleStr.includes('.')){
        setStrAsValue(currentValueEleStr+'.');
      }
  });


  let updateTime=()=>{
      let currentTime=new Date();
      let currentHour=currentTime.getHours();
        if(currentHour>12){
          currentHour=currentHour-12;
        }
      let currentMinute=currentTime.getMinutes();
      hourEle.textContent=currentHour.toString();
      minuteEle.textContent=currentMinute.toString().padStart(2,'0');
  }

  setInterval(updateTime,1000);
  updateTime();
