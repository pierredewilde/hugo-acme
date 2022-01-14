export default {
  init(params) {
    document.addEventListener('submit', event => {
      if (!(event.target instanceof HTMLFormElement)) { return; }
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        // body: new URLSearchParams(data),
        // headers: { "Content-Type": "application/x-www-form-urlencoded" }
        body: JSON.stringify(Object.fromEntries(data)),
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        if (response.ok) {
          form.insertAdjacentHTML('afterend', '<div class="success">Your message has been successfully sent.</div>');
          if (params.remove) form.remove();
          else form.reset();
        } else {
          throw('error');
        }
      }).catch(error => {
        form.insertAdjacentHTML('afterend', '<div class="error">An error occured when trying to send your message.</div>');
      }).finally(_ => {
        setTimeout(() => form.nextElementSibling.remove(), 5000);
      });
    });
  }
}

