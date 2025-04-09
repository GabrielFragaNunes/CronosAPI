// pages/FilmesPage.js
class FilmesPage {
    get title() { return $('//android.widget.TextView[@text="Lista de Filmes"]'); }
    get backButton() { return $('~Voltar'); }
    get movieCards() { return $$('//android.view.ViewGroup[contains(@resource-id, "card")]'); }
    
    async getFirstMovieTitle() {
        const cards = await this.movieCards;
        if (cards.length > 0) {
            return cards[0].$('//android.widget.TextView[1]').getText();
        }
        return null;
    }
}
module.exports = new FilmesPage();