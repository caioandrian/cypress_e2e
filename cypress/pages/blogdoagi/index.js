import Base from '../base_page'

const el = require('./elements').ELEMENTS;

export class Home extends Base{

static acessar_pagina_inicial() {
    //super.implicitWait("GET", '**', 'LoadAll', 200, 304)
    super.visit(Cypress.env("agi_frontend"))
    }
}