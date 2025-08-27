const params = new URLSearchParams(location.search);
const mode = params.get('mode');
const id = params.get('id');
const API = '/api/blocos';

const form = document.getElementById('form');
const titulo = document.getElementById('titulo');
const btnSalvar = document.getElementById('btn-salvar');
const inputDesc = document.getElementById('descricao');
const inputQtd = document.getElementById('qtd');

titulo.textContent = mode === 'novo' ? 'Novo Bloco' :
                     mode === 'consult' ? 'Consultar Bloco' :
                     'Alterar Bloco';
btnSalvar.textContent = mode === 'novo' ? 'Cadastrar' : 'Salvar';

if (mode !== 'novo') {
  fetch(`${API}/${id}`)
    .then(r => r.json())
    .then(b => {
      inputDesc.value = b.descricao;
      inputQtd.value = b.qtd_apartamentos;
      if (mode === 'consult') {
        inputDesc.disabled = true;
        inputQtd.disabled = true;
        btnSalvar.style.display = 'none';
      }
    });
}

form.onsubmit = async e => {
  e.preventDefault();
  const payload = {
    descricao: inputDesc.value.trim(),
    qtd_apartamentos: +inputQtd.value
  };
  const method = mode === 'novo' ? 'POST' : 'PUT';
  const url = mode === 'novo' ? API : `${API}/${id}`;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  alert('Operação realizada com sucesso');
  history.back();
};
