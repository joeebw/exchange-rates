
function CurrencyRow({currencyOptions, selectedcurrency, onChangeCurrency, amount, onChangeAmount}) {
  return (
    <div>
      <input 
      type="number"
      className="border-2 rounded-lg border-black h-10 text-2xl w-56 relative top-1" 
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
