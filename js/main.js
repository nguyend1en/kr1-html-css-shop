// Минимальная логика: открытие/закрытие модального окна и сообщение об отправке формы.
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

// Формы: браузер проверяет поля сам (required, type="email", pattern),
// после успешной проверки показываем сообщение и очищаем форму.
document.querySelectorAll('.order-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    if (dialog && dialog.open) dialog.close();
    showMessage();
  });
});
