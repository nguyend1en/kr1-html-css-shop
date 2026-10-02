// Модальное окно быстрой заявки (есть только в catalog.html).
const dialog = document.getElementById('order-dialog');

if (dialog) {
  const productInput = dialog.querySelector('[name="selected-product"]');

  document.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => {
      productInput.value = button.dataset.product;
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
}

// Проверка форм: подсвечиваем ошибочные поля через aria-invalid.
document.querySelectorAll('form[data-validate]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = Array.from(form.elements).filter((el) => el.willValidate);
    fields.forEach((el) => el.removeAttribute('aria-invalid'));

    if (!form.checkValidity()) {
      fields
        .filter((el) => !el.checkValidity())
        .forEach((el) => el.setAttribute('aria-invalid', 'true'));
      form.reportValidity();
      return;
    }

    form.reset();

    const parentDialog = form.closest('dialog');
    if (parentDialog) parentDialog.close();

    const message = document.querySelector('[data-success]');
    if (message) {
      message.hidden = false;
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// order.html?product=... — заранее выбираем товар в форме заявки.
const topicSelect = document.getElementById('order-topic');
const productParam = new URLSearchParams(window.location.search).get('product');

if (topicSelect && productParam) {
  topicSelect.value = productParam;
}
