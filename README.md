# FinAPI - Financeira

## Descrição do Projeto
API criada a partir do curso Ignite da Trilha NodeJS da Rocketseat para utilização dos GET, POST, PUT e DELETE, e a utilização das middlewares durante a execução das requisições.
Utilizando processo para criação de Conta, busca dos dados da conta, atualização dos dados da conta, Efetuando depósitos e saques, Buscando Saldo atual da conta, Buscando extrato por data, Deletando a conta<br><br>

<a href="https://nodejs.org/en/">![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)</a>
![Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)



### Requisitos

- [x] Deve ser possível criar um conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente
