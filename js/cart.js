// cart.js – Quản lý giỏ hàng với localStorage
(function () {
  var KEY = 'mbg_cart_v2';

  // Lấy toàn bộ giỏ hàng (mảng object {id, name, price, img, cat, qty})
  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadges();
  }

  function updateBadges() {
    var total = getCart().reduce(function (s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('#cart-count, .cart-badge').forEach(function (el) {
      el.textContent = total;
    });
  }

  // Thêm sản phẩm – gọi từ onclick với element .product-card gần nhất
  window.addCart = function (btn) {
    var card = btn.closest('.product-card');
    if (!card) return;

    // Lấy thông tin sản phẩm từ card
    var name  = (card.querySelector('.product-name')  || {}).textContent || 'Sản phẩm';
    var brand = (card.querySelector('.product-brand') || {}).textContent || '';
    var priceText = (card.querySelector('.product-price') || {}).textContent || '0';
    var price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
    var img   = (card.querySelector('img') || {}).src || '';
    // Tạo id từ tên (đơn giản)
    var id = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    var items = getCart();
    var exist = items.find(function (i) { return i.id === id; });
    if (exist) {
      exist.qty += 1;
    } else {
      items.push({ id: id, name: name, brand: brand, price: price, img: img, qty: 1 });
    }
    saveCart(items);

    // Feedback button
    var orig = btn.textContent;
    btn.textContent = '✓ Đã thêm';
    btn.style.background = '#22c55e';
    setTimeout(function () {
      btn.textContent = orig;
      btn.style.background = '';
    }, 1400);
  };

  // Xóa sản phẩm
  window.removeFromCart = function (id) {
    saveCart(getCart().filter(function (i) { return i.id !== id; }));
  };

  // Cập nhật số lượng
  window.updateCartQty = function (id, qty) {
    var items = getCart();
    var item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    if (qty < 1) { removeFromCart(id); return; }
    item.qty = qty;
    saveCart(items);
  };

  // Xóa toàn bộ giỏ
  window.clearCart = function () { saveCart([]); };

  // Expose getCart cho trang giỏ hàng dùng
  window.getCart = getCart;

  // Khởi tạo badge khi trang load
  document.addEventListener('DOMContentLoaded', updateBadges);
})();
