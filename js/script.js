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
