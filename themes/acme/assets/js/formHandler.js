import * as params from '@params';

export default {
  init() {
    document.addEventListener('submit', async event => {
      if (!(event.target instanceof HTMLFormElement)) { return; }
      event.preventDefault();
      const submit = document.querySelector('form button[type=submit]');
      const form = event.target;
      const data = new FormData(form);
      let response;
      submit.disabled = true;
      try {
        response = await fetch(form.action, {
          method: form.method,
          // body: new URLSearchParams(data),
          // headers: { "Content-Type": "application/x-www-form-urlencoded" }
          body: JSON.stringify(Object.fromEntries(data)),
          headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
          form.insertAdjacentHTML('afterend', '<div id="form-message" class="success">Your message has been successfully sent.</div>');
          if (params.hideForm) form.style.display = 'none';
        } else {
          throw('error');
        }  
      } catch(e) {
        form.insertAdjacentHTML('afterend', '<div id ="form-message" class="error">An error occured when trying to send your message.</div>');
      } finally {
        let message = document.getElementById('form-message');
        setTimeout(() => {
          if (response.ok) form.reset();
          message.remove(); 
          submit.disabled = false;
          if (params.hideForm) form.style.display = 'block';
        }, 1000 * params.timeout);
      }
    });
  }
}

