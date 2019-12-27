const {assert} = require('chai')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const Table = require('cli-table')
const fs = require('fs');



const config = require('./config.json')

const table = new Table()

// Define your test url.
const testUrl = 'https://www.levi9.com/'


function launchChromeAndRunLighthouse(url, opts, conf = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, conf).then(res => {

        const reportResult=res.report;

      //workaround to save the report
      fs.writeFile("something.html", reportResult, function(err) {
        if(err) {
          return console.log(err);
        }

      });
        return chrome.kill().then(() => res.lhr)
      }
    )
  })
}

const opts = {
  // Flash green overlays on paint updates
  chromeFlags: ['--headless'],
  output: 'html',
  // onlyCategories: ['performance']

}
console.log(`${__dirname}/report.html`);
describe('Lighthouse PWA Testing', function () {
  // Timeout doesn't need to be same. It can be more or less depending on your project.
  this.timeout(50000);
  let results
  before('run base test', async () => {

    await launchChromeAndRunLighthouse(testUrl, opts, config).then(res => {
      results = Object.keys(res.categories).reduce((merged, category) => {
        merged[category] = res.categories[category].score
        return merged
      }, {})
    })
  })

  it('should have performance score greater than 90', async () => {
    console.log(await results.performance)
  })

  // it('should have performance score greater than 90', done => {
  //   assert.equal(results.performance > 0.9, true)
  //   done()
  // })
  // it('should have accessibility score greater than 90', done => {
  //   assert.equal(results.accessibility > 0.9, true)
  //   done()
  // })
  // it('should have best practices score greater than 90', done => {
  //   assert.equal(results['best-practices'] > 0.9, true)
  //   done()
  // })
  // it('should have seo score greater than 90', done => {
  //   assert.equal(results.seo > 0.9, true)
  //   done()
  // })
  // it('should have pwa score greater than 90', done => {
  //   assert.equal(results.pwa > 0.9, true)
  //   done()
  // })

  after(() => {
    Object.keys(results).forEach(category => {
      table.push([category, Math.round(results[category] * 100)])
    })
    // Output lighthouse-console scores in a table format within the cli.
    console.log(table.toString())
  })
})
