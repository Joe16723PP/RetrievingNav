const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

// set chrome driver
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());



async function getNavByName (navName) {
    let driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

    await driver.get("https://codequiz.azurewebsites.net/");
    // login
    let loginBtn = await driver.findElement(webdriver.By.xpath("//input[@value='Accept']"));
    loginBtn.click();
    // get next ele from fundName
    let path = `//td[text()='${navName}']/following-sibling::td`;
    // delay 1s page to load
    let fundName = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(path)), 1000);
    console.log((await fundName.getText()).toString())

    await driver.close();
}

// get args from console
const args = process.argv.slice(2);
getNavByName(args[0]);