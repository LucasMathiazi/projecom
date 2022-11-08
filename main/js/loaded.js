var compras = [], vendas = [];

function preLoad() {
    setTimeout(() => {
        getId("preLoad").style.display = 'none';
        getTag("header")[0].style.display = 'block';
        getTag("main")[0].style.display = 'block';
    }, 500);
}

let hj = new Date();

let primeiroDiaMesAtual = new Date(hj.getFullYear(), hj.getMonth(), 1);
let ultimoDiaMesAtual = new Date(hj.getFullYear(), (hj.getMonth() + 1), 0);

let primeiroDiaMesAnterior = new Date(hj.getFullYear(), (hj.getMonth() - 1), 1);
let ultimoDiaMesAnterior = new Date(hj.getFullYear(), hj.getMonth(), 0);

let primeiroDiaMesRetrasado = new Date(hj.getFullYear(), (hj.getMonth() - 2), 1);
let ultimoDiaMesRetrasado = new Date(hj.getFullYear(), (hj.getMonth() - 1), 0);
function dados(cb) {
    let vendConc = vendas.filter(e=>{
        if (e.concluido > 0) {
            return e;
        }
    });

    let dadosCompras = () => {
        //quantidade compras
        getId('comp1').innerHTML += compras.length;

        //total unidades compradas
        getId('comp2').innerHTML +=
            compras.reduce((t, e) => {
                return t += e.quantidade;
            }, 0);

        //valor total gasto
        getId('comp3').innerHTML += toBRL(
            compras.reduce((t, e) => {
                return t += e.valor;
            }, 0)
        );

        //mês atual
        getId('comp4').innerHTML += toBRL(
            compras.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.valor;
            }, 0)
        );

        //mês anterior
        getId('comp5').innerHTML += toBRL(
            compras.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.valor;
            }, 0)
        );

        //mês retrasado
        getId('comp6').innerHTML += toBRL(
            compras.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }   
            }, 0).reduce((t, e) => {
                return t += e.valor;
            }, 0)
        );

        //valor médio de compra
        getId('comp7').innerHTML += toBRL(
            compras.reduce((t, e) => {
                return t += e.valor;
            }, 0) / compras.length
        );

        //valor médio da unidade
        getId('comp8').innerHTML += toBRL(
            compras.reduce((t, e) => {
                return t += e.valor;
            }, 0) / compras.reduce((t, e) => {
                return t += e.quantidade;
            }, 0)
        );
    }
    
    let dadosVendas = () => {
        //total unidades vendidas
        getId('vend1').innerHTML +=
            vendas.length
        + ' (' +
            vendConc.length
        + ')'; 

        //mês atual
        getId('vend2').innerHTML +=
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).length

            + ' (' + vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).length + ')'; 

        //mês anterior
        getId('vend3').innerHTML +=
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).length

            + ' (' + vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).length + ')'; 

        //mês retrasado
        getId('vend4').innerHTML +=
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }
            }, 0).length

            + ' (' + vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).length + ')'; 

        //valor médio de venda
        getId('vend5').innerHTML += toBRL(
            vendas.reduce((t, e) => {
                return t += e.valor;
            }, 0) / vendas.length
        );
    }

    let dadosEstoque = () => {

        //unidades em andamento
        getId('est1').innerHTML +=
            compras.filter(e => {
                if (e.status == "1") {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.quantidade;
            }, 0);

        //unidades em estoque
        getId('est2').innerHTML +=
            compras.filter(e => {
                if (e.status == "2") {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += (e.quantidade - e.vendas);
            }, 0);
    }

    let dadosContabeis = () => {

        //total faturado
        getId('val1').innerHTML += toBRL(
            
            vendas.reduce((t, e) => {
                return t += e.faturado;
            }, 0)
        )
        + ' (' + toBRL(
            vendConc.reduce((t, e)=> {
                return t += e.faturado;
            }, 0)
        ) + ')';

        //faturamento mês atual
        getId('val2').innerHTML += toBRL(
            
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado;
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado;
            }, 0)

        ) + ')';

        //faturamento mês passado
        getId('val3').innerHTML += toBRL(
            
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado;
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado;
            }, 0)

        ) + ')';

        //faturamento mês retrasado
        getId('val4').innerHTML += toBRL(
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.faturado;
            }, 0)

        ) + ')';

        //total lucro
        getId('val5').innerHTML += toBRL(
            vendas.reduce((t, e) => {
                return t += e.lucro;
            }, 0)
        ) + ' (' + toBRL(
            vendConc.reduce((t, e)=> {
                return t += e.lucro;
            }, 0)
        ) + ')';

        //lucro mês atual
        getId('val6').innerHTML += toBRL(
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAtual && e.data <= ultimoDiaMesAtual) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro;
            }, 0)

        ) + ')';

        //lucro mês passado
        getId('val7').innerHTML += toBRL(
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro;
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesAnterior && e.data <= ultimoDiaMesAnterior) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro;
            }, 0)

        ) + ')';

        //lucro mês retrasado
        getId('val8').innerHTML += toBRL(
            vendas.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro;
            }, 0)
        ) + ' (' + toBRL(

            vendConc.filter(e => {
                if (e.data >= primeiroDiaMesRetrasado && e.data <= ultimoDiaMesRetrasado) {
                    return e;
                }
            }, 0).reduce((t, e) => {
                return t += e.lucro;
            }, 0)

        ) + ')';
    }

    dadosCompras();
    dadosVendas();
    dadosEstoque();
    dadosContabeis();

    return cb();
}

