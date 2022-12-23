
let cardOwnerName = '';
  let cardPinCode = '';
  let cardFavouritePet = '';
  let cardNumber = '';
  let cardsLimit = 3;
  let cardNomer = '';
let cardInfo = '';
let putValue = '';
let takeValue = '';
let ourNumber = ''
let transferCard = 2
function UserCard(id){
  let balance = 100;
  let transactionLimit = 100;
  let historyLogs = [];
  let petsName = $('#favouritePet').val();
  let pincode = $('#pincode').val();
  let nomer = cardNumber;
  function recordOperations(type,value,time){
    historyLogs.push({
        operationType:type,
        credits:value,
        operationTime:time
    })
  }

  return{
    getCardOptions(){
        return{
            id,
            balance,
            transactionLimit,
            historyLogs,
            petsName,
            pincode,
            nomer
        }
    },
    putCredits(amount){   
        balance+=amount;
        recordOperations('Recieved credits', amount, new Date().toLocaleString());
    },
    takeCredits(amount){
            balance-=amount;
            recordOperations('Withdrawl of credits', amount, new Date().toLocaleString());
    },
    setTransactionsLimit(amount){
     transactionLimit = amount;
     recordOperations('Change transaction Limit', amount, new Date().toLocaleString());
    },
    changePincode(){
      pincode = checkCardNewPincode.value;
    },
    changeLimit(){
      transactionLimit = inpChangeCardLimit.value;
    },
    transferCredits(amount, card){
      let tax = 0.005;
      let transferAmount = amount*tax+amount;
       
      if(transferAmount<=balance&& transferAmount<=transactionLimit){
         if(transferAmount<=balance){
            this.takeCredits(amount);
            
            card.putCredits(parseInt(amount-transferAmount));
            recordOperations('transfer operations', amount, new Date().toLocaleString());
         }else{
            console.log('sorry not enough money');
         }
      }else{
        console.log('exceed money')
      }
    }
  }
  let key;
} 


let cardCounter = '0';
class UserAccount{
    constructor(name){
        this.name = name;
        this.cards = [];
        this.limit = 3;
    }

    addCard(){
      if(this.cards.length<this.limit){
        this.cards.push(UserCard(this.cards.length+1));
        cardCounter++
        $('.wrap__left').append(`<div class="card" id="n${cardCounter}">
        <div class="card__row">
            <div class="card__row__cardName">monobank</div>
            <div class="card__row__slash"></div>
            <div class="card__row__place">Universal bank</div>
            <div class="card__row__text">world</div>
        </div>
        <div class="card__row card__row_middle">
            <div class="card__row_middle__left">
                <div class="card__row__signalImg"></div>
        </div>
            <div class="card__row_middle__right">
                <div class="card__row__number">${cardNumber}</div>
            </div>
        </div>
        <div class="card__row">
        
      <div class="card__row__endLeft">
        <div class="card__row__name">${cardOwnerName}</div>
        <div class="card__row__date">04/24</div>
        </div>
       <div class="card__row__endRight">
        <div class="card__row__masterCardImg"></div>
        </div>
        </div>
      </div>`);
      console.log(this.cards)
     

      }else{
        alert('You have more than 3 cards');
      }
    }

    getCardByKey(key){
        return this.cards[key-1].getCardOptions();
    }
    takeMoneeyFromCard(key){
    this.cards[key-1].takeCredits(50);
    }
    
    auditWhatCard(number){
      cardNomer = number 
  console.log(cardOwner.getCardByKey(number))
  cardInfo = cardOwner.getCardByKey(number)
  }

  checkCardNomer(){
if(checkNumberCard.value == cardInfo.nomer){
  $('.firstStage').css('display','none')
  $('.checkPincodeStage').css('display','flex')
  checkNumberCard.value= ''
}else{
  alert('Dont correct nomer of card')
}
  }

  checkCardPincode(){
    if(checkPinCodeCard.value == cardInfo.pincode){
      $('.checkPincodeStage').css('display','none')
      $('.menuStage').css('display','flex')
      checkPinCodeCard.value= ''
    }else{
      alert('I think you forgot your password')
      checkPinCodeCard.value = ''
    }
  }

  checkCardPetName(){
    if(checkCardpetname.value == cardInfo.petsName){
      $('#checkCardpetnameBtn').css('display','none')
      checkCardpetname.value = ''
      checkCardNewPincode
      $('#checkCardNewPincode').css('display','flex')
      $('#checkCardpetname').css('display','none')
      $('#changePincodeBtn').css('display','flex')
      changePincodeText.innerText = "Write your new PinCode"
    }else{
      alert('I think you forgot your password')
    }
  }
    
