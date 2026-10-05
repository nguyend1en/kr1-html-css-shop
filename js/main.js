// Минимальная логика: открытие/закрытие модального окна и обработка форм.
const dialog = document.getElementById('order-dialog');
const message = document.getElementById('success-message');

function showMessage() {
  if (!message) return;
  message.hidden = false;
  setTimeout(() => {
    message.hidden = true;
  }, 4000);
}

if (dialog) {
  const selectedProduct = document.getElementById('selected-product');
  const closeButton = document.getElementById('close-order-dialog');

  // Кнопки «Заказать»: записываем товар в скрытое поле и открываем окно.
  document.querySelectorAll('.product-card__button').forEach((button) => {
    button.addEventListener('click', () => {
      selectedProduct.value = button.dataset.product;
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());

  // Закрытие по клику на затемнённый фон
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

// Обработка форм: проверка, подсветка ошибок, сообщение об успехе.
document.querySelectorAll('.order-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    // Backend пока не подключён, поэтому отменяем стандартную отправку.
    event.preventDefault();

    const elements = Array.from(form.elements);
    elements.forEach((element) => {
      if (element.willValidate) element.removeAttribute('aria-invalid');
    });

    if (!form.checkValidity()) {
      elements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      form.reportValidity();
      return;
    }

    form.reset();
    if (dialog && dialog.open) dialog.close();
    showMessage();
  });
});