function tabela(cb) {

    let zero = (number) => {
        if (number <= 9)
            return number = "0" + number;
        else
            return number;
    }

    let status = (i) => {
        if (i == "1")
            return "em andamento";
        else if (i == "2")
            return "disponível para venda";
        else if (i == "3")
            return "esgotado";
        else
            return "erro";
    }

    let qtdCompras = (compras.length);
    let compraLista = getId('compra_lista');
    compras.forEach((e, i) => {

        compraLista.appendChild(novoElemento('tr'));
        compraLista.lastChild.innerHTML = (

            '<td class="tdTextLeft">' + status(e.status) + '</td>' +  //status

            '<td>' + e.fornecedor + '</td>' +

            '<td class="tdTextLeft tdTextColorGray">' + zero(qtdCompras--) + '. ' + e.id + '</td>' +

            '<td class="tdTextColorRed">' + formatData(e.data) + '</td>' +

            '<td class="tdTextColorBlue">' + toBRL(e.valor) + ' . ' + toBRL(e.unidade) + '</td>' +

            '<td>' + e.quantidade + '</td>' +

            '<td class="tdTextColorPurple">' + e.vendas + '</td>' +

            '<td class="tdBtn">' +
                '<button value="' + i + '" class="btnEdit" id="compraEdit" onclick="editar(this.value, this.id)"> editar </button>' +
            '</td>' +

            '<td class="tdBtn">' +
                '<button value="' + (e.indexServer) + '" class="btnDel" id="compraDelete" onclick="deletar(this.value, this.id)"> deletar </button>' +
            '</td>'
        );
    });

    let qtdVendas = (vendas.length);
    let vendaLista = getId('venda_lista');
    vendas.forEach((e, i) => {

        let concluido = (data) => { if (data == "") { return data; } else { return formatData(data); } }

        vendaLista.appendChild(novoElemento('tr'));
        vendaLista.lastChild.innerHTML = (

            '<td class="tdTextLeft tdTextColorGray">' + zero(qtdVendas--) + '. ' + e.id + '</td>' +

            '<td class="tdTextColorRed">' + formatData(e.data) + '</td>' +

            '<td class="tdTextColorBlue">' + toBRL(e.valor) + '</td>' +

            '<td class="tdTextColorGray">' + e.taxa + ' %' + '</td>' +

            '<td class="tdTextColorPurple">' + toBRL(e.faturado) + '</td>' +

            '<td class="tdTextColorPurple">' + toBRL(e.lucro) + '</td>' +

            '<td class="tdTextColorRed">' + concluido(e.concluido) + '</td>' +  //concluido

            '<td class="tdBtn">' +
                '<button value="' + i + '" class="btnEdit" id="vendaEdit" onclick="editar(this.value, this.id)"> editar </button>' +
            '</td>' +

            '<td class="tdBtn">' +
                '<button value="' + e.indexServer + '" class="btnDel" id="vendaDelete" onclick="deletar(this.value, this.id)"> deletar </button>' +
            '</td>'
        );
    });

    return cb(preLoad);
}

