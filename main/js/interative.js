let compra_status = getId('compra_status');
let compra_fornecedor = getId('compra_fornecedor');
let compra_idcompra = getId('compra_id');
let compra_data = getId('compra_data');
let compra_valor = getId('compra_valor');
let compra_quantidade = getId('compra_quantidade');

let venda_idvenda = getId('venda_id');
let venda_data = getId('venda_data');
let venda_valor = getId('venda_valor');
let venda_taxa = getId('venda_taxa');
let venda_concluido = getId('venda_concluido');



let compStatus = $('#compra_status');
let compForn = $('#compra_fornecedor');
let compID = $('#compra_id');
let compData = $('#compra_data');
let compVal = $('#compra_valor');
let compQtd = $('#compra_quantidade');

let vendID = $('#venda_id');
let vendData = $('#venda_data');
let vendVal = $('#venda_valor');
let vendTaxa = $('#venda_taxa');
let vendConc = $('#venda_concluido');


$("#btnSair").click(()=>{
    auth.signOut().then(() => {
        window.location.replace("auth.html");
    });
});

let indexServer_compra;
let indexServer_venda

function atualizar(id) {
    let venda = "vendaUpd";
    let compra = "compraUpd";

    let dir = db.collection(LOJA).doc(PRODUTO);
    dir.get()
        .then(doc => {
            if (id == venda) {
                const refVenda = doc.data().venda;

                dir.update({
                    venda: firebase.firestore.FieldValue.arrayRemove(refVenda[indexServer_venda])
                })
                    .then(() => {
                        dir.update({
                            venda: firebase.firestore.FieldValue.arrayUnion({
                                idVenda: (vendID.val()).toLowerCase(),
                                data: configData(vendData.val()),
                                valor: Number(vendVal.val()),
                                taxa: Number(vendTaxa.val()),
                                concluido: concluido(vendConc.val())
                            })
                        })
                            .then(() => { location.reload(); })
                            .catch(err => { alert("erro ao tentar submeter o update ", err); });
                    })
                    .catch(err => { alert("erro ao tentar excluir a venda ", err); });
            } else if (id == compra) {
                let refCompra = doc.data().compra;

                dir.update({
                    compra: firebase.firestore.FieldValue.arrayRemove(refCompra[indexServer_compra])
                })
                    .then(() => {
                        dir.update({
                            compra: firebase.firestore.FieldValue.arrayUnion({
                                status: (compra_status.options[compra_status.selectedIndex].value),
                                fornecedor: (compForn.val()).toLowerCase(),
                                idCompra: (compID.val()).toLowerCase(),
                                data: configData(compData.val()),
                                valor: Number(compVal.val()),
                                quantidade: Number(compQtd.val())
                            })
                        })
                            .then(() => { location.reload(); })
                            .catch(err => { alert("erro ao tentar atualizar ", err); });
                    })
                    .catch(err => { alert("erro ao tentar excluir a compra ", err); });
            }
        });
}
function submeter(id) {
    
    let venda = "vendaSubmit";
    let compra = "compraSubmit";

    let dir = db.collection(LOJA).doc(PRODUTO);

    if (id == venda) {

        dir.update({
            venda: firebase.firestore.FieldValue.arrayUnion({

                idVenda: (vendID.val()).toLowerCase(),
                data: configData(vendData.val()),
                valor: Number(vendVal.val()),
                taxa: Number(vendTaxa.val()),
                concluido: concluido(vendConc.val())
            })
        })
        .then(() => { location.reload(); })
        .catch(err => { console.log('erro ao tentar submeter a venda ', err); });

    } else if (id == compra) {

        dir.update({
            compra: firebase.firestore.FieldValue.arrayUnion({

                status: (compra_status.options[compra_status.selectedIndex].value),
                fornecedor: (compForn.val()).toLowerCase(),
                idCompra: (compID.val()).toLowerCase(),
                data: configData(compData.val()),
                valor: Number(compVal.val()),
                quantidade: Number(compQtd.val())
            })
        })
        .then(() => { location.reload(); })
        .catch(err => { console.log('erro ao tentar submeter a compra ', err); });
    }
}
function editar(i, id) {
    let venda = "vendaEdit";
    let compra = "compraEdit";

    if (id == venda) {
        vendID.val(vendas[i].id);
        vendData.val(formatData(vendas[i].data));
        vendVal.val(vendas[i].valor);
        vendTaxa.val(vendas[i].taxa);
        vendConc.val(formatData(vendas[i].concluido));
        return (indexServer_venda = (vendas[i].indexServer));
    } else if (id == compra) {
        compStatus.val(compras[i].status);
        compForn.val(compras[i].fornecedor);
        compID.val(compras[i].id);
        compData.val(formatData(compras[i].data));
        compVal.val(compras[i].valor);
        compQtd.val(compras[i].quantidade);
        return (indexServer_compra = (compras[i].indexServer));
    }
}
function deletar(i, id) {
    let venda = "vendaDelete";
    let compra = "compraDelete";

    let dir = db.collection(LOJA).doc(PRODUTO);
        dir.get()
            .then(doc => {
                if (id == venda) {
                    const dirVenda = doc.data().venda;
                    dir.update({
                        venda: firebase.firestore.FieldValue.arrayRemove(dirVenda[i])
                    })
                        .then(() => { location.reload(); })
                        .catch(err => { console.log("erro ao tentar deletar a venda ", err) });
                } else if (id == compra) {
                    const dirCompra = doc.data().compra;
                    dir.update({
                        compra: firebase.firestore.FieldValue.arrayRemove(dirCompra[i])
                    })
                        .then(() => { location.reload(); })
                        .catch(err => { console.log("erro ao tentar deletar a compra ", err) });
                };
            });
}

$('#btnDeleteProd').click(()=>{

    let prod = $('#selectProdut').val();
    let dir = db.collection(LOJA).doc(prod);


    let text = "confirme para deletar o item: " + prod;
    if (confirm(text)) {

        dir.delete();
        
        setTimeout(()=>{
            window.location.reload();
        }, 1000);
    }
});

$('#newProduct').click(()=>{

    let nomeItem = $('#inpProduto').val();
    let dir = db.collection(LOJA);

    let text = "confirme para criar o item: " + nomeItem;
    if (confirm(text)) {
        dir.doc(nomeItem).set({}, {merge: true})
            .then(doc=>{
                alert('o item "' + nomeItem + '" foi criado com sucesso! \n\n resposta do servidor: ', doc);

                setTimeout(()=>{
                    window.location.reload();
                }, 500);
            }).catch(error=>{
                console.log("erro ao cadastrar um novo item. error: ", error);
            });
    }
});

$('#btnSave').click(()=>{
    localStorage.setItem('loja', $('#inpLoja').val());
    localStorage.setItem('produto', $('#selectProdut').val());

    setTimeout(()=>{window.location.reload();},1000);
});



let imgFiltro = true;
$('#imgFiltro').click(() => {

    $("#conteudoFiltro").slideToggle("fast", () => {
        if (imgFiltro)
            $("#imgFiltro").attr("src", "main/resource/up-arrows.png");
        else {
            $("#conteudoFiltro").css("display", "flex");
            $("#imgFiltro").attr("src", "main/resource/down-arrows.png");
        }
        imgFiltro = !imgFiltro;
    });
});

let imgDados = true;
$('#imgDados').click(() => {

    $("#conteudoDados").slideToggle("fast", () => {
        if (imgDados)
            $("#imgDados").attr("src", "main/resource/up-arrows.png");
        else {
            $("#conteudoDados").css("display", "flex");
            $("#imgDados").attr("src", "main/resource/down-arrows.png");
        }
        imgDados = !imgDados;
    });
});

let imgCompra = false;
$('#imgCompra').click(() => {

    $("#conteudoCompra").slideToggle("fast", () => {
        if (imgCompra)
            $('#imgCompra').attr('src', 'main/resource/up-arrows.png');
        else
            $('#imgCompra').attr('src', 'main/resource/down-arrows.png');

        imgCompra = !imgCompra;
    });
});

let imgVenda = false;
$('#imgVenda').click(() => {

    $("#conteudoVenda").slideToggle("fast", () => {
        if (imgVenda)
            $('#imgVenda').attr('src', 'main/resource/up-arrows.png');
        else
            $('#imgVenda').attr('src', 'main/resource/down-arrows.png');

        imgVenda = !imgVenda;
    });
});