import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Getnet_Exemplo} from '../../../pages/exemplo/getnet'

Given(`quando acessar o site da getnet`, () => {
    Getnet_Exemplo.acessar_getnet()
    Getnet_Exemplo.clica_opcao_menu_e_submenu()
    Getnet_Exemplo.valida_redirecionamento()
})