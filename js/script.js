document.addEventListener('DOMContentLoaded', function () {
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item > .nav-link').forEach(function (link) {
    var linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      if (status) status.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (status) status.textContent = 'Thanks — your message has been sent. Bruce will get back to you soon.';
        } else {
          return response.json().then(function (data) {
            var message = (data && data.errors && data.errors.length)
              ? data.errors.map(function (err) { return err.message; }).join(', ')
              : 'Sorry, something went wrong sending your message. Please email bruce@brucegreenhalgh.com directly.';
            if (status) status.textContent = message;
          });
        }
      }).catch(function () {
        if (status) status.textContent = 'Sorry, something went wrong sending your message. Please email bruce@brucegreenhalgh.com directly.';
      }).finally(function () {
        submitBtn.disabled = false;
      });
    });
  }

  var myStory = document.querySelector('.framed-col .overlap-panel');
  var qualGrid = document.querySelector('.qualifications-grid');
  if (myStory && qualGrid && qualGrid.children.length >= 4) {
    var row2Cells = [qualGrid.children[2], qualGrid.children[3]];
    var syncQualificationsRowHeight = function () {
      if (window.innerWidth <= 900) {
        row2Cells.forEach(function (c) { c.style.height = ''; });
        return;
      }
      var h = myStory.getBoundingClientRect().height;
      row2Cells.forEach(function (c) { c.style.height = h + 'px'; });
    };
    syncQualificationsRowHeight();
    window.addEventListener('resize', syncQualificationsRowHeight);
  }
});
