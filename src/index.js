
const { json } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

//Para usar JSON
app.use(express.json());

//BD Fake
const clientes = [];

//Middleware (3 parametos: Requisicao, Resposta e Proximo?)
function verificaExisteCPF(req, res, next){
  const { cpf } = req.headers;

  const cliente = clientes.find((value) => value.cpf === cpf);

  if(!cliente){
    return res.status(400).json({error: "Cliente não encontrado"});
  }

  req.cliente = cliente;

  return next();
}

function getBalanco(statement){
  //Soma tudo em um valor apenas
  const balanco = statement.reduce((acumulador, operacao) => {
    if(operacao.tipo === "credito"){
      return acumulador + operacao.valor;
    } else {
      return acumulador - operacao.valor;
    }
  }, 0);

  return balanco;
};

app.post("/conta", (req,res) => {
  const { cpf, nome } = req.body;

  //Busca no Array se existe já o cliente cadastrado
  const clienteExistente = clientes.some((value) => value.cpf === cpf);

  //Verifica se existe o CPF
  if(clienteExistente){
    return res.status(400).json({error: "Cliente já cadastrado!"});
  }

  clientes.push({
    cpf,
    nome,
    id: uuidv4(),
    statement: [],
  });
  
  return res.status(201).send();

});

//Se todas minhas rotas a seguir irá conter esse Middleware utilizar desta forma
// app.use(verificaExisteCPF);

//Lista Extrato da conta
app.get("/statement/",verificaExisteCPF, (req,res) => {
  const { cliente } = req;
  return res.json(cliente.statement);
});

//Efetua Deposito na conta
app.post("/deposito",verificaExisteCPF, (req, res) => {
  const { descricao, valor } = req.body;
  
  const { cliente } = req;

  const statementOperacao = {
    descricao,
    valor,
    dataCriacao: new Date(),
    tipo: "credito"
  };

  cliente.statement.push(statementOperacao);

  return res.status(201).send();
});

//Efetua Saque na conta
app.post("/saque",verificaExisteCPF, (req,res) => {
  const { valor } = req.body;
  const { cliente } = req;

  //Busca o saldo no BD
  const balanco = getBalanco(cliente.statement);

  //Verifica se existe saldo 
  if(balanco < valor){
    return res.status(400).json({error: "Saldo insuficiente!"});
  }
  
  //Instancia as informações no Objeto
  const statementOperacao = {
    valor,
    dataCriacao: new Date(),
    type: "debito",
  };

  //Salva as informacao no BD
  cliente.statement.push(statementOperacao);
  return res.status(201).send();


});

//Busca extrato por data
app.get("/statement/data",verificaExisteCPF, (req,res) => {
  const { cliente } = req;
  //captura do query params a informação da data
  const { data } = req.query;

  //Formatando para remover a hora para comparação
  const dateFormat = new Date(data + " 00:00");

  //Filtrando no BD do statement a dataCriacao e comparando com dateFormat
  const statement = cliente.statement.filter(
    (statement) => statement.dataCriacao.toDateString() === new Date(dateFormat).toDateString()
  );

  //Retornando o resultado
  return res.json(statement);
});

//Atualiza o nome da conta
app.put("/conta",verificaExisteCPF, (req,res) => {
  const { nome } = req.body;
  const { cliente } = req;

  cliente.nome = nome;

  return res.status(201).send();
});

//Lista Contas
app.get("/conta",verificaExisteCPF, (req,res) => {
  const { cliente } = req;
  return res.json(cliente);
});

//Deleta Conta
app.delete("/conta",verificaExisteCPF, (req,res) => {
  const { cliente } = req;

  clientes.splice(cliente,1);

  return res.status(200).json(clientes);

});

//Retorna o Saldo Atual
app.get("/balanco",verificaExisteCPF, (req,res) => {
  const { cliente } = req;

  const balanco = getBalanco(cliente.statement);

  return res.json({
    "Saldo atual" : balanco,
  });
});

app.listen(3333);