import Base from '../../base_page'

const el = require('./elements').ELEMENTS;

export class Getnet_Exemplo extends Base{
    static acessar_getnet(){
        cy.visit("https://site.getnet.com.br")
    }

    static clica_opcao_menu_e_submenu(){
         //Força a visibilidade do submenu alterando o CSS diretamente
         cy.get('.gnt-nav-menu-depth2')
         .invoke('attr', 'style', 'opacity: 1 !important; visibility: visible !important');

         super.explicitWait();
 
         // Passa o mouse sobre o elemento com data-toggle="gnt-nav-menu-depth2"
         super.hoverElement('li:contains("Ajuda")')
 
         super.explicitWait();
 
         // Verifica se o submenu está visível e clica nele
         super.clickElement('#menu-ajuda-sou-cliente-central-ajuda')
    }

    static valida_redirecionamento(){
        // Verifica se a navegação para a Central de ajuda foi bem-sucedida
        cy.url().should('include', '/duvidas');
    }
}