  changeOwnerPincode(){
    this.cards[cardNomer-1].changePincode()
    $('.checkPincodeStage').css('display','flex')
    checkPinCodeCard.value = ''
    checkCardpetname.value = ''
    checkCardNewPincode.value = ''
    $('#pincodePopup').css('display','none')
    cardInfo = this.cards[cardNomer-1].getCardOptions()
  }

  putMoneyInCard(amount){
    if(amount<=cardInfo.transactionLimit){
      this.cards[cardNomer-1].putCredits(amount)
      $('.menuStage').css('display','flex');
      cardInfo = this.cards[cardNomer-1].getCardOptions()
      $('.putMoneyStage').css('display','none');
    }else(
      alert('It exceeds your limit')
    )
  }

  takeMoneyFromCard(amount){
    if(amount<=cardInfo.transactionLimit){
      if(cardInfo.balance>=amount){
      this.cards[cardNomer-1].takeCredits(amount)
      cardInfo = this.cards[cardNomer-1].getCardOptions()
      $('.menuStage').css('display','flex');
      $('.takeMoneyStage').css('display','none');
      }else{
        alert('exceeded amount');
      }
      }else{
        alert('exceeded limit');
      } 
  }
  
  changeCardLimit(){
    this.cards[cardNomer-1].changeLimit();
    cardInfo = this.cards[cardNomer-1].getCardOptions()
  }
  
  transferMoneyStart(){
    ourNumber = inpCheckTransferNumber.value
  for(let i=1;i<4;i++){
    let cardInfo = this.cards[i-1].getCardOptions()
    if(cardInfo.nomer == ourNumber){
      transferCard = i-1
      console.log(transferCard)
    }
  }
  }

  transferMoneyEnd(){
    console.log(transferCard)
    this.cards[cardNomer-1].transferCredits(inpCheckTransferAmount.value,  this.cards[1]);
  }
    }







let arr = [500,200,100,50];
let arr2 = [];
function cashOut(amount){
  for(let i= 0;i<arr.length;i++){
    while(amount - arr[i]>=0){
      amount -=arr[i];
      arr2.push(arr[i]);
     }
}
  
  console.log(arr2)
}
let cardOwner = new UserAccount('ostap');

// let card1 = new UserCard(1);
// let card2 = new UserCard(2);
// card1.transferCredits(50,card2);
// console.log(card1.getCardOptions());
// console.log(card2.getCardOptions());
// card1.takeCredits(100);
// console.log(card1.getCardOptions());

// card1.setTransactionsLimit(1000)
// card1.putCredits(500);
// console.log(card1.getCardOptions());
$('#addCard').click(function(){
  $('#cardPopup').css('display','flex');
  $('.wrap').css('filter','blur(5px)');
  $('#nameAndSurname').val('');
$('#pincode').val('');
$('#favouritePet').val('');
})

$('#createCardBtn').click(function(){
  cardOwnerName = $('#nameAndSurname').val();
  cardPinCode = $('#pincode').val();
  cardFavouritePet = $('#favouritePet').val();
  let randomNumber1 = Math.floor((Math.random() * 8999) + 1000);
  let randomNumber2 = Math.floor((Math.random() * 8999) + 1000);
  let randomNumber3 = Math.floor((Math.random() * 8999) + 1000);
  let randomNumber4 = Math.floor((Math.random() * 8999) + 1000);
  cardNumber =randomNumber1+' '+randomNumber2+' '+randomNumber3+' '+randomNumber4; 
  $('#cardPopup').css('display','none');
  $('.wrap').css('filter','blur(0px)');
  cardOwner.addCard();
  $('.card').click(function(){
   $('#cardInATM').css('display','flex');
   $('.ATM__screen__welcome').css('display','flex');
   $('#checkNumberCard').css('display','flex');
   $('#firstStage__btn').css('display','flex');
   ATM__screen__startText.innerText = 'write number of your card'
    })
  $('#n1').click(function(){
    
    cardOwner.auditWhatCard(1);
    })
    $('#n3').click(function(){
      cardOwner.auditWhatCard(3);
      })
    $('#n2').click(function(){
        cardOwner.auditWhatCard(2);
    })

})

$('#firstStage__btn').click(function(){
cardOwner.checkCardNomer()
})

$('#SecondStage__btn').click(function(){
  cardOwner.checkCardPincode()
})

