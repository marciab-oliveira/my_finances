const descriptionType = document.querySelector('#description_type')
const priceType = document.querySelector('#price_type')
const service = document.querySelector("#service")
const extractTable = document.querySelector('#extract_table tbody')

const today = new Date()
const currentMonth = today.getMonth() + 1
const currentDay = today.getDate() 

let type;
let result= 0
let entry = 0
let exit = 0
let finances = []

const handleTransaction = (e) => {
  e.preventDefault()
  //pegar o valor do sinal de + ou  - 
  service.value === "entry" ?  type = '+' :  type = '-'
    finances.push(
    {
      "date": currentDay + '/' + currentMonth,
      "transaction": type,
      "description": descriptionType.value,
      "price": priceType.value
    }
  )
  if(finances.length !== 0){
    // gerar a tabela de acordo com os valores obtidos nos inputs
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
  if(finances.length  === 0 ){
    //mudar essa logica, pois o extract nunca vai estar vazio devido a data
    extractTable.innerHTML =`
    <tr class="message_information">
      <td class="message"> Nenhuma transação cadastrada</td>
    </tr>`
  }
  if(type === "+") {
    //somar ou diminuir os valores
    entry += parseFloat(priceType.value.toLocaleString().replace(",", "."))
    } else if(type === "-"){
      exit += parseFloat(priceType.value.toLocaleString().replace(",", "."))
    }
    renderBalance(entry,exit)
    clearFields()
}
document.querySelector('#addTransaction').addEventListener('click', handleTransaction)

//Mascara para validar o input de valor, restringindo o uso de letras e adicionando casas decimais
const validateMask = (e)=>{
  e.preventDefault()
  priceType.value =priceType.value.toString().replace(/[\D]+/g, "")
  priceType.value =priceType.value.toString().replace(/([0-9]{2})$/g, ",$1");
}
document.querySelector('#price_type')
.addEventListener('keyup', validateMask, false)

//limpar os campos dos inputs após clicar no botão adicionar Transação
const clearFields = () => {
  document.querySelector('#service').value = ''
  document.querySelector('#price_type').value = ''
  document.querySelector('#description_type').value = ''
}

//Renderiza se o financeiro gerou Lucro ou Prejuízo
const renderBalance = (entry,exit)=> {
  let total = entry-exit
  total > 0 ? balance ='[Lucro]': balance = '[Prejuízo]'
  document.querySelector('#extract_table tfoot').innerHTML = `
    <tr>
      <td>Saídas</td>
      <td>${'R$'+exit.toString().replace('.', ',')}</td>
    </tr>
    <tr>
      <td>Entradas</td>
      <td>${'R$'+entry.toString().replace('.', ',')}</td>
    </tr>
    <tr class="table__result">
      <td>Total</td>
      <td>${'R$'+total.toString().replace('.', ',')}</td>
      <td>${balance}</td>
  </tr>`
 
} 





















