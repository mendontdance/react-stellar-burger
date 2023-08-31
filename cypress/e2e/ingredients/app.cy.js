const testUrl = 'localhost:3000';
const testBun = 'Краторная булка N-200i';
const dragIngredient = 'div[data-testid="dragIngredient"]'
const dropIngredient = 'section[data-testid="dropIngredient"]'
const buttonOrder = 'button[data-testid="buttonOrder"]'
const closeModal = '[data-testid="buttonClose"]'

describe('Тестируем работу приложения', () => {

    it('Проверка на оформление заказа и перетаскивание ингредиентов', () => {
        cy.visit(testUrl);
        cy.get(dragIngredient).contains(testBun).trigger('dragstart');
        cy.get(dropIngredient).trigger('drop');
        cy.get(buttonOrder).click();
        cy.get('.input').find('[type="email"]').type(`viper_owega23@mail.ru`);
        cy.get('.input').find('[type="password"]').type('54321');
        cy.get('form').submit();
        cy.get(dragIngredient).contains(testBun).trigger('dragstart');
        cy.get(dropIngredient).trigger('drop');
        cy.get(buttonOrder).click();
    })

    it('Открываем модальные окна ингредиентов', () => {
        cy.visit(testUrl);
        cy.get('div').contains(testBun).click();
        cy.get(closeModal).click()
        cy.get('div').contains('Говяжий метеорит (отбивная)').click();
        cy.get(closeModal).click()
    })
})