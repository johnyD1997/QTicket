

const cardnumber = document.getElementById('cardnumber');
const expiration = document.getElementById('exdate');
const cvvInput = document.getElementById('cvv-input');
const nameInput = document.getElementById('cardholder');
const backButton = document.getElementById('backButton');
let newCardFig = document.getElementById('new-card-fig');
let onlineCardFig = document.getElementById('online-bank-fig');

var cardCode;

const payment = document.getElementsByName('payment');
function check()
{ 
    if(payment[1].checked){
        document.getElementById('hide-section').style.display = 'block';
        newCardFig.style.display = 'none';
    }
    else{
        document.getElementById('hide-section').style.display = 'none';
        newCardFig.style.display = 'block';
    }
    if(payment[2].checked){
        document.getElementById('hide-section2').style.display = 'block';
        onlineCardFig.style.display = 'none';
    }
    else{
        document.getElementById('hide-section2').style.display = 'none';
        onlineCardFig.style.display = 'block';
    }
 }

expiration.addEventListener('input', expirationFunc, true);

function expirationFunc()
{
    cardCode = this.value.replace(/[^\d]/g, '').substring(0,4);
    cardCode = cardCode != '' ? cardCode.match(/.{1,2}/g).join('/') : '';
    this.value = cardCode;
}

cardnumber.addEventListener('input', cardMask, false)
let cardNumb;
function cardMask(){
  cardNumb = this.value.replace(/[^\d]/g, '').substring(0,16);
  cardNumb = cardNumb != '' ? cardNumb.match(/.{1,4}/g).join(' ') : '';
  this.value = cardNumb;
 }

cvvInput.addEventListener('input',addCvv,false);
function addCvv(){
    cvv = this.value.replace(/[^\d]/g, '').substring(0,3);
    this.value = cvv;
}

nameInput.addEventListener('input', nameValid, true)
function nameValid(){
    cardholder = this.value.replace(/[^\ a-zA-Z]/g, '').substring(0,25);
    this.value = cardholder;
}

 function saveCard()
 {
  document.getElementById('saved-card-expdate').innerHTML = cardCode;

    let last4num = '';
    for(i = cardNumb.length - 5; i < cardNumb.length; i++)
    {
      last4num += cardNumb[i];
    }
    let span = document.getElementById('saved-card-last4num');
    span.innerHTML = last4num;
   }

backButton.addEventListener('click', function(){
    window.history.back();
});

function toThankYouPage(){
    let redirect = new URL(
    `${window.location.origin}/src/thank-you-page/thank-you.html`
    );
    window.location.href = redirect.href;
  }

  async function loadPMpage() {
    let data = await fetch('../bands.json').then((response) =>
      response.json()
    );

    let url = new URL(window.location.href);
    const bandId = url.searchParams.get('id');
    const totalPrice = url.searchParams.get('total');
    const countOfTickets = url.searchParams.get('countOfTickets');
    var eventName = document.getElementById('event-name');
    var total = document.getElementById('total');
    var ticketsCount = document.getElementById('countOfTickets');

    const toEuro = new Intl.NumberFormat("ru",{
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0
      });
    ticketsCount.innerHTML = countOfTickets; 
    total.innerHTML = toEuro.format(totalPrice);
    eventName.textContent = data.bands[bandId].name.toUpperCase();
  } 
  loadPMpage();