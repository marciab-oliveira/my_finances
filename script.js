const service = document.querySelector("#service")
const addTransaction = document.querySelector('#addTransaction').addEventListener('click', handleTransaction)
const descriptionType = document.querySelector('#description_type')
const extractTable = document.querySelector('#extract_table tbody')
const priceType = document.querySelector('#price_type')
let type;
const today = new Date()
const currentMonth = today.getMonth() + 1
const currentDay = today.getDate() 
let finances = []

priceType.addEventListener('keypress', validateMask)
function validateMask(){
 
}

if(finances.length  === 0 ){
  extractTable.innerHTML =`
  <tr class="message_information">
  <td class="message"> Nenhuma transação cadastrada</td>
  </tr>`
}

function handleTransaction(e){
  e.preventDefault()
  service.value === "entry" ?  type = '+' :  type = '-'
  finances.push(
    {
      "date": currentDay + '/' + currentMonth,
      "transaction": type,
      "description": descriptionType.value,
      "price": priceType.value
      .replaceAll(".", "")
      .replaceAll(",", "")
    }
  )
  if(finances.length !== 0){
    extractTable.innerHTML = finances.map((finances)=>{
      return (`
      <tr class="price">
        <td class="price_simbol simbol">${finances.transaction}</td>
        <td class="price_simbol simbol">${finances.date}</td>
        <td class="price_simbol">${finances.description}</td>
        <td class="price_simbol">${finances.price}</td>
      </tr>`
      )
    }).join('')
  }
}