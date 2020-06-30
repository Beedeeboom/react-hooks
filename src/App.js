import React, { useState, useEffect } from 'react'
import currencies from './supported-currencies.json'
import { Line } from 'react-chartjs-2'

const App = () => {
  const defaultCurrency = "AUD"
  const bitcoinApi = "https://api.coindesk.com/v1/bpi/historical/close.json"
  //[getter, setter] = useState(intialValue)
  const [currency, setCurrency] = useState(defaultCurrency)
  const [bitcoinData, setBitcoinData] = useState({})

  //Same as componentDidMount
  useEffect(() => {
    console.log('inside useEffect')
    fetch(`${bitcoinApi}?currency=${currency}`)
      .then(res => res.json())
      .then(data => setBitcoinData(data.bpi))
  }, [currency]) //we need to add an empty array or an argument so the component will only render once - similar to componentDidUpdate
  //The second parameter is optional but if we don't apply it, it will execute infinitly, in this case we need to pass an empty array to stop that.
  //If we don't pass the second parameter (empty array) this would be the same as componentDidMount + componentDidUpdate.

  return (
    <div >
          <span>Select your currency:</span>
          <select value={currency} onChange={event => setCurrency(event.target.value)}>
            {currencies.map((item, index) => {
              return <option key={index} value={item.currency}>{item.country}</option>
            })
            }
          </select>

          <h1>Bitcoin Data for {currency}</h1>

          <Line data={ { labels: Object.keys(bitcoinData), datasets: [ { data: Object.values(bitcoinData) } ] } } />
          
          {/* {
            Object.keys(bitcoinData).map((date) =>
              <div key={date}>Date: {date} Value: {bitcoinData[date]}</div>
            )
          } */}
    </div>
  )
}

export default App
