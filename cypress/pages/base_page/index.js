export default class Base {

    static visit(path = "") {
        cy.visit(path);
    }

    static reloadPage() {
        cy.reload()
    }

    static explicitWait(seconds = 2000){
        cy.wait(seconds)
    }

    static implicitWait(method = "GET", endpoint = "", alias='loadPageFirst', status_esperado = 200, status_alternativo=304){
        cy.intercept({
            method: method,
            url: endpoint,
        }).as(alias);

        const waitPolling = (res) => {
            const {response: {body: {status }}} = res;
            if (status !== 'Completed') {
                cy.wait(`@${alias}`).then(waitPolling);
            }else
                cy.wait(`@${alias}`, { timeout: Cypress.env('global_timeout') }).its('response.statusCode').should('oneOf', [status_esperado, status_alternativo])
        }
    }

    static getElement(elementID, index = 0, scroll = true){
        if(elementID.includes("//")){
            if(scroll)
                return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
            else 
                return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index)
        }else{
            if(scroll)
                return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
            else
                return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index)
        }
    }

    static getLastElement(elementID, scroll = true){
        if(elementID.includes("//")){
            if(scroll)
                return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') }).scrollIntoView()
            else
                return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') })
        }else{
            if(scroll)
                return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last().scrollIntoView()
            else
                return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last()
        }
    }

    static requestApiWithBody(ambiente, body = [], method = 'POST') {
        return cy.request({
            method: method,
            url:ambiente,
            failOnStatusCode: false,
            body: body
        })
    }

    static selectOption(element, option, index = undefined, scrollIntoView = false) {
        return this.getElement(element, index, scrollIntoView).select(option);
    }

    static selectRandomOption(element, index = undefined, scrollIntoView = false) {
        this.getElement(element, index, scrollIntoView)
            .find("option")
            .its("length")
            .then((optionsLength) => {
                const random_option = Math.floor(Math.random() * optionsLength);
                
                //se a primeira opcao for selecione...
                if(random_option == 0)
                    random_option += 1

                this.getElement(element).select(random_option);
            });
    }

    static checkRadioOption(element, value, scrollIntoView = false) {
        return this.getElement(element, scrollIntoView).check(value)
    }

    //definir o texto através do .then()
    static getElementText(element, index = undefined, scroll = undefined) {
        return this.getElement(element, index, scroll).should('be.visible').invoke('text')
    }

    static getElementTextFilterVisible(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll, { timeout: Cypress.env('global_timeout') }).filter(':visible')
        .scrollIntoView().invoke('text')
    }

    static getElementFilterVisible(elementID, index = undefined, scroll = undefined){
        return cy.get(elementID, index, scroll, { timeout: Cypress.env('global_timeout') }).filter(':visible').scrollIntoView()
    }

    /*static getElementTextFilterVisible(elementID, index = 0){
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index).scrollIntoView()
    }*/

    static getElementByContainsText(text, index = 0, caseSensitive = false){
        return cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: caseSensitive }).eq(index).scrollIntoView()
    }

    static getElementFilterByFind(elementID, finder, index = undefined, scroll=undefined){
        return this.getElement(elementID, index, scroll).find(finder, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
    }

    static getElementTextByFind(elementID, finder, index = undefined, scroll=undefined){
        return this.getElement(elementID, index, scroll).find(finder).should('be.visible').invoke('text')
    }

    static getElementFilterByContainsText(elementID, text, index = undefined, scroll=undefined){
        return this.getElement(elementID, index, scroll).contains(text).scrollIntoView()
    }

    static getElementLength(elementID, index = undefined, scroll=false){
        return this.getElement(elementID, index, scroll).its('length')
    }

    static getElementLengthByFinder(elementID, finder, index = undefined, scroll=false){
        return this.getElement(elementID, index, scroll).find(finder).its('length')
    }

    static getElementAttribute(elementID, attr = 'href', index = undefined, scroll=undefined) {
        return this.getElement(elementID, index, scroll).invoke('attr', attr)
    }

    static getIframe(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    static getIframeLoaded(elementID){
        cy.frameLoaded(elementID)
    }

    static typeElementInsideIframe(elementID, elementInside, value){
        this.getIframe(elementID)
            .find(elementInside)
            .eq(0)
            .type(value, { force: true})
    }

    static clickElementByText(text, index = undefined, caseSensitive = false){
        this.getElementByContainsText(text, index, caseSensitive).click({force: true})
    }

    static clickElementByAlternativeText(text, text2 = undefined, index = undefined, scroll = false){
        this.getElement('body', index, scroll)
            .then(($body)=>{
                if ($body.text().includes(text))
                    this.getElementByContainsText(text).click({force: true})
                else{
                    if(text2 != undefined)
                        this.getElementByContainsText(text2).click({force: true})
                }
            })
    }

    static clickElementInsideIframe(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).get(elementInside).click({force: true})
    }

    static clickElementInsideIframeByXpath(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).xpath(elementInside).click({force: true})
    }

    static validadeElementIsVibileInsideIframe(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).get(elementInside).should('be.visible')
    }

    static validadeElementTextInsideIframe(elementID, elementInside, text){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).get(elementInside).should('have.text', text)
    }

    static validadeElementIsVibileInsideIframeByXpath(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).xpath(elementInside).should('be.visible')
    }

    static scrollIntoView(elementID, index = undefined){
        this.getElement(elementID, index).scrollIntoView()
    }

    static scrollToBottomOfElement(elementID, index = undefined){
        this.getElement(elementID, index).scrollTo('bottom')
    }

    static scrollToTopOfElement(elementID, index = undefined){
        this.getElement(elementID, index).scrollTo('top')
    }

    static setElementValue(elementID, value, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).type(value, {force: true});
    }

    static clickElement(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).click({force: true});
    }

    static clickElementByFind(elementID, finder=undefined, index = undefined, scroll = undefined){
        this.getElementFilterByFind(elementID, finder, index, scroll).click({force: true});
    }

    //duvida
    static clickElementFilterByVisible(elementID, index = undefined){
        this.getElementFilterVisible(elementID, index).click({force: true});
    }

    static clickElementCheckBox(element, option, index=undefined, scroll = true){
        this.getElement(element, index, scroll).check(option, { force: true }).should('be.checked')
    }

    static clickElementByExistText(validate_text, element1, element2){
        this.getElement('body', false).then(($body)=>{
            if ($body.text().includes(validate_text))
                this.clickElement(element1)
            else
                this.clickElement(element2)
        })
    }

    static doubleclickElement(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).dblclick({force: true});
    }

    static doubleClickElementByText(txt,  index = undefined, scroll = undefined){
        this.getElementByContainsText(txt, index, scroll).dblclick({force: true});
    }

    static doubleClickElementByFind(elementID, finder=undefined, index = undefined, scroll = undefined){
        this.getElementFilterByFind(elementID, finder, index, scroll).dblclick({force: true});
    }

    static hoverElement(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).trigger("mouseover")
    }

    static elementForceShow(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).invoke("show")
    }

    static elementForceRemove(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).invoke("remove")
    }

    static elementChangeAttribute(elementLink, attr, value){
        this.getElement(elementLink)
            .invoke('attr', attr, value)
            .should('have.attr', attr, value)
    }

    static sendKey(text, opt_delay=10){
        this.getElement('body').type('{' + text + '}', { force: true, delay: opt_delay});
    }

    static sendKeyToElement(elementID, text, index = undefined, scroll = undefined, opt_delay=10){
        this.getElement(elementID, index, scroll).type('{' + text + '}', { force: true, delay: opt_delay});
    }

    static typeElement(elementID, text, index = undefined, scroll = undefined, opt_delay=10){
        this.getElement(elementID, index, scroll).type(text, { force: true, delay: opt_delay});
    }

    static typeElementByFind(elementID, finder = undefined, index = undefined, scroll = undefined){
        this.getElementFilterByFind(elementID, finder, index, scroll).type(text, { force: true });
    }

    static clearElementInput(elementID, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).clear()
    }

    static validateUrlPartialEndpoint(endpoint){
        cy.url({ timeout: Cypress.env('global_timeout')})
            .should('include', endpoint)
            .then(() => {
                this.explicitWait(5000)
                this.waitUntilErrorNextStop()
            })
    }

    static validateImgIsVisible(elementID){
        this.getElement(elementID)
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
                expect($img[0].naturalHeight).to.be.greaterThan(0)
            })
    }

    static validateElementIsVisible(elementID, index = undefined, scroll = undefined){
        
        this.getElement(elementID, index, scroll).should('be.visible')
    }

    static validateLastElementIsVisible(elementID, scroll = undefined){
        this.getLastElement(elementID, scroll).should('be.visible')
    }

    static validateElementExist(elementID, index = undefined, scroll = false){
        this.getElement(elementID, index, scroll).should('exist')
    }

    static validateElementNotExist(elementID, index = undefined, scroll = false){
        this.getElement(elementID, index, scroll).should('not.exist')
    }

    static validateElementIsNotVisible(elementID, index = undefined, scroll = false){
        this.getElement(elementID, index, scroll).should('be.not.visible')
    }

    static validateLastElementIsVisible(elementID, scroll = undefined){
        this.getLastElement(elementID, scroll).should('be.visible')
    }

    static validateElementIsVisible(elementID, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).should('be.visible')
    }

    static validateElementIsVisibleByText(texto){
        this.getElementByContainsText(texto).should('be.visible')
    }

    static validateElementIsNotEmpty(elementID, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).should('to.be.not.empty')
    }

    static validateElementIsEmpty(elementID, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).should('to.be.empty')
    }

    static validateElementHaveText(elementID, text, index = undefined, scroll = undefined){
        
        this.getElement(elementID, index, scroll).should('have.text', text)
        //this.getElement(elementID, index, scroll).should('contain.text', text)
    }

    static validateElementHaveTextFilterVisible(elementID, text, index = undefined, scroll = undefined){
        cy.getElementFilterVisible(elementID, index, scroll).filter(":visible").should('have.text', text)
    }

    static validateTextIsVisible(text){
        this.getElementByContainsText(text).should('be.visible')
    }

    static validateElementContainInnerText(elementID, text, index = 0, scroll = undefined){
        let exp_text = text
        this.getElement(elementID, index, scroll)
            .should(($div) => {
                let text = $div.text().toLowerCase();
                expect(text).to.contains(exp_text.toLowerCase());
            });
    }

    static validateCheckBoxIsChecked(element, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should('be.checked')
    }

    static validateCheckBoxIsNotChecked(element, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should('be.not.checked')
    }

    static validateElementLengthWithoutScroll(elementID, value, option = "", index = 0, scroll = undefined){
        switch(option){
            case ">=": this.getElement(elementID, index, scroll).should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, index, scroll).should('have.length.lte', value); break;
            default: this.getElement(elementID, index, scroll).should('have.length', value); break;
        }
    }

    static validateElementLengthByChildrenWithoutScroll(elementID, value, option = "", index = 0, scroll = undefined){
        switch(option){
            case ">=": this.getElement(elementID, index, scroll).children().should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, index, scroll).children().should('have.length.lte', value); break;
            default: this.getElement(elementID, index, scroll).children().should('have.length', value); break;
        }
    }

    static validateElementLengthByChildren(elementID, value, option = "", index = 0, scroll = undefined){
        switch(option){
            case ">=": this.getElement(elementID, index, scroll).children().should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, index, scroll).children().should('have.length.lte', value); break;
            default: this.getElement(elementID, index, scroll).children().should('have.length', value); break;
        }
    }

    static validateElementLengthByChildrenByXpath(elementID, value, option = "", index = 0, scroll = undefined){
        switch(option){
            case ">=": this.getElement(elementID, index, scroll).children().should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, index, scroll).children().should('have.length.lte', value); break;
            default: this.getElement(elementID, index, scroll).children().should('have.length', value); break;
        }
    }
 
    static validateElementLength(elementID, value, option = "", index = 0, scroll = undefined){
        switch(option){
            case ">=": this.getElement(elementID, index, scroll).should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, index, scroll).should('have.length.lte', value); break;
            default: this.getElement(elementID, index, scroll).should('have.length', value); break;
        }
    }

    static validateElementVal(elementID, texto, index = undefined, scroll = false){
        this.getElement(elementID, index, scroll).invoke('val').then(($el) => {
            expect($el, { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementHaveTextByInvokeText(elementID, texto, index = undefined, scroll = undefined){
        this.getElement(elementID, index, scroll).invoke('text').then(($el) => {
            expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementLink(elementLinkID, index = undefined, scroll = undefined){
        this.getElement(elementLinkID, index, scroll).should('have.attr', 'href')
    }

    static validateElementLinkByText(text, index = undefined, caseSensitive = false){
        this.getElementByContainsText(text, index, caseSensitive).should('have.attr', 'href')
    }

    static validateLinkAttrHREF(elementLinkID, path, index = undefined, scroll = undefined){
        this.getElement(elementLinkID, index, scroll).should('have.attr', 'href').and('include', path)
    }

    static validateLinkAttrHREFbyTextLink(text, path, index = undefined, caseSensitive = false){
        this.getElementByContainsText(text, index, caseSensitive).should('have.attr', 'href').and('include', path)
    }

    static validatePageContainsText(text){
        cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false}).scrollIntoView().should('be.visible')
    }

    static validatePageNotContainsText(text){
        //elemento existe no DOM mas que não deve estar visível
        cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false}).should('not.be.visible')
    }

    static validateTextExistOnPage(text){
        cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false}).should('exist')
    }

    static validatePageHaveTitle(text){
        cy.title().should('eq', text)
    }

    static validateTextNotExistOnPage(text){
        //elemento não deve existir no DOM
        cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false}).should('not.exist')
    }

    static validateRequestStatusCode(response_request, expectCode, prop1 = undefined, prop2 = undefined, prop3 = undefined){
        if(prop1)
            expect(response_request.body).to.have.property(prop1).and.to.be.not.empty
        if(prop2)
            expect(response_request.body).to.have.property(prop2).and.to.be.not.empty
        if(prop3)
            expect(response_request.body).to.have.property(prop3).and.to.be.not.empty

        expect(response_request.status).to.be.eq(expectCode)
    }

    static validatePlaceholder(element, placeholder, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should("have.attr", "placeholder", placeholder)
    }

    static getElementByInvokeText(elementID, index = undefined, scroll = undefined){
        return this.getElement(elementID, index, scroll).invoke("text")
    }

    static validateElementHaveText(element, text, index = undefined, scroll = undefined) {
        this.getElement(element, index, scroll).should("have.text", text)
    }

    static validateLastElementHaveText(element, text, scroll = true) {
        this.getLastElement(element, scroll).should("have.text", text)
    }

    static validateElementContainsText(element, text, index = undefined, scroll = undefined) {
        this.getElement(element, index, scroll).should("contains", text)
    }

    static validateElementHaveValue(element, value, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should("have.value", value)
    }

    static validateValueBoolean(element, boolean, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should("have.attr", "aria-current", boolean)
    }

    static validateElementIsDisabled(selector, index = undefined, scroll = undefined){
        this.getElement(selector, index, scroll).should('be.disabled')
    }

    static validateElementIsEnabled(element, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).should("be.enabled")
    }

    static typeAndBlurElement(element, text, index = undefined, scroll = undefined){
        this.getElement(element, index, scroll).type(text).blur()
    }

    static clearElementAndType(element, text, index = undefined, scroll = undefined){
        this.clearElementInput(element, index, scroll)
        this.typeElement(element, text, index, scroll)
    }
    
    static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method,
            url: endpoint,
            body: body,
            headers: headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method,
            url: endpoint,
            headers : headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static validateURLStatus(method = 'GET', ambiente, status = 200) {
        cy.request({
            method: method,
            url:ambiente,
            failOnStatusCode: false
        }).then((res) => {
            expect(res).to.have.deep.property('status', status)
        })
    }

    static extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    }

    static a11log(violations) {
        cy.task('log',
          `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${violations.length === 1 ? 'was' : 'were'} detected`
        )

        const violationData = violations.map(
          ({ id, impact, description, nodes }) => ({id, impact, description, nodes: nodes.length})
        )
      
        cy.task('table', violationData)
    }

    static validateAccessibility(accessibility_element = null, webContentAccesibility = ["cat.color"]){
        this.explicitWait(5000)
        //[wcag2a, wcag2aa, cat.color]
        //https://github.com/dequelabs/axe-core/blob/master/doc/check-options.md
        //https://www.deque.com/axe/core-documentation/api-documentation/
        cy.injectAxe()
        cy.checkA11y(accessibility_element, {
            'runOnly': {type: 'tag', values: webContentAccesibility}, 
            'includedImpacts': ['critical', 'serious'],
            //'critical', 'serious', 'moderate', 'minor'
        },
        this.a11log)
    }
    
    static waitUntilErrorNextStop(qtde_tentativas = 2, pass = false){
        cy.log('...Remaining attempts: ' + qtde_tentativas);

        this.getElement('body')
            .then(($body)=>{
                if ($body.text().includes('client-side exception')){
                    this.getElementText("h2")
                        .then((txt) => {
                            console.log(txt)
                            if (qtde_tentativas == 0 && pass == false)
                                throw 'Erro do next'

                            if (txt.trim().includes('client-side exception') && pass == false){
                                console.log("entrou")
                                this.reloadPage()
                                this.explicitWait(5000)
                                this.waitUntilErrorNextStop(qtde_tentativas - 1, false)
                            }else{
                                pass = true
                                return "ok"
                            }
                    })
                }else{
                    pass = true
                    return "ok"
                }
            })
    }
}