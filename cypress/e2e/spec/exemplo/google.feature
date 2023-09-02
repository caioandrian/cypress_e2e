#language: pt

Funcionalidade: Exemplo do Google
    Como cliente do google
    Quero acessar o site do google 
    Para realizar uma pesquisa

    Cenário: [regressão] - Validar o titulo da página do google
        Quando quando acessar o site do google
        Então o título da página deverá estar como Google
    
    Cenário: Validar botão de teste na página do google
        Quando quando acessar o site do google
        Então deverá aparecer o botão "Meu Botão de Teste" na página do google

    Cenário: Validar acessibilidade na página do google
        Quando quando acessar o site do google
        Então deverá passar no teste de acessibilidade