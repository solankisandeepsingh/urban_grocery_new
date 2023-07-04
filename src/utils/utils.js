export const currencyFormatter = (value)=>{
    const formatNumber = new Intl.NumberFormat('en-IN',{
        currency : "INR",
        currencyDisplay: "narrowSymbol",
        style: 'currency'
    })
    return formatNumber.format(value)
}