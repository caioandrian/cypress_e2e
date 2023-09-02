import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Google_Exemplo} from '../../../pages/exemplo/google'

Given(`quando acessar o site do google`, () => {
    Google_Exemplo.acessar_google()
})

Then(`deverá aparecer o botão {string} na página do google`, (texto) => {
    Google_Exemplo.validar_botao_teste_pesquisa_google(texto)
})

Then(`o título da página deverá estar como Google`, () => {
    Google_Exemplo.validar_titulo_google()
})