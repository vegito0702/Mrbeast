// dropdown.js – Dropdown mở/đóng bằng click
document.addEventListener('DOMContentLoaded', function () {
  var toggles = document.querySelectorAll('.dropdown-toggle');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var parent = toggle.closest('.nav-dropdown');
      var isOpen = parent.classList.contains('open');

      // Đóng tất cả dropdown khác trước
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
      });

      // Toggle cái đang bấm
      if (!isOpen) parent.classList.add('open');
    });
  });

  // Bấm ra ngoài thì đóng
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
    });
  });

  // Bấm vào menu item thì đóng dropdown
  document.querySelectorAll('.dropdown-menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
      });
    });
  });
});
