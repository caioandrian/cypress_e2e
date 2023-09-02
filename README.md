# Automação QA

Esta documentação tem como objetivo auxiliar na compreensão da arquitetura do framework de automação.

**Seções:**

 [Automação QA](#automação-qa)
  - [Instalação e Execução do Projeto](#instalação-e-execução-do-projeto)
    - [Instalação NodeJs](#instalação-nodejs)
    - [Instalação Visual Studio Code](#instalação-visual-studio-code)
    - [Extensões](#extensões)
  - [Entendendo o Padrão Page Object](#entendendo-o-padrao-page-object)

## Instalação e Execução do Projeto

Para realizar nossa automação, usamos o Cypress que é um framework de automação de testes E2E que usa como base o Javascript para a escrita do seu código. Com ele é possível configurar, escrever, rodar e debuggar os testes de forma simples e prática.

Para utilizar o Cypress, é necessário realizar as seguintes instalações:

- NodeJs (versão LTS)
- Visual Studio Code
- Cypress

### Instalação NodeJs

**1**. Acessar página <https://nodejs.org/en/> e recomenda-se baixar a versão mais estável;
**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, nos botões de _Install_ e _Finish_.
**Pronto, o NodeJs foi instalado!**

### Instalação Visual Studio Code

**1**. Acessar https://code.visualstudio.com/download e baixar a versão para Windows;

**2**. Após download, abrir o instalador e clicar nos botões de _Next_ até o final e, por último, no botão de _Finish_.
O Visual Studio Code abrirá automaticamente e pronto.
**Instalação concluída!**

**Pronto!** 

#### Extensões

Abaixo seguem alguns plugins que nos auxiliam na nossa automação. São eles:

- JavaScript (ES6) code snippets
- Commit Message Editor - **Formatador de commits**
- Markdown Preview Enhanced - **Visualizador de arquivos .md**
- Prettier - Code formatter - **Formatador de código**
- Material Icon Theme
- Cucumber (Gherkin) Full Support
- Cypress-cucumber-generator
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Bracket Pair Colorizer 2
- Add Only
- Cypress Snippets
- ES6 Mocha Snippets

## Entendendo o Padrão Page Object 

O padrão Page Objects é muito utilizado nos projetos de automação de testes como uma forma de organizar melhor nosso código.

Ele serve para separar responsabilidades, ou seja:

- Vamos ter um local onde ficará descrita a **ação** da página que estamos trabalhando.

- E um outro local para os **elementos** dessa página.