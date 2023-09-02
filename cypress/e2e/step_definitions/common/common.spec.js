import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps'

import {Common_Acessibilidade} from '../../../pages/common/acessibilidade'

Then(`deverá passar no teste de acessibilidade`, () => {
    Common_Acessibilidade.validar_acessibilidade()
})