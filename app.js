const lista = document.getElementById("lista");
const estado = document.getElementById("estado");
const buscar = document.getElementById("buscar");
let usuarios = [];

function mostrar(datos) {
  lista.innerHTML = datos
    .map(u => `
      <li>
        <h2>${u.name}</h2>
        <p>${u.email}</p>
        <p>${u.address.city} · ${u.company.name}</p>
      </li>`)
    .join("");
  estado.textContent = datos.length ? "" : "Sin resultados.";
}

async function cargar() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(res.status);
    usuarios = await res.json();
    mostrar(usuarios);
  } catch (error) {
    estado.textContent = "No se pudieron cargar los usuarios.";
  }
}

buscar.addEventListener("input", () => {
  const texto = buscar.value.toLowerCase();
  mostrar(usuarios.filter(u =>
    u.name.toLowerCase().includes(texto) ||
    u.address.city.toLowerCase().includes(texto)
  ));
});

cargar();
