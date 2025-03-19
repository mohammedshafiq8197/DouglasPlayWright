// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :1,
  workers: 3,
  /* Maximum time one test can run for. */
  //10-
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: [["line"],["allure-playwright"]],
  projects : [
    {
      name : 'safari',
      use: {

        browserName : 'webkit',
        headless : false,
        screenshot : 'off',
        trace : 'on-first-retry',//off,on 
        
      }

    },
    {
      name : 'chrome',
      use: {

        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        
        trace : 'off',//off,on
       // ...devices['']
       viewport : {width:1920,height:1080}
         }

    }
    ]

};

module.exports = config;
