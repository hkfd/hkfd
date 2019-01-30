context('Header', () => {
  const elements = {
    header: 'header',
    homeLink: 'header #nav-logo',
    pageLinks: 'header #nav-links a',
    navToggleButton: 'header #nav-button'
  };

  describe('Links', () => {
    describe('Home', () => {
      it('should route to home on click', () => {
        cy.visit('/about');
        cy.url().should('not.equal', 'http://localhost:4200/');
        cy.get(elements.homeLink).click();
        cy.url().should('equal', 'http://localhost:4200/');
      });
    });

    describe('Page', () => {
      it('should route to page on click', () => {
        cy.visit('/');
        cy.url().should('equal', 'http://localhost:4200/');
        cy.get(elements.pageLinks)
          .first()
          .click();
        cy.url().should('equal', 'http://localhost:4200/about');
      });

      it('should set pages as active on click', () => {
        cy.visit('/');
        cy.get(elements.header).should('be.visible');
        cy.get(elements.homeLink).should('not.have.class', 'active');
        cy.get(elements.pageLinks)
          .first()
          .click();
        cy.get(elements.pageLinks)
          .first()
          .should('have.class', 'active');
        cy.get(elements.pageLinks)
          .eq(1)
          .click();
        cy.get(elements.pageLinks)
          .first()
          .should('not.have.class', 'active');
        cy.get(elements.pageLinks)
          .eq(1)
          .should('have.class', 'active');
        cy.get(elements.homeLink).click();
        cy.get(elements.pageLinks)
          .eq(1)
          .should('not.have.class', 'active');
        cy.get(elements.homeLink).should('not.have.class', 'active');
      });
    });
  });

  describe('Nav', () => {
    beforeEach(() => cy.visit('/'));

    describe('Desktop', () => {
      it('should display nav but not display nav toggle', () => {
        cy.get(elements.homeLink).should('be.visible');
        cy.get(elements.pageLinks)
          .first()
          .should('be.visible');
        cy.get(elements.navToggleButton).should('not.be.visible');
      });
    });

    describe('Mobile', () => {
      beforeEach(() => cy.viewport('iphone-6'));

      it('should be able to open and close menu', () => {
        cy.get(elements.navToggleButton).should('be.visible');
        cy.get(elements.homeLink).should('be.visible');
        cy.get(elements.pageLinks)
          .first()
          .should('not.be.visible');
        cy.get(elements.navToggleButton).click();
        cy.get(elements.pageLinks)
          .first()
          .should('be.visible');
        cy.get(elements.homeLink).should('be.visible');
        cy.get(elements.navToggleButton).click();
        cy.get(elements.pageLinks)
          .first()
          .should('not.be.visible');
        cy.get(elements.homeLink).should('be.visible');
      });

      it('should close menu on home click', () => {
        cy.get(elements.navToggleButton).click();
        cy.get(elements.pageLinks)
          .first()
          .should('be.visible');
        cy.get(elements.homeLink).click();
        cy.get(elements.pageLinks)
          .first()
          .should('not.be.visible');
        cy.get(elements.homeLink).should('be.visible');
      });

      it('should close menu on page click', () => {
        cy.get(elements.navToggleButton).click();
        cy.get(elements.pageLinks)
          .first()
          .should('be.visible');
        cy.get(elements.pageLinks)
          .first()
          .click();
        cy.get(elements.pageLinks)
          .first()
          .should('not.be.visible');
        cy.get(elements.homeLink).should('be.visible');
      });
    });
  });
});
