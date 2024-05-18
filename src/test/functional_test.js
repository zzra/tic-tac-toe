Feature('Functional');

Before(({I}) => {
    I.amOnPage('/');
})

Scenario('Can click square as players', ({I}) => {
    I.click({css: "[data-testid='button_square_0']"});
    I.see("X", {css: "[data-testid='button_square_0']"});
    I.click({css: "[data-testid='button_square_1']"});
    I.see("O", {css: "[data-testid='button_square_1']"});
});

Scenario('Can win as first player', ({I}) => {
    I.click({css: "[data-testid='button_square_0']"});
    I.see("X", {css: "[data-testid='button_square_0']"});
    I.click({css: "[data-testid='button_square_3']"});
    I.see("O", {css: "[data-testid='button_square_3']"});
    I.click({css: "[data-testid='button_square_1']"});
    I.see("X", {css: "[data-testid='button_square_1']"});
    I.click({css: "[data-testid='button_square_4']"});
    I.see("O", {css: "[data-testid='button_square_4']"});
    I.click({css: "[data-testid='button_square_2']"});
    I.see("X", {css: "[data-testid='button_square_2']"});

    I.see('Winner: X', {css: "[data-testid='txt_status']"});
    locate(`//button[@data-testid="button_square_0"] 
        | //button/[@class="winner"] 
        | //button/[@text="X"]`
    );
});

Scenario('Can win as second player', ({I}) => {
    I.click({css: "[data-testid='button_square_3']"});
    I.see("X", {css: "[data-testid='button_square_3']"});
    I.click({css: "[data-testid='button_square_0']"});
    I.see("O", {css: "[data-testid='button_square_0']"});
    I.click({css: "[data-testid='button_square_1']"});
    I.see("X", {css: "[data-testid='button_square_1']"});
    I.click({css: "[data-testid='button_square_4']"});
    I.see("O", {css: "[data-testid='button_square_4']"});
    I.click({css: "[data-testid='button_square_5']"});
    I.see("X", {css: "[data-testid='button_square_5']"});
    I.click({css: "[data-testid='button_square_8']"});
    I.see("O", {css: "[data-testid='button_square_8']"});

    I.see('Winner: O', {css: "[data-testid='txt_status']"});
    locate(`//button[@data-testid="button_square_8"] 
        | //button/[@class="winner"] 
        | //button/[@text="O"]`
    );
});

Scenario('Can go go to previous move', ({I}) => {
    I.click({css: "[data-testid='button_square_3']"});
    I.see("X", {css: "[data-testid='button_square_3']"});
    I.click({css: "[data-testid='button_square_0']"});
    I.see("O", {css: "[data-testid='button_square_0']"});
    I.click({css: "[data-testid='button_square_1']"});
    I.see("X", {css: "[data-testid='button_square_1']"});
    I.click({css: "[data-testid='button_square_4']"});
    I.see("O", {css: "[data-testid='button_square_4']"});

    locate('Go to move #3 [0,1]', {css: "//button[data-testid='txt_move_3']"});
    I.click({css: "[data-testid='txt_move_3']"});
    locate('Go to move #3 [0,1]', {css: "//span[data-testid='txt_move_3']"});

    I.dontSee("O", {css: "[data-testid='button_square_4']"});
});

Scenario('Can reverse ordering', ({I}) => {
    I.click({css: "[data-testid='button_square_3']"});
    I.see("X", {css: "[data-testid='button_square_3']"});
    I.click({css: "[data-testid='button_square_0']"});
    I.see("O", {css: "[data-testid='button_square_0']"});
    I.click({css: "[data-testid='button_square_1']"});
    I.see("X", {css: "[data-testid='button_square_1']"});
    I.see("", {xpath: "//ol"})
    I.dontSeeElement({xpath: "//ol[@reversed]"});

    I.click({css: "[data-testid='button_reverse']"});

    I.see("", {xpath: "//ol[@reversed]"});
});
