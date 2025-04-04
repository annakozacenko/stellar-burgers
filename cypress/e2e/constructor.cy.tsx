import cypress from 'cypress';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-top]').should('exist');
      cy.get('[data-cy=constructor-bun-bottom]').should('exist');
    });

    it('Добавление начинки', () => {
      cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
      cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .children()
        .should('have.length', 2);
      cy.get('[data-cy=constructor-ingredients]').should('exist');
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.get('[data-cy=ingredients-bun]').children().first().click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=modal]').should('contain', 'Детали ингредиента');
      cy.get('[data-cy=modal]').should('contain', 'булка');
    });

    it('Закрытие модального окна по крестику', () => {
      cy.get('[data-cy=ingredients-bun]').children().first().click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=modal-close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Закрытие модального окна по оверлею', () => {
      cy.get('[data-cy=ingredients-bun]').children().first().click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Оформление заказа и очистка конструктора', () => {
      cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
      cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
      cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();

      cy.get('[data-cy=create-order-button]').click();
      cy.wait('@createOrder');
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=order-number]').should('contain', '70666');

      cy.get('[data-cy=modal-close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=constructor-ingredient]').should('not.exist');
    });
  });
});
