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
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || 'Website visitor';
      const email = data.get('email') || '';
      const organisation = data.get('organisation') || 'Not provided';
      const topic = data.get('topic') || 'General enquiry';
      const message = data.get('message') || '';
      const subject = encodeURIComponent(`Website enquiry: ${topic}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\nTopic: ${topic}\n\n${message}`
      );
      const status = contactForm.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Opening your email application with the message prepared.';
      }
      window.location.href = `mailto:hasham87@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
