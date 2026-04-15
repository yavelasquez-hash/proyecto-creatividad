// ============================================================
// cartModal.js — Funcionalidad del modal del carrito
// ============================================================

// ── Abrir modal y renderizar resumen ────────────────────────
function openCartModal() {
  renderCartSummary();
  const modal = new bootstrap.Modal(document.getElementById('cartModal'));
  modal.show();
}

// ── Renderizar productos en el modal ────────────────────────
function renderCartSummary() {
  const body  = document.getElementById('cartModalBody');
  const items = Object.entries(cart);

  if (items.length === 0) {
    body.innerHTML = `
      <div class="empty-cart text-center py-4">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
        <p class="mt-3 text-muted">Tu carrito está vacío.</p>
      </div>`;
    updateModalTotal();
    return;
  }

  body.innerHTML = items.map(([id, item]) => `
    <div class="cart-item d-flex align-items-center gap-3 py-3" id="cart-row-${id}">

      <!-- Info del producto -->
      <div class="flex-grow-1">
        <p class="mb-0 fw-semibold">${item.name}</p>
        <small class="text-muted">$${item.price.toLocaleString('es-CO')} c/u</small>
      </div>

      <!-- Controles de cantidad -->
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-qty btn-sm" onclick="changeCartQty(${id}, -1)">−</button>
        <span class="qty-display" id="modal-qty-${id}">${item.qty}</span>
        <button class="btn btn-qty btn-sm" onclick="changeCartQty(${id}, 1)">+</button>
      </div>

      <!-- Subtotal -->
      <div class="text-end" style="min-width: 90px;">
        <span class="fw-semibold" id="subtotal-${id}">
          $${(item.price * item.qty).toLocaleString('es-CO')}
        </span>
      </div>

      <!-- Eliminar -->
      <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${id})">
        <i class="bi bi-trash"></i>
      </button>

    </div>
  `).join('<hr class="my-0">');

  updateModalTotal();
}

// ── Cambiar cantidad desde el modal ─────────────────────────
function changeCartQty(productId, delta) {
  if (!cart[productId]) return;

  cart[productId].qty = Math.max(1, cart[productId].qty + delta);

  // Actualizar UI del modal
  document.getElementById(`modal-qty-${productId}`).textContent = cart[productId].qty;
  document.getElementById(`subtotal-${productId}`).textContent =
    '$' + (cart[productId].price * cart[productId].qty).toLocaleString('es-CO');

  updateModalTotal();
  updateCartBadge();
}

// ── Eliminar producto del carrito ────────────────────────────
function removeCartItem(productId) {
  delete cart[productId];
  renderCartSummary();
  updateCartBadge();
}

// ── Calcular y mostrar total ─────────────────────────────────
function updateModalTotal() {
  const total = Object.values(cart)
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('cartTotal').textContent =
    '$' + total.toLocaleString('es-CO');
}

// ── Vaciar carrito completo ──────────────────────────────────
function clearCart() {
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCartSummary();
  updateCartBadge();
}

// ── Evento del botón carrito en navbar ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cartBtn').addEventListener('click', openCartModal);
});