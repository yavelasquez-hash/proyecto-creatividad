document.addEventListener("DOMContentLoaded", () => {

const ventas = document.getElementById("ventasChart");
const categorias = document.getElementById("categoriasChart");

if (!ventas || !categorias) {
console.log("Canvas no encontrado");
return;
}

// Gráfica Línea
new Chart(ventas.getContext("2d"), {
type: "line",
data: {
labels: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],
datasets: [{
label: "Ventas",
data: [300,500,420,800,650,900,700],
borderColor: "#ff7a00",
backgroundColor: "rgba(255,122,0,0.2)",
borderWidth: 3,
fill: true,
tension: 0.4
}]
},
options: {
responsive: true,
maintainAspectRatio: false
}
});

// Gráfica Dona
new Chart(categorias.getContext("2d"), {
type: "doughnut",
data: {
labels: ["Herramientas","Electricidad","Fontanería","Pintura"],
datasets: [{
data: [40,25,20,15],
backgroundColor: [
"#ff7a00",
"#0d6efd",
"#198754",
"#dc3545"
]
}]
},
options: {
responsive: true,
maintainAspectRatio: false
}
});

});