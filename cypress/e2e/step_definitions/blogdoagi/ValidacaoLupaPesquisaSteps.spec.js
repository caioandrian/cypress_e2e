/* global Given, Then, When */
import {Given, When, Then, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {Home} from '../../../pages/blogdoagi/index'

Given(`que tenha acessado o site website da Agibank`, () =>{
    Home.acessar_pagina_inicial();
})

/*When("efetuar uma pesquisa com os temas relacionados a {string}", () => {
    Home.clicarBotaoPaginaLogin();
})

Then("deve-se retornar cards e resultados de acordo com o tema pesquisado.", () => {
    Home.visualizarBotaoRecuperarSenha();
})*/