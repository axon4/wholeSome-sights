describe('video', () => {
	it('play video', () => {
		cy.visit('/');

		cy.get('WS-list > .grid a:first').click();
		cy.get('.video-js').click();

		cy.wait(4900);

		cy.get('.video-js').click();
		cy.get('.vjs-play-progress').invoke('width').should('be.greaterThan', 0);
	});
});