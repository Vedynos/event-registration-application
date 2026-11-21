# event-registration-application
Projeto Desenvolvimento Web

Aplicação web de registo de participantes num evento com integração de pagamentos (ambiente *sandbox*) e área de gestão para o organizador.

> **Nota:** O tema atual da página (**Conferência SuperIA 2027 – Universidade Autónoma de Lisboa**) é provisório e ainda pode ser revisto e alterado pelo grupo.


## O que já foi feito
* **Estrutura base do Frontend** com separação de responsabilidades (`index.html`, `style.css` e `app.js`).
* **Página principal do evento** com cabeçalho institucional, descrição, informações-chave (data, local, preço, limite de participantes e data limite de inscrição) e secção de oradores.
* **Modal de inscrição (`<dialog>`)** integrado na página inicial, que recolhe o nome e o email do participante enquanto bloqueia o acesso ao fundo.
* **Validação no cliente (JavaScript)** para campos obrigatórios e formato de email, com mensagens de erro dinâmicas.
* **Preparação do pedido HTTP (`fetch`)** para envio dos dados de registo ao futuro *endpoint* `/api/register`.

## Próximos passos
* Implementação do servidor (*backend*) e ligação à base de dados.
* Integração do pagamento em ambiente de teste (*sandbox*).
* Criação do login e painel de gestão do organizador.

## Estrutura do Projeto
```text
.
├── public/                 # Frontend (ficheiros estáticos)
│   ├── index.html          # Página principal do evento e modal de inscrição
│   ├── css/
│   │   └── style.css       # Estilos da página e do modal
│   └── js/
│       └── app.js          # Controlo do modal, validação e pedidos HTTP
├── server/                 # Backend (servidor, BD, auth e pagamentos)
│   └── .gitkeep
├── docs/                   # Relatório final em PDF e diagramas de arquitetura
│   └── .gitkeep
├── .env.example            # Modelo de variáveis de ambiente (sem credenciais reais)
├── .gitignore              # Ficheiros e pastas ignorados pelo Git
└── README.md               # Documentação principal

Nota: Os ficheiros .gitkeep são apenas para que a estrutura de pastas seja mantida ao fazer o git push.


Configuração Inicial (Ambiente Local)

1. Clonar o repositório.

2. Para visualizar o frontend atual, abrir public/index.html com a extensão Live Preview (ou Live Server) no VS Code.

3. (Quando o backend for implementado) Copiar o ficheiro .env.example para .env na raiz do projeto e preencher com as respetivas variáveis locais e chaves de teste (sandbox).