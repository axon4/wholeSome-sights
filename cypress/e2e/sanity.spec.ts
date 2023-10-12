describe('sanity', () => {
	it('navigate to home page', () => {
		cy.visit('/');

		cy.contains('#header .text-3xl', 'WholeSome Sights');
	});
});