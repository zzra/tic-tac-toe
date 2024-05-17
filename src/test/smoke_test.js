Feature('Basic Functionality');

Before(({I}) => {
    I.amOnPage('/');
})

Scenario('Test basic page elements', ({I}) => {
    I.see('Next player', {css: "[data-testid~='txt_status']"});
    I.see('Reverse Ordering', {css: "[data-testid~='button_reverse']"});
    I.see('Go to game start', {css: "[data-testid~='txt_move_0']"});
});

Scenario('Can click square as first player', ({I}) => {
    I.click({css: "[data-testid~='button_tile_0']"});
    I.see("X", {css: "[data-testid~='button_tile_0']"});
});

Scenario('Can click square as players', ({I}) => {
    I.click({css: "[data-testid~='button_tile_0']"});
    I.see("X", {css: "[data-testid~='button_tile_0']"});
    I.click({css: "[data-testid~='button_tile_1']"});
    I.see("O", {css: "[data-testid~='button_tile_1']"});
});