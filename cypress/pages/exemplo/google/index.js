import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Google_Exemplo extends Base{
    static acessar_google(){
        super.visit("www.google.com.br")
    }

    static validar_botao_teste_pesquisa_google(texto){
        super.validatePageContainsText(texto)
    }

    static validar_titulo_google(){
        super.validatePageHaveTitle(el.PAGINA.TITULO)
    }
}