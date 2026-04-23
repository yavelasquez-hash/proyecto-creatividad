// ============================================================
// chat.js — Botón flotante de WhatsApp
// ============================================================

// Número de WhatsApp y mensaje predeterminado
const WA_NUMBER  = '573000000000';
const WA_MESSAGE = encodeURIComponent('Hola, quiero información sobre productos de BricoMax');
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// Asigna la URL al botón flotante cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.whatsapp-float');
  if (btn) {
    btn.href   = WA_URL;
    btn.target = '_blank';
    btn.rel    = 'noopener noreferrer';
  }
});