// ============================================================
// detailModal.js — Lógica del modal de detalle del producto
// ============================================================

function openDetailModal(productId) {
  const p = allProducts.find(pr => pr.id === productId);
  if (!p) return;

  document.getElementById('detailModalLabel').textContent = p.name;
  document.getElementById('detailModalImg').src           = p.image;
  document.getElementById('detailModalImg').alt           = p.name;
  document.getElementById('detailModalDesc').textContent  = p.description;
  document.getElementById('detailModalPrice').textContent = `$${p.price.toLocaleString('es-CO')}`;

  new bootstrap.Modal(document.getElementById('detailModal')).show();
}