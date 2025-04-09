describe('Teste de filmes', () => {
    it('deve carregar a lista de filmes', async () => {
        const filmes = await $$('android.widget.TextView');
        expect(filmes.length).toBeGreaterThan(0);
    });
});
