// ============================================================
// app.js — Lógica principal: carga y filtrado de productos
// ============================================================

const PRODUCTS_URL = '../data/products.json';

let allProducts = [];
let activeCategory = null; // null = mostrar todos

// ── Carga inicial ────────────────────────────────────────────
async function loadProducts() {
  try {
    console.log(PRODUCTS_URL)
    const res = await fetch(PRODUCTS_URL);
    console.log(res)
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
}

// ── Renderizado de tarjetas ──────────────────────────────────
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const title = document.getElementById('categoryTitle');

  title.textContent = activeCategory
    ? capitalizeFirst(activeCategory)
    : 'Todos los productos';

  if (products.length === 0) {
    grid.innerHTML = `<p class="text-muted">No hay productos en esta categoría.</p>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="col-12 col-sm-6 col-md-4 col-xl-3">
      <div class="card product-card h-100">

        <!-- Nombre en el header -->
        <div class="card-header product-card-header">
          <h6 class="mb-0 fw-semibold">${p.name}</h6>
        </div>

        <!-- Imagen -->
        <img
          src="${p.image}"
          alt="${p.name}"
          class="product-img"
          onerror="this.src='assets/images/placeholder.png'"
        />

        <!-- Cuerpo: descripción + precio + controles -->
        <div class="card-body d-flex flex-column">
          <p class="card-text text-muted small flex-grow-1">${p.description}</p>
          <div class="mt-3">

            <p class="product-price mb-2">
              $${p.price.toLocaleString('es-CO')}
            </p>

            <!-- BOTÓN VER DETALLE -->
            <button
              class="btn btn-detail btn-sm w-100 mb-2"
              onclick="openDetailModal(${p.id})"
            >
              <i class="bi bi-eye me-1"></i>Ver detalle
            </button>

            <!-- Controles de cantidad -->
            <div class="qty-controls d-flex align-items-center gap-2">
              <button
                class="btn btn-qty"
                onclick="changeQty(${p.id}, -1)"
                id="btn-minus-${p.id}"
              >−</button>

              <span class="qty-display" id="qty-${p.id}">0</span>

              <button
                class="btn btn-qty"
                onclick="changeQty(${p.id}, 1)"
              >+</button>

              <button
                class="btn btn-add-cart ms-auto"
                onclick="addToCart(${p.id})"
                id="btn-cart-${p.id}"
              >
                <i class="bi bi-cart-plus me-1"></i>Agregar
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  `).join('');
}

// ── Cambiar cantidad en tarjeta ──────────────────────────────
function changeQty(id, delta) {
  const qtyEl = document.getElementById(`qty-${id}`);
  let current = parseInt(qtyEl.textContent) || 0;
  current = Math.max(0, current + delta);
  qtyEl.textContent = current;
}

// ── Filtrado por categoría ───────────────────────────────────
function filterByCategory(category) {
  activeCategory = category;
  const filtered = allProducts.filter(p => p.category === category);
  renderProducts(filtered);
}

// ── Eventos del navbar ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Marcar activo
      document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      filterByCategory(link.dataset.category);
    });
  });
});

// ── Helpers ──────────────────────────────────────────────────
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}