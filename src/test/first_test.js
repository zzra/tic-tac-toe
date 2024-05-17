Feature('Basic Functionality');

Before(({I}) => {
    I.amOnPage('/');
})

Scenario('Test can load page', ({I}) => {
    I.see('Next player');
});

Scenario('Can click square as players', ({I}) => {
    I.click({css: "#button_0"});
    I.see("X", {css: "#button_0"});
});