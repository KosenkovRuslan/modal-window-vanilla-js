let fruits = [
  {id: 1, title: 'Apples', price: 20, img: 'https://media.istockphoto.com/photos/red-apple-with-leaf-picture-id683494078?k=6&m=683494078&s=612x612&w=0&h=aVyDhOiTwUZI0NeF_ysdLZkSvDD4JxaJMdWSx2p3pp4='},
  {id: 2, title: 'Orange', price: 30, img: 'https://www.quanta.org/orange/orange.jpg'},
  {id: 3, title: 'Mango', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0yY15NS-u5vA0sYLeudZFGLdq8ozXU13rw&usqp=CAU'}
]

const toHTML = fruit => `
  <div class="col">
  <div class="card">
    <img class="card-img-top" style="width: 300px" src="${fruit.img}" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">See the price</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
    </div>
  </div>
  </div>
`

function render() {
  const html = fruits.map(fruit => toHTML(fruit)).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Product price',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      console.log('Primary btn clicked')
      priceModal.close()
    }},
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)
  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Price for an ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
    // console.log(id, fruit)
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'You are sure?',
      content: `<p>You remove the fruit: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id)
      render()
      // console.log('Remove')
    }).catch(() => {
      console.log('Cancel')
    })
    
  }
})

