describe('Тестируем работу приложения', () => {

    it('Проверка на оформление заказа и перетаскивание ингредиентов', () => {
        cy.visit('localhost:3000');
        cy.get('div[data-testid="dragIngredient"]').contains('Краторная булка N-200i').trigger('dragstart');
        cy.get('section[data-testid="dropIngredient"]').trigger('drop');
        cy.get('button[data-testid="buttonOrder"]').click();
        cy.get('.input').find('[type="email"]').type(`viper_owega23@mail.ru`);
        cy.get('.input').find('[type="password"]').type('54321');
        cy.get('form').submit();
        cy.get('div[data-testid="dragIngredient"]').contains('Краторная булка N-200i').trigger('dragstart');
        cy.get('section[data-testid="dropIngredient"]').trigger('drop');
        cy.get('button[data-testid="buttonOrder"]').click();
    })

    it('Открываем модальные окна ингредиентов', () => {
        cy.visit('localhost:3000');
        cy.get('div').contains('Краторная булка N-200i').click();
        cy.get('[data-testid="buttonClose"]').click()
        cy.get('div').contains('Говяжий метеорит (отбивная)').click();
        cy.get('[data-testid="buttonClose"]').click()
    })
})