$('#forgotPashword').click(function(){
  $('#pincodePopup').css('display','flex');
  $('#checkCardpetnameBtn').css('display','flex')
      checkCardpetname.value = ''
      checkCardNewPincode
      $('#checkCardNewPincode').css('display','none')
      $('#checkCardpetname').css('display','flex')
      $('#changePincodeBtn').css('display','none')
      changePincodeText.innerText = "Write your pet name wich you wrote in card information"
})

$('#checkCardpetnameBtn').click(function(){
cardOwner.checkCardPetName()
})

$('#changePincodeBtn').click(function(){
 cardOwner.changeOwnerPincode()
})

$('#btnPutMoney').click(function(){
  $('.menuStage').css('display','none');
  $('.putMoneyStage').css('display','flex');
})

$('#putMoney50').click(function(){
  putValue = 50;
  cardOwner.putMoneyInCard(putValue);
})

$('#putMoney100').click(function(){
  putValue = 100;
  cardOwner.putMoneyInCard(putValue);
})

$('#putMoney200').click(function(){
  putValue = 200;
  cardOwner.putMoneyInCard(putValue);
})

$('#putMoney500').click(function(){
  putValue = 500;
  cardOwner.putMoneyInCard(putValue);
})

$('#putMoney1000').click(function(){
  putValue = 1000;
  cardOwner.putMoneyInCard(putValue);
})

$('#btnCancel').click(function(){
  $('.menuStage').css('display','flex');
  $('.putMoneyStage').css('display','none');
  $('.takeMoneyStage').css('display','none');
})

$('#btnChangeLimit').click(function(){
  $('.menuStage').css('display','none');
  $('.changeMoneyStage').css('display','flex');
})

$('#btnChangeCardLimit').click(function(){
  $('.menuStage').css('display','flex');
  $('.changeMoneyStage').css('display','none');
  cardOwner.changeCardLimit()
})

$('#btnExit').click(function(){
$('.exitStage').css('display','flex')
$('.menuStage').css('display','none');
setTimeout(function(){
  $('.exitStage').css('display','none')
  $('.firstStage').css('display','flex')
  $('#cardInATM').css('display','none');
  $('#checkNumberCard').css('display','none');
   $('#firstStage__btn').css('display','none');
   ATM__screen__startText.innerText = 'Please, put card in ATM'
},3000)
})

$('#btnTakeMoney').click(function(){
  $('.menuStage').css('display','none');
  $('.takeMoneyStage').css('display','flex');
})

$('#btnTakeCancel').click(function(){
  $('.menuStage').css('display','flex');
  $('.takeMoneyStage').css('display','none');
})

$('#takeMoney50').click(function(){
  takeValue = 50
  cardOwner.takeMoneyFromCard(takeValue);
})

$('#takeMoney100').click(function(){
  takeValue = 100
  cardOwner.takeMoneyFromCard(takeValue);
})

$('#takeMoney200').click(function(){
  takeValue = 200
  cardOwner.takeMoneyFromCard(takeValue);
})

$('#takeMoney500').click(function(){
  takeValue = 500
  cardOwner.takeMoneyFromCard(takeValue);
})

$('#takeMoney1000').click(function(){
  takeValue = 1000
  cardOwner.takeMoneyFromCard(takeValue);
})

$('#btnDetails').click(function(){
  $('.menuStage').css('display','none');
  $('.detailsStage').css('display','flex');
  $('.detailsStage').append(`
  <div class="detailsStage__header">Details</div>
  <div class="detailsStage__p">Balance: ${cardInfo.balance}</div>
  <div class="detailsStage__p">Limits: ${cardInfo.transactionLimit}</div>
  <div class="detailsStage__p">Pet Name: ${cardInfo.petsName}</div>
  <div class="detailsStage__p">ID: ${cardInfo.id}</div>
  <div class="putMoneyStage__item" id="btnDetailsCancel">Cancel</div>
  `)

  $('#btnDetailsCancel').click(function(){
    $('.menuStage').css('display','flex');
    $('.detailsStage').css('display','none');
    $('.detailsStage').empty()
  })
})

$('#transferBtn').click(function(){
  $('.menuStage').css('display','none');
  $('.transferStage').css('display','flex');
})

$('#transferCheckBtn').click(function(){
  $('.transferMoneyStage').css('display','flex');
$('.transferStage').css('display','none');
cardOwner.transferMoneyStart()
})
 
$('#transferPlayBtn').click(function(){
 cardOwner.transferMoneyEnd();
 $('.menuStage').css('display','flex');
  $('.transferMoneyStage').css('display','none');
})







  
