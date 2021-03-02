const fruits = [
  {id: 1, title: 'Apples', price: 20, img: 'https://media.istockphoto.com/photos/red-apple-with-leaf-picture-id683494078?k=6&m=683494078&s=612x612&w=0&h=aVyDhOiTwUZI0NeF_ysdLZkSvDD4JxaJMdWSx2p3pp4='},
  {id: 2, title: 'Orange', price: 30, img: 'https://www.quanta.org/orange/orange.jpg'},
  {id: 3, title: 'Mango', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0yY15NS-u5vA0sYLeudZFGLdq8ozXU13rw&usqp=CAU'},
]

const modal = $.modal({
  title: 'Ruslan Modal',
  closable: true,
  content: `
  <h4>Modal is working</h4>
  <p>Lorem ipsum dolor sit.</p>
  `,
  width: '400px',
  footerButtons: [
    {text: 'Ok', type: 'primary', handler() {
      console.log('Primary btn clicked')
      modal.close()
    }},
    {text: 'Cancel', type: 'danger', handler() {
      console.log('Danger btn clicked')
      modal.close()
    }}
  ]
})

