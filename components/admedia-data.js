/**
 * This is a very simple class that returns data asynchronously.
 *
 * This code runs on both the server and in the browser.
 *
 * You could also put the logic to detect if code is being run on
 * the server or in the browser inside the page template.
 */
const Zanox = require('zanox-api')

import fetch from 'isomorphic-fetch'

const config = require('../config.js')

const connectId = config.connectId
const secretKey = config.secretKey
const adspace = config.adspace
const zanox = new Zanox(connectId, secretKey)

export default class {

  static async getData() {
    function zxpromise() {
      return new Promise(function (resolve, reject) {
        return zanox.admedia({
          region: 'DE'
          // items: 5
        }, function (err, result) {
          if (err != null) {
            reject(err)
          }
          // console.log(result, "before return");
          resolve(result)
        // console.log(result, "after return");
        })
      })
    }
    // This version of fetch runs in browsers as well as sever side
    let data = await zxpromise()
    let incentives = data.incentiveItems.incentiveItem
    return incentives
  }

}
