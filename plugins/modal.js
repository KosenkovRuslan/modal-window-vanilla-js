Element.prototype.insertAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || noop

    wrap.appendChild($btn)
  })


  return wrap
}

function _createModal(options) { /* Приватная функция, которая будет создавать модальное окно */
  const DEFAULT_WIDTH = '600px'
  const modal = document.createElement('div') /* Создаем в DOM элемент с селектором div */
  modal.classList.add('wmodal') /* Добавляем селектору класс wmodal */
  /* Вставляем в созданный div разметку */
  modal.insertAdjacentHTML('afterbegin', ` 
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title" data-title>${options.title || 'Window'}</span>
          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `)

  const footer = _createModalFooter(options.footerButtons)
  footer.insertAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal) /* Добавляем узел modal в конец списка дочерних элементов body */

  return modal /* Возвращаем получившееся модальное окно */
}

$.modal = function(options) { /* Создаем метод modal у объекта $. */
  const ANIMATION_SPEED = 400
  const $modal = _createModal(options) /* Создаем приватную переменную */
  let closing = false /* Защита при вызове методов */
  let destroyed = false

  const modal = {
    /* Функция modal() имеет 3 метода */
    open() { /* Открытие модального окна */
      if (destroyed) {
        console.log('Modal is destroyed')
      }
      !closing && $modal.classList.add('open')
    }, 
    close() { /* Закрытие модального окна */
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
      }, ANIMATION_SPEED)
    }, 
  }

  const listener = event => {
    // console.log('Clicked', event.target.dataset.close);
    if (event.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, { /** Расширяем объект modal, добаляя публичные методы destroy() и setContent() */
    destroy() {
      $modal.parentNode.removeChild($modal) /** Удаляем узел из DOM */
      $modal.removeEventListener('click', listener) /** Удаляем слушателя */
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    },
    setTitle(html) {
      $modal.querySelector('[data-title]').innerHTML = html
    }
  })
}
