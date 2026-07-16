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
      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thanks — this form is not yet connected to an email service, so please also reach out directly via bruce@brucegreenhalgh.com until it is.';
      }
    });
  }
});
