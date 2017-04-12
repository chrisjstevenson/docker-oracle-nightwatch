describe('Default', function() {

    describe('Home - Customer Management', function() {

        before(function(browser, done) {
            done();
        });

        after(function(browser, done) {
            browser.end(function() {
                done();
            });
        });

        afterEach(function(browser, done) {
            done();
        });

        beforeEach(function(browser, done) {
            done();
        });

        it('should have a title', function(browser) {
            browser
                .url(browser.launch_url)
                .waitForElementVisible("body")
                .assert.title("Home - Customer Management")
                .end()
        });

        it('should have larry111 as an active customer', function(browser) {
            browser
                .url(browser.launch_url)
                .waitForElementVisible("body")
                .assert.containsText(".customer__1", "larry111")
                .end();
        });
    });
});