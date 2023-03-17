
function CurrencyRow({currencyOptions, selectedcurrency, onChangeCurrency, amount, onChangeAmount}) {
  return (
    <div>
      <input 
      type="number"
      className="input input-md input-bordered input-warning w-36 sm:w-56 text-2xl relative top-1" 
      value={amount ? amount : ''} 
      onChange={onChangeAmount}
      />
      <select value={selectedcurrency}
      className="ml-3 select select-sm select-bordered select-warning" 
      onChange={onChangeCurrency}>
        {
          currencyOptions.map(rate => {
            return <option key={rate} value={rate} >{rate}</option>
          })
        }
      </select>
    </div>
  )
}

export default CurrencyRow
