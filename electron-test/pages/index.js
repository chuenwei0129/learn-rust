const btn1 = document.querySelector('.btn1')
btn1.addEventListener('click', () => {
  alert(API.versions().electron)
})

const btn2 = document.querySelector('.btn2')
const input = document.querySelector('input')
btn2.addEventListener('click', () => {
  API.writeFile(input.value)
})

const btn3 = document.querySelector('.btn3')
btn3.addEventListener('click', () => {
  API.readFile().then((data) => {
    alert(data)
  })
})

const btn4 = document.getElementById('btn4')
const titleInput = document.getElementById('title')
btn4.addEventListener('click', () => {
  window.API.setTitle(titleInput.value)
})

const btn5 = document.querySelector('#btn5')
const filePathElement = document.getElementById('filePath')

btn5.addEventListener('click', async () => {
  const filePath = await window.API.openFile()
  filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')
window.API.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.API.counterValue(newValue)
})
