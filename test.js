var Nemo = require("nemo");
var driver;
var webdriver;
var wdb;

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
                        .elementByAccessibilityId('Answer');
                }).then(function (text) {
                    console.log("Text :",text);
                    text.should.equal("" + sum);
                }).then(function () {
                    nemo.driver.quit().then(nemo.appium.kill);

                }, function (err) {
                    console.error(err);
                    nemo.driver.quit().then(nemo.appium.kill);
                });
        }
    });
}

function populate() {
    var sum = 0;
    var populateField = function (name) {
        return driver.wait(function () {
            return wdb.elementByAccessibilityId(name);
        }, 3000).then(function (el) {
            var x = Math.floor(10 * Math.random());
            sum += x;
            return el.sendKeys('' + x);
        }).then(function () {
            return wdb.elementByAccessibilityId('Done').click().sleep(1000);
        }).then(function () {
            return wdb.sleep(100);
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

startmeup();