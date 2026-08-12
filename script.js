document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const activeLink = document.querySelector(`[data-nav="${page}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = contactForm.querySelector('[data-form-status]');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      if (status) status.textContent = 'Sending…';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        if (response.ok) {
          if (status) status.textContent = 'Thanks — your message is on its way. I’ll get back to you soon.';
          contactForm.reset();
        } else {
          if (status) status.textContent = 'Something went wrong sending that. Please try again in a moment.';
        }
      } catch (error) {
        if (status) status.textContent = 'Something went wrong sending that. Please try again in a moment.';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
});
