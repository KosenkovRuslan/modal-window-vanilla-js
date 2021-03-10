let fruits = [
  {id: 1,  title: 'Яблоки',  price: 20,  img: 'https://media.istockphoto.com/photos/red-apples-picture-id1141708425?k=6&m=1141708425&s=612x612&w=0&h=eGOoet8NCdJah7TGQdTgP4RB0i81uuVMcSyNnmA8QHo='},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://static8.depositphotos.com/1020804/884/i/600/depositphotos_8840885-stock-photo-orange-fruits-on-a-white.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://media.istockphoto.com/photos/mango-picture-id467328250?k=6&m=467328250&s=612x612&w=0&h=PWHss-zGObCuHbU-P3R5RTJZC-ekLmWu1xmRd03h2zY='},
];

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" src="${fruit.img}" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-primary" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`

/** Создание функции для динамического вывода карточек */
function render() {
  const html = fruits.map(toHTML).join('') /** Равнозначно fruits.map(fruit => toHTML(fruit)) */
  document.querySelector('#fruits').innerHTML = html
}
render()

// const modal = $.modal({
//   title: 'Window modal',
//   closable: true,
//   content: `
//     <h4>Modal is working</h4>
//     <p>Lorem ipsum.</p>
//   `,
//   width: '400px',
//   footerButtons: [
//     {
//       text: 'OK',
//       type: 'primary',
//       handler() {
//         console.log('Primary btn clicked');
//         modal.close();
//       },
//     },
//     {
//       text: 'Cancel',
//       type: 'danger',
//       handler() {
//         console.log('Danger btn clicked');
//         modal.close();
//       },
//     },
//   ],
// }); /* Инициализация плагина */

const priceModal = $.modal({
  title: 'Price modal',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Закрыть',
      type: 'primary',
      handler() {
        priceModal.close();
      },
    },
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)
  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()

    // console.log(id, fruit )
  } else if (btnType === 'remove') {
      $.confirm({
        title: 'Вы уверены?',
        content: `<p>Вы собираетесь удалить <strong>${fruit.title}</strong></p>`
      }).then(() => {
        fruits = fruits.filter(f => f.id !== id)
        render()
        // console.log('Remove')
      }).catch(() => {
        console.log('Cancel');
      })
  }
})


