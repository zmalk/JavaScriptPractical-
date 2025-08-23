function convertCurr() {
  const amount = document.querySelector(".amount").value;
  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  const resultDiv = document.querySelector(".result");

  if (amount && from && to) {
    const url = `https://v6.exchangerate-api.com/v6/ab7314e036c3a1bc268df194/latest/${from}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[to];
        const result = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${from} = ${result} ${to}`;
      });
  } else {
    resultDiv.innerHTML = "Please enter a valid amount.";
  }
}
