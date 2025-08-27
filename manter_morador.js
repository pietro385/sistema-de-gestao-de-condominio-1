const p = new URLSearchParams(location.search);
const mode = p.get('mode');
const cpfParam = p.get('cpf');
const API = '/api/moradores';
const API_A = '/api/apartamentos';

const titulo = document.getElementById('titulo');
const btn = document.getElementById('btn-salvar');
const inpCPF = document.getElementById('cpf');
const inpNome = document.getElementById('nome');
const inpTel = document.getElementById('tel');
const selA = document.getElementById('apart_id');
const selResp = document.getElementById('resp');
const selVe = document.getElementById('vei');
const inpVag = document.getElementById('vag');
const form = document.getElementById('form');

titulo.textContent = mode === 'novo' ? 'Novo Morador' : 'Alterar Morador';
btn.textContent = mode === 'novo' ? 'Cadastrar' : 'Salvar';

fetch(API_A)
  .then(r => r.json())
  .then(list => {
    list.forEach(a => {
      const o = document.createElement('option');
      o.value = a.id;
      o.textContent = `${a.bloco} - ${a.numero}`;
      selA.appendChild(o);
    });
    if (mode !== 'novo') loadM();
  });

function loadM() {
  fetch(`${API}/${cpfParam}`)
    .then(r => r.json())
    .then(m => {
      inpCPF.value = m.cpf;
      inpNome.value = m.nome;
      inpTel.value = m.telefone;
      selA.value = m.apartamento_id;
      selResp.value = m.tipo_responsavel;
      selVe.value = m.possui_veiculo;
      inpVag.value = m.vagas_garagem;
      inpCPF.disabled = true;
    });
}

form.onsubmit = async e => {
  e.preventDefault();
  const payload = {
    nome: inpNome.value.trim(),
    telefone: inpTel.value.trim(),
    apartamento_id: +selA.value,
    tipo_responsavel: selResp.value,
    possui_veiculo: selVe.value,
    vagas_garagem: +inpVag.value
  };
  let url = API, method = 'POST';
  if (mode === 'alter') {
    url = `${API}/${cpfParam}`;
    method = 'PUT';
  } else {
    payload.cpf = inpCPF.value.trim();
  }
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  alert('Sucesso!');
  history.back();
};
