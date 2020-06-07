async function getFinance(quote){
    const fetchData = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?symbols=${quote}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "136d7ef57fmsh15abb122659599ep14c433jsn459aa9664a7f"
        }
    })

    fetchData.json().then(function(data){
        const result = data.quoteResponse.result[0]
        console.log(result)

        const priceChange = (result.regularMarketChange < 0 )? 'red"> -' : 'green"> +'
        document.querySelector('#stockName').innerHTML = `${result.shortName} (${result.symbol})`
        document.querySelector('#stockPrice').innerHTML = `${result.regularMarketPrice} ${result.currency} <span style="color:${priceChange}${result.regularMarketChange.toFixed(2)} (${Math.abs(result.regularMarketChangePercent.toFixed(2))}%)</span>`

    })

}


async function getMarket(){
    document.querySelector('#marketTable').innerHTML = ''
    const fetchData = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "136d7ef57fmsh15abb122659599ep14c433jsn459aa9664a7f"
        }
    })
    
    fetchData.json().then(function(data){
        const result = data.marketSummaryResponse.result
        let allMarket =[]

        result.forEach(function(market){
            const jsonConvert = eval(`JSON.stringify({0:"${market.exchangeTimezoneName}", 1:"${market.exchangeTimezoneShortName}"})`)
            allMarket.push(jsonConvert)
        })

        allMarket = [...new Set(allMarket)]
        allMarket.forEach(function(market){
            const getRegion = JSON.parse(market)
            document.querySelector('#marketTable').innerHTML += 
                `<div class='row'>
                    <div class='col' id='${getRegion[1]}'>
                        <b>${getRegion[0]}</b>
                    </div>
                </div>`
        })

        result.forEach(function(exchange){
            const color = (exchange.regularMarketChangePercent.raw < 0)? 'red': 'green'
            document.querySelector(`#${exchange.exchangeTimezoneShortName}`).innerHTML += 
                `<div class='row'>
                    <div class='col-6'>${exchange.fullExchangeName}</div>
                    <div class='col-3'>${exchange.regularMarketPrice.fmt}</div>
                    <div class='col-3' style="color:${color} !important; text-align:right !important">${exchange.regularMarketChangePercent.fmt}</div>
                </div>`
        })
    })
}