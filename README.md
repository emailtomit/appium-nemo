# appium-nemo

## Pre-requisites

You should have `appium` globally installed, and be aware of the path to that executable

You should have an iOS application on your filesystem, and OSX dev tools obviously. For the example script herein, I use 
the iOS app you can find in the [appium sample code repo](https://github.com/appium/sample-code).

## Set environment variables

* `NODE_ENV` set to `ios` to select the `ios.json` nemo config file
* `IOS_APP_PATH` set to the path to your iOS mobile application
* `APPIUM_PATH` set to the path of the appium executable

## Execute

`node index.js`

_(If you're using something earlier than `node@v4` you'll want to start the process with the `--harmony` flag)_