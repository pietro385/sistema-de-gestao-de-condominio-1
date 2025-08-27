const API = '/api/tipos_manutencao';
const tbodyT = document.querySelector('tbody');

async function carregaT() {
  const res = await fetch(API);
  const list = await res.json();
  tbodyT.innerHTML = '';
  list.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.id}</td><td>${t.descricao}</td>`;
    tbodyT.appendChild(tr);
  });
}

window.onload = carregaT;
