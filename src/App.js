import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency,setFromCurrency] = React.useState('RUB');
  const [toCurrency,setToCurrency] = React.useState('USD');

  const [fromPrice,setFromPrice] = React.useState(0);
  const [toPrice,setToPrice] = React.useState(1);

  //const [rates,setRates] = React.useState({});
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
    .then((response) => response.json())
    .then((json) => { 
      ratesRef.current = json.rates; 
      onChangeToPrice(1)
    }).catch((err)=> console.log(err))
  },[])

  const otherRates = Object.entries(ratesRef.current);

  const onChangeFromPrice = (value) =>{
    const price = value/ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];

    setFromPrice(value);
    setToPrice(result.toFixed(3));
  }

  const onChangeToPrice = (value) =>{
    const result = (ratesRef.current[fromCurrency]/ratesRef.current[toCurrency]) * value;

    setFromPrice(result.toFixed(3));
    setToPrice(value)
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  },[fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  },[toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue = {onChangeFromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice} onChangeValue ={onChangeToPrice} currency={toCurrency} onChangeCurrency={setToCurrency}/>
    </div>
  );
}

export default App;
 