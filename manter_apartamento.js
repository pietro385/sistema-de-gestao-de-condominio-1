const paramsA = new URLSearchParams(location.search);
const modeA = paramsA.get('mode');
const idA = paramsA.get('id');
const API = '/api/apartamentos';
const API_B = '/api/blocos';

const tituloA = document.getElementById('titulo');
const btnA = document.getElementById('btn-salvar');
const selB = document.getElementById('bloco_id');
const inpNum = document.getElementById('numero');
const inpVag = document.getElementById('vagas');
const formA = document.getElementById('form');

tituloA.textContent = modeA === 'novo' ? 'Novo Apartamento' : 'Alterar Apartamento';
btnA.textContent = modeA === 'novo' ? 'Cadastrar' : 'Salvar';

fetch(API_B)
  .then(r => r.json())
  .then(bs => {
    bs.forEach(b => {
      const o = document.createElement('option');
      o.value = b.id;
      o.textContent = b.descricao;
      selB.appendChild(o);
    });
    if (modeA !== 'novo') loadDados();
  });

function loadDados() {
  fetch(`${API}/${idA}`)
    .then(r => r.json())
    .then(a => {
      selB.value = a.bloco_id;
      inpNum.value = a.numero;
      inpVag.value = a.qtd_vagas;
    });
}

formA.onsubmit = async e => {
  e.preventDefault();
  const payload = {
    bloco_id: +selB.value,
    numero: inpNum.value.trim(),
    qtd_vagas: +inpVag.value
  };
  const method = modeA === 'novo' ? 'POST' : 'PUT';
  const url = modeA === 'novo' ? API : `${API}/${idA}`;
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  alert('Sucesso!');
  history.back();
};
