context('Slider', () => {
  const elements = {
    slider: 'slider',
    sliderPrevButton: 'slider .slider-prev',
    sliderNextButton: 'slider .slider-next',
    sliderImages: 'slider image-component img'
  };

  beforeEach(() => cy.visit('/'));

  describe('Autoplay', () => {
    it('should pause and resume scrolling if mouse hovers', () => {
      cy.get(elements.sliderImages)
        .first()
        .should('be.visible');
      cy.get(elements.sliderImages)
        .eq(1)
        .should('be.visible');
      cy.get(elements.slider).trigger('mouseenter');
      cy.wait(3000);
      cy.get(elements.sliderImages)
        .eq(1)
        .should('be.visible');
      cy.get(elements.sliderImages)
        .eq(2)
        .should('not.be.visible');
      cy.get(elements.slider).trigger('mouseleave');
      cy.get(elements.sliderImages)
        .eq(2)
        .should('be.visible');
    });

    it('should pause and resume scrolling if mouse hovers and clicks', () => {
      cy.get(elements.sliderImages)
        .first()
        .should('be.visible');
      cy.get(elements.sliderImages)
        .eq(1)
        .should('be.visible');
      cy.get(elements.slider).trigger('mouseenter');
      cy.wait(3000);
      cy.get(elements.sliderImages)
        .eq(1)
        .should('be.visible');
      cy.get(elements.sliderImages)
        .eq(2)
        .should('not.be.visible');
      cy.get(elements.sliderNextButton).click();
      cy.get(elements.sliderImages)
        .eq(2)
        .should('be.visible');
      cy.wait(3000);
      cy.get(elements.sliderImages)
        .eq(2)
        .should('be.visible');
      cy.get(elements.sliderImages)
        .eq(3)
        .should('not.be.visible');
      cy.get(elements.slider).trigger('mouseleave');
      cy.get(elements.sliderImages)
        .eq(3)
        .should('be.visible');
    });
  });

  describe('Navigation', () => {
    beforeEach(() => cy.get(elements.slider).trigger('mouseenter'));

    describe('Next', () => {
      it('should scroll to next image on click', () => {
        cy.get(elements.sliderImages)
          .first()
          .should('be.visible');
        cy.get(elements.sliderImages)
          .eq(1)
          .should('be.visible');
        cy.get(elements.sliderImages)
          .eq(2)
          .should('not.be.visible');
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderImages)
          .eq(2)
          .should('be.visible');
      });

      it('should scroll to first image on last image click', () => {
        cy.get(elements.sliderImages)
          .eq(1)
          .should('be.visible');
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderImages)
          .eq(7)
          .should('be.visible');
        cy.get(elements.sliderImages)
          .first()
          .should('not.be.visible');
        cy.get(elements.sliderNextButton).click();
        cy.get(elements.sliderImages)
          .first()
          .should('be.visible');
      });
    });

    describe.only('Previous', () => {
      it('should scroll to previous image on click', () => {
        cy.get(elements.sliderImages)
          .first()
          .should('be.visible');
        cy.get(elements.sliderNextButton).click();
        cy.wait(1000);

        cy.get(elements.sliderImages)
          .eq(1)
          .should('be.visible');
        cy.get(elements.sliderImages)
          .first()
          .should('not.be.visible');
        // cy.get(elements.sliderImages)
        //   .eq(1)
        //   .should('not.be.visible');
        // cy.get(elements.sliderPrevButton).click({ force: true });
        // cy.get(elements.sliderImages)
        //   .eq(1)
        //   .should('be.visible');
      });

      // it('should scroll to first image on last image click', () => {
      //   cy.get(elements.sliderImages)
      //     .eq(1)
      //     .should('be.visible');
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderImages)
      //     .eq(7)
      //     .should('be.visible');
      //   cy.get(elements.sliderImages)
      //     .first()
      //     .should('not.be.visible');
      //   cy.get(elements.sliderNextButton).click();
      //   cy.get(elements.sliderImages)
      //     .first()
      //     .should('be.visible');
      // });
    });
  });
});
