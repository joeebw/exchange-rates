import { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow'
import Spinner from './Spinner';
import './App.css'

const myHeaders = new Headers();
myHeaders.append("apikey", "5w7KESSe6yR4ph0PRmq760peJHPzeJ3D");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const API_URL = "https://api.apilayer.com/exchangerates_data/latest";

function App() {
  
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [isFilledCurrency, setIsFilledCurrency] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const handleFetchApi = async () => {
      const response = await fetch(`${API_URL}?base=${fromCurrency}`, requestOptions);
      const currency = await response.json();
      if (!isFilledCurrency) {
        setIsFilledCurrency(true);
        setCurrencyOptions([...Object.keys(currency.rates)]);
        
      }
      setExchangeRate(currency.rates[toCurrency]);
      handleSpinner();
    }
    handleFetchApi();
  }, [fromCurrency, toCurrency])
  

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleSpinner() {
    setIsLoaded(true);
  }

  return (
    <>
      <div className={`${isLoaded ? 'flex' : 'hidden'} flex-col items-center bg-[#d7e63899] w-full h-[30rem] sm:h-[32rem] sm:w-[30rem] rounded-lg shadow-xl shadow-slate-800`}>
        <h1 className='relative right-4 text-6xl font-bold my-16 text-center text-[#4d4d46]'>
          Convert
        </h1>
        <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedcurrency={fromCurrency}
        onChangeCurrency={e =>setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onChangeAmount = {handleFromAmountChange}
        />
        <div className='w-[20rem]'><p className='text-6xl text-left'>=</p></div>
        <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedcurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount = {handleToAmountChange}
        />
      </div>
      <Spinner isLoaded={isLoaded}/>
    </>
  )
}

export default App