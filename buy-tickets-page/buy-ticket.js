async function loadCity() {
    let data = await fetch("../bands.json").then((response) =>
      response.json()
    );
    let url = new URL(window.location.href);
    let description = document.getElementById("description");
    let bandId = url.searchParams.get("id");
    const img = document.getElementById("img");
    const price = document.getElementById("price");
    const adultPrice = document.getElementById("adult-price")
    const backBTN = document.getElementById("backButton");
    const plusBTNadultPrice = document.getElementById("plusA");
    const minusBTNadultPrice = document.getElementById("minusA");
    let total = document.getElementById("total");

    const toEuro = new Intl.NumberFormat("ru",{
      style: "currency",
      currency: "EUR",
      currencyDisplay: "symbol",
      minimumFractionDigits: 0
    });

  

    let countToNum = parseInt(document.getElementById("count").innerHTML)
    const countID = document.getElementById("count");
    let summary = document.getElementById("sum");
    let priceA = data.bands[bandId].adultprice;

    img.src = data.bands[bandId].image;
    description.textContent = data.bands[bandId].description;
    price.textContent = data.bands[bandId].price;
    adultPrice.textContent = data.bands[bandId].adultprice;
    
    var totalInt = 0;
    let ticketsCount = 0;
    backBTN.addEventListener('click', function(){
      window.history.back();
    });
    
    plusBTNadultPrice.addEventListener('click', function(){
    let sum = 0;
    countToNum += 1;
    countID.innerHTML = countToNum;
    sum = priceA * countToNum;
    summary.textContent = sum;
    ticketsCount = parseInt(countIDp.innerHTML) + countToNum;
    totalInt = parseInt(sumP.innerHTML) + sum;
    total.innerHTML = toEuro.format(totalInt);
    });

    minusBTNadultPrice.addEventListener('click', function(){
    let sum = 0;
    if (countToNum != 0)
    {
      countToNum -= 1;
    }
    countID.innerHTML = countToNum;
    sum = priceA * countToNum;
    summary.textContent = sum;
    ticketsCount = parseInt(countIDp.innerHTML) + countToNum;
    totalInt = parseInt(sumP.innerHTML) + sum;
    total.innerHTML = toEuro.format(totalInt);
    });

    const plusBTNprice = document.getElementById("plusP");
    const minusBTNprice = document.getElementById("minusP");
    let countToNumNP = parseInt(document.getElementById("countP").innerHTML);
    const countIDp = document.getElementById("countP");
    let priceP = data.bands[bandId].price;
    let sumP = document.getElementById("sumP");


    plusBTNprice.addEventListener('click', function(){
    let sum = 0;
    countToNumNP += 1;
    countIDp.innerHTML = countToNumNP;
    sum = priceP * countToNumNP;
    sumP.textContent = sum;
    totalInt = parseInt(summary.innerHTML) + sum;
    total.innerHTML = toEuro.format(totalInt);
    ticketsCount = parseInt(countID.innerHTML) + countToNumNP;
    });

    minusBTNprice.addEventListener('click', function(){
    let sum = 0;
    if (countToNumNP != 0)
    {
      countToNumNP -= 1;
    }
    countIDp.innerHTML = countToNumNP;
    sum = priceP * countToNumNP;
    sumP.textContent = sum;
    totalInt = parseInt(summary.innerHTML) + sum;
    total.innerHTML = toEuro.format(totalInt);
    ticketsCount = parseInt(countID.innerHTML) + countToNumNP;
    });



    const ConfirmBTN = document.getElementById('confirmBtn');
    ConfirmBTN.addEventListener('click', function(){
      let redirect = new URL(
    `${window.location.origin}/src/payment-method/payment-method.html`
    );
    redirect.searchParams.append('total',totalInt);
    redirect.searchParams.append('id',bandId);
    redirect.searchParams.append('countOfTickets',ticketsCount)
    window.location.href = redirect.href;
    }); 
  }
  loadCity();