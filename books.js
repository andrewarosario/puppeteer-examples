const puppeteer = require('puppeteer')

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/')
  page.click('h3 > a')
  await page.waitForNavigation()
  await page.screenshot({ path: 'example_books.png' })
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div.product_main')).reduce(
      (result, book) => {
        return {
          title: book.getElementsByTagName('h1')[0].innerText,
          price: book.getElementsByClassName('price_color')[0].innerText,
        }
      }, {})
  })
  browser.close()
  return result
}
scrape().then((value) => {
  console.log(value)
})