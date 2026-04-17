// ============================================================
// cart.js — Lógica básica del carrito (sin persistencia)
// ============================================================

const cart = {}; // { productId: { qty, name, price } }

// ── Agregar al carrito ───────────────────────────────────────
function addToCart(productId) {
  const qtyEl = document.getElementById(`qty-${productId}`);
  const qty   = parseInt(qtyEl.textContent) || 0;

  if (qty === 0) return; // nada que agregar

  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  if (cart[productId]) {
    cart[productId].qty += qty;
  } else {
    cart[productId] = { qty, name: product.name, price: product.price };
  }

  // Reset cantidad en tarjeta
  qtyEl.textContent = 0;

  updateCartBadge();
  showCartFeedback(productId);
}

// ── Actualizar badge del navbar ──────────────────────────────
function updateCartBadge() {
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

// ── Feedback visual al agregar ───────────────────────────────
function showCartFeedback(productId) {
  const btn = document.getElementById(`btn-cart-${productId}`);
  if (!btn) return;

  const original = btn.innerHTML;
  btn.innerHTML  = '<i class="bi bi-check-lg me-1"></i>¡Agregado!';
  btn.disabled   = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled  = false;
  }, 1200);
}