let cboxComp = getId('cboxComp');
let cboxVend = getId('cboxVend');
function saveStatus () {
    localStorage.setItem('cboxComp', Number(cboxComp.checked));
    localStorage.setItem('cboxVend', Number(cboxVend.checked));

    setTimeout(()=>{
        window.location.reload();
    }, 200);
}
function listas(loja, produto) {
    
    db.collection(loja).doc(produto).get()
        .then(doc => {
            
            //lista de compras
            const refCompra = doc.data().compra;
            try {
                refCompra.forEach((e, i) => {

                    let unidade = (valor, quantidade) => { return valor / quantidade; }

                    compras.push({

                        'fornecedor': (e.fornecedor),
                        'id': (e.idCompra),
                        'data': (new Date(e.data)),
                        'valor': (e.valor),
                        'quantidade': (e.quantidade),
                        'indexServer': (i),
                        'status': (e.status),
                        'unidade': (unidade((e.valor), (e.quantidade))),
                        'vendas': 0
                    });
                });

                //filtra os ultimos 3 meses, caso checked
                cboxComp.checked = Number(localStorage.getItem('cboxComp'));
                if (cboxComp.checked) {
                    compras = compras.filter(e=>{
                        if (e.data <= ultimoDiaMesAtual && e.data >= primeiroDiaMesRetrasado) {
                            return e;
                        }
                    })
                }

                ordenar(compras);

            } catch (error) {
                console.log('erro ao carregar a lista de COMPRAS.\n\nresposta do servidor: ', error);
            }

            //lista de vendas
            const refVenda = doc.data().venda;
            try {
                refVenda.forEach((e, i) => {

                    let faturado = (valor, taxa) => { return valor - (valor * (taxa / 100)) }

                    let concluido = (data) => { if (data == "") { return data; } else { return new Date(data); } }

                    vendas.push({
                        'id': (e.idVenda),
                        'data': (new Date(e.data)),
                        'valor': (e.valor),
                        'taxa': (e.taxa),
                        'concluido': concluido((e.concluido)),
                        'indexServer': i,
                        'faturado': faturado((e.valor), (e.taxa))
                    });
                });

                //filtra os ultimos 3 meses, caso checked
                cboxVend.checked = Number(localStorage.getItem('cboxVend'));
                if (cboxComp.checked) {
                    vendas = vendas.filter(e=>{
                        if (e.data <= ultimoDiaMesAtual && e.data >= primeiroDiaMesRetrasado) {
                            return e;
                        }
                    })
                }

                ordenar(vendas);

            } catch (error) {
                console.log('erro ao carregar a lista de VENDAS.\n\nresposta do servidor: ', error);
            }

            //calculo lucro
            try {
                let index_compra = ((compras.length) - 1);

                vendas.forEach((e, i) => {

                    let lucro = () => {
                        // pegamos a quantidade de vendas da última compra
                        // pegamos a quantidade de itens comprados da ultima compra
                        // se a quantidade de vendas for menor que a quantidade comprada, segue-
                        if (compras[index_compra].vendas < compras[index_compra].quantidade) {
                            // incrementamos +1 na venda
                            compras[index_compra].vendas += 1;
                        } else {
                            //caso a ultima compra for toda vendida, decrementamos o indice da compra
                            index_compra--;
                            // incrementamos +1 na venda
                            compras[index_compra].vendas += 1;
                        }
                        // returna o calculo do lucro
                        return (e.faturado - compras[index_compra].unidade);
                    }

                    vendas[i].lucro = lucro();
                });

            } catch (error) {
                console.log('erro ao calcular o lucro.\n\nresposta do servidor: ', error);
            }

            return tabela(dados);
        }).catch (error=> {
            alert('erro ao carregar a lista de compra e venda. error:\n\nresposta do servidor: ', error);
            return preLoad();
        });
}

addEventListener('load', () => {

    auth.onAuthStateChanged(logado => {

        if (logado) {
            
            LOJA = localStorage.getItem('loja');
                $('#inpLoja').val(LOJA);

            if (LOJA == undefined || LOJA == "null") {
                preLoad();
            } else {
                db.collection(LOJA).get().then(snap=>{
                    snap.forEach(e=>{
                        $('#selectProdut').append('<option>' + e.id + '</option>');
                    });

                    PRODUTO = localStorage.getItem('produto');
                    if (PRODUTO == undefined || PRODUTO == "null") {
                        preLoad();
                    } else {
                        $('#selectProdut').val(PRODUTO);
                        getId("lblItemSelecionado").innerHTML += (" " + PRODUTO);
                        return listas(LOJA, PRODUTO);
                    };

                }).catch(error=>{
                    alert('O nome da loja não foi encontrado. error: ', error);
                    setTimeout(()=>{
                        localStorage.clear();
                        window.location.reload();
                    }, 1000);
                });
            }
        } else {
            window.location.replace('auth.html');
        }
    });
});