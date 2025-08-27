const API = '/api/apartamentos';
const corpo = document.querySelector('tbody');
const filtro = document.getElementById('filtro');

async function carrega() {
  const res = await fetch(API);
  const list = await res.json();
  corpo.innerHTML = '';
  list
    .filter(a =>
      a.bloco.toLowerCase().includes(filtro.value.toLowerCase()) ||
      a.numero.includes(filtro.value)
    )
    .forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${a.id}</td>
        <td>${a.bloco}</td>
        <td>${a.numero}</td>
        <td>${a.qtd_vagas}</td>
        <td>
          <button onclick="editar(${a.id})">Alterar</button>
          <button onclick="excluir(${a.id})">Excluir</button>
        </td>`;
      corpo.appendChild(tr);
    });
}

function editar(id) {
  location.href = `manter_apartamento.html?mode=alter&id=${id}`;
}

async function excluir(id) {
  if (!confirm('Confirma exclusão?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  carrega();
}

filtro.addEventListener('input', carrega);
window.onload = carrega;
