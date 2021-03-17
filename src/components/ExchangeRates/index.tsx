import React, {useEffect, useState} from 'react';


export default function ExchangeWidget({country}) {

    const [rates, setRates] = useState([0, 0, 0]);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/3402d928822e13d5d341634b/latest/${country.currency}`)
            .then(response => response.json()).then(result => {
            const ratesNew = [];
            ratesNew.push(result.conversion_rates.USD);
            ratesNew.push(result.conversion_rates.EUR);
            ratesNew.push(result.conversion_rates.BYN);
            setRates(ratesNew);
        })
    }, []);

    return (
        <div className='exchange'>
            <div style={{color: 'black'}}><strong>{country.currency}</strong></div>
            <div className="exchange-div">
                <div><strong>USD</strong> : <span>{rates[0]}</span></div>
                <div><strong>EUR</strong> : <span>{rates[1]}</span></div>
                <div><strong>BYN</strong> : <span>{rates[2]}</span></div>
            </div>
        </div>
    );
}
