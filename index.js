var Nemo = require("nemo");
var driver;
var webdriver;
var wdb;

//passing __dirname as the first argument tells confit to
//look in __dirname + '/config' for config files
function startmeup() {
    var nemo = Nemo(__dirname, function (err) {
        //always check for errors!
        if (!!err) {
            console.log('Error during Nemo setup', err);
            return;
        }
        driver = nemo.driver;
        webdriver = nemo.wd;
        wdb = nemo.wdb;

        var sum;
        if (nemo.data.factor === 'mobile') {

            return populate()
                .then(function (_sum) {
                    sum = _sum;
                    // using appium specific methods to find a click the button
                    return wdb.elementByAccessibilityId('ComputeSumButton')
                        .click().sleep(1000);
                }).then(function () {
                    return wdb
                        .elementByIosUIAutomation('elements().withName("Answer");')
                        .then(function (el) {
                            // converting from wd el
                            return wdb.swEl(el).getText();
                        });
                }).then(function (text) {
                    text.should.equal("" + sum);
                }).then(function () {
                    nemo.driver.quit().then(nemo.appium.kill);

                }, function (err) {
                    console.error(err);
                    nemo.driver.quit().then(nemo.appium.kill);
                });
        } else {
            wdb.get('http://www.google.com');
            return wdb.elementByName('q').then(function (elt) {
                console.log('elt', elt);
                return nemo.driver.sleep(2000);
            }).then(function () {
                nemo.driver.quit().then(nemo.appium.kill);
            }, function (err) {
                console.error(err);
                nemo.driver.quit().then(nemo.appium.kill);
            });
        }
    });
}

function waiter() {
    return driver.wait(function () {
        return driver.findElement(webdriver.By.name(name));
    }, 3000);
}
function populate() {
    var sum = 0;
    var populateField = function (name) {
        console.log("Entering in to this method $$$$$$$$$$$");
        return driver.wait(function () {
            return driver.findElement(webdriver.By.name(name));
        }, 3000).then(function (el) {
            var x = Math.floor(10 * Math.random());
            sum += x;
            return el.sendKeys('' + x);
        }).then(function () {
            return driver.findElement(webdriver.By.name('Done'));
        }).then(function (el) {
            // converting to wd el
            return wdb.wdEl(el).click();
        }).then(function () {
            return driver.sleep(100);
        });
    };
    return populateField('IntegerA')
        .then(function () {
            return populateField('IntegerB');
        })
        .then(function () {
            return sum;
        });
}
function populateG() {
    var sum = 0;
    var populateField = function (name) {
        return driver.get('http://www.google.com').then(function () {
            return driver.wait(function () {
                return driver.findElement(webdriver.By.name(name));
            }, 3000).then(function (el) {
                var x = Math.floor(10 * Math.random());
                sum += x;
                return el.sendKeys('foo bar bing bang ' + x);
            }).then(function () {
                return driver.findElement(webdriver.By.name('btnG'));
            }).then(function (el) {
                // converting to wd el
                return wdb.wdEl(el).click();
            }).then(function () {
                return driver.sleep(1000);
            });
        });

    };

    return populateField('q');
}
startmeup();