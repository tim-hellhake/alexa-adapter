/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const HueBridgeEmulator = require('hue-bridge-emulator');
const {
  WebThingsClient
} = require('webthings-client');

const {
  Adapter,
  Device,
} = require('gateway-addon');

class AlexaDevice extends Device {
  constructor(adapter, manifest) {
    super(adapter, manifest.display_name);
    this['@context'] = 'https://iot.mozilla.org/schemas/';
    this.name = manifest.display_name;
    this.description = manifest.description;
    const {
      token
    } = manifest.moziot.config;

    const hueBridgeEmulator = new HueBridgeEmulator();
    hueBridgeEmulator.start();

    const webThingsClient = new WebThingsClient('localhost', 8080, token);

    (async () => {
      const devices = await webThingsClient.getDevices();

      for (const device of devices) {
        for (const propertyName in device.properties) {
          try {
            const property = device.properties[propertyName];
            if (property.type === 'boolean') {
              console.log(`Adding ${device.name}`);
              const onChange = (key, value) => {
                if (key === 'on') {
                  console.log(`${device.name} ${propertyName} => ${value}`);
                  webThingsClient.setProperty(property, propertyName, value);
                }
              };
              hueBridgeEmulator.addLight(`${device.name}`, onChange);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    })();
  }
}

class AlexaAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, AlexaAdapter.name, manifest.name);
    addonManager.addAdapter(this);
    const device = new AlexaDevice(this, manifest);
    this.handleDeviceAdded(device);
  }
}

module.exports = AlexaAdapter;
