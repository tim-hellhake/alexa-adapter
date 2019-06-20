# Alexa Adapter

[![Build Status](https://travis-ci.org/tim-hellhake/alexa-adapter.svg?branch=master)](https://travis-ci.org/tim-hellhake/alexa-adapter)
[![dependencies](https://david-dm.org/tim-hellhake/alexa-adapter.svg)](https://david-dm.org/tim-hellhake/alexa-adapter)
[![devDependencies](https://david-dm.org/tim-hellhake/alexa-adapter/dev-status.svg)](https://david-dm.org/tim-hellhake/alexa-adapter?type=dev)
[![optionalDependencies](https://david-dm.org/tim-hellhake/alexa-adapter/optional-status.svg)](https://david-dm.org/tim-hellhake/alexa-adapter?type=optional)
[![license](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)

Control your devices with alexa.

> Alexa, turn `foo` on

> Alexa, turn `foo` off

## Configuration
1. Go to http://[your-gateway]/oauth/authorize?response_type=code&client_id=local-token&scope=/things:readwrite
2. Create a token
3. Add the token to the config

## Add devices to alexa
1. Go to https://alexa.amazon.de/spa/index.html#appliances
2. Click on `Search`

## Limitations
* Currently only `boolean` properties are supported
* To add new devices you have to restart (disable/enable) the addon and then trigger a new alexa search
