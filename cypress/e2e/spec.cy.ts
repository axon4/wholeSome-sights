describe('my first test', () => {
	it('visit the initial project page', () => {
		cy.visit('/');

		cy.contains('application is running!');
	});
});