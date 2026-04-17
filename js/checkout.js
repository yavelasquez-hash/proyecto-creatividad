// ============================================================
// checkout.js — Funcionalidad del checkout
// ============================================================

// ── Proceder al checkout ─────────────────────────────────────
function proceedToCheckout() {
  // Verificar si hay productos en el carrito
  if (Object.keys(cart).length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de continuar.');
    return;
  }

  // Guardar el carrito en sessionStorage para pasarlo a checkout.html
  sessionStorage.setItem('cartData', JSON.stringify(cart));

  // Redirigir a checkout.html
  window.location.href = './checkout.html';
}

// ── Cargar datos del carrito en checkout.html ────────────────
function loadCheckoutData() {
  const cartData = sessionStorage.getItem('cartData');
  
  if (!cartData) {
    // Si no hay datos, redirigir al índice
    window.location.href = './index.html';
    return;
  }

  const cart = JSON.parse(cartData);
  renderCheckoutCart(cart);
}

// ── Renderizar resumen del carrito en checkout ───────────────
function renderCheckoutCart(cart) {
  const tbody = document.getElementById('checkoutCartBody');
  const items = Object.entries(cart);

  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Carrito vacío</td></tr>';
    return;
  }

  tbody.innerHTML = items.map(([id, item]) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>$${item.price.toLocaleString('es-CO')}</td>
      <td>$${(item.price * item.qty).toLocaleString('es-CO')}</td>
    </tr>
  `).join('');

  updateCheckoutTotal(cart);
}

// ── Calcular total en checkout ──────────────────────────────
function updateCheckoutTotal(cart) {
  const total = Object.values(cart)
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('checkoutSubtotal').textContent =
    '$' + total.toLocaleString('es-CO');
    
  document.getElementById('checkoutTotal').textContent =
    '$' + total.toLocaleString('es-CO');
}

// ── Procesar pago (simulado) ────────────────────────────────
function processPayment(event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(document.getElementById('checkoutForm'));
  
  // Validaciones básicas
  const email = formData.get('email');
  const cardNumber = formData.get('cardNumber').replace(/\s/g, '');
  const cardName = formData.get('cardName');
  const expiry = formData.get('expiry');
  const cvv = formData.get('cvv');

  // Validar tarjeta (números solo)
  if (!/^\d{16}$/.test(cardNumber)) {
    alert('El número de tarjeta debe tener 16 dígitos.');
    return;
  }

  // Validar CVV
  if (!/^\d{3,4}$/.test(cvv)) {
    alert('El CVV debe tener 3 o 4 dígitos.');
    return;
  }

  // Validar nombre en tarjeta
  if (cardName.trim().length < 3) {
    alert('El nombre en la tarjeta es inválido.');
    return;
  }

  // Si todas las validaciones pasan
  showPaymentSuccess();
}

// ── Mostrar confirmación de pago ────────────────────────────
function showPaymentSuccess() {
  // Limpiar sessionStorage
  sessionStorage.removeItem('cartData');

  // Mostrar confirmación
  const formSection = document.querySelector('.checkout-form-section');
  formSection.innerHTML = `
    <div class="alert alert-success" role="alert">
      <div class="text-center py-5">
        <i class="bi bi-check-circle fs-1 text-success mb-3"></i>
        <h3 class="fw-bold mt-3">¡Compra realizada con éxito!</h3>
        <p class="text-muted mt-2">Tu pedido está siendo procesado.</p>
        <p class="text-muted small">Te enviaremos un correo de confirmación próximamente.</p>
        <a href="./index.html" class="btn btn-primary mt-4">
          <i class="bi bi-house me-1"></i>Volver a la tienda
        </a>
      </div>
    </div>
  `;
}

// ── Formatear número de tarjeta con espacios ────────────────
function formatCardNumber(value) {
  return value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
}

// ── Formatear fecha de expiración (MM/YY) ───────────────────
function formatExpiry(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
}

// ── Inicializar eventos del formulario ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos del carrito solo si estamos en checkout.html
  if (document.getElementById('checkoutCartBody')) {
    loadCheckoutData();
  }

  // Formateo automático de campos
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      e.target.value = formatCardNumber(e.target.value);
    });
  }

  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      e.target.value = formatExpiry(e.target.value);
    });
  }

  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
  }
});
