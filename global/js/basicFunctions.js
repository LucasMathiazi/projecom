function getId(e) { return document.getElementById(e); }

function getClass(e) { return document.getElementsByClassName(e); }

function getTag(e) { return document.getElementsByTagName(e); }

function novoElemento(e) { return document.createElement(e); }

function toBRL(e) { return e.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); }

function ordenar(e) { e.sort((a, b) => { return b.data - a.data }); }

function formatData(data) { if (data == "") { return data; } else { return (data).toLocaleDateString(); } }

function configData(data) {
    let dia = data.substr(0, 2);
    let mes = data.substr(3, 2);
    let ano = data.substr(6, 6);

    return (ano + "/" + mes + "/" + dia + " 00:00:00");
}

let concluido = (data) => { if (data == "") { return data; } else { return configData(data); } }