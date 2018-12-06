const { connect } = require('net');

class FreeStylerClient {
  constructor(server) {
    this.socket = connect(3332, server);
  }

  disconnect() {
    this.socket.end();
  }

  async requestCueCaptions() { return this.sendByteProtocol(1); }
  async requestOverrideButtonCaptions() { return this.sendByteProtocol(2); }
  async requestCuelistCaptionsOfCurrentPage() { return this.sendByteProtocol(3); }
  async requestAllCuelistCaptions() { return this.sendByteProtocol(4); }
  async requestCueStatus() { return this.sendByteProtocol(5); }
  async requestOverrideButtonsFlashSetting() { return this.sendByteProtocol(6); }
  async requestOverrideButtonsStatus() { return this.sendByteProtocol(7); }
  async requestGroupNames() { return this.sendByteProtocol(8); }
  async requestGroupStatus() { return this.sendByteProtocol(9); }
  async requestFreeStylerVersion() { return this.sendByteProtocol(10); }
  async requestSubmasterNames() { return this.sendByteProtocol(11); }
  async requestSubmasterStatus() { return this.sendByteProtocol(12); }
  async requestSubmasterIntensity() { return this.sendByteProtocol(13); }
  async requestBlackoutStatus() { return this.sendByteProtocol(14); }
  async requestCurrentSelectedCueInSubmasters() { return this.sendByteProtocol(15); }
  async requestCuelistStatus() { return this.sendByteProtocol(16); }
  async requestFixtureNames() { return this.sendByteProtocol(17); }
  async requestFixtureAddress() { return this.sendByteProtocol(18); }

  async selectFixture(index) {
    const text = String(index);

    for (let i = 0; i < text.length; ++i) {
      this.sendAsciiProtocol(319 + Number(text[i]));
    }
    this.sendAsciiProtocol(337);
  }

  async sendAsciiProtocol(message = 1, value = 255, extra = 'zzz') {
    return new Promise((resolve, reject) => {
      const formattedMessage = `000${message}`.substr(-3);
      const formattedValue = `000${value}`.substr(-3);
      // this.socket.on('error', reject);
      // this.socket.once('data', data => {
      //   this.socket.off('error', reject);
      //   resolve(String(data));
      // });
      this.socket.write(`FSOC${formattedMessage}${formattedValue}`);
    });
  }

  async sendByteProtocol(message = 1) {
    return new Promise((resolve, reject) => {
      const code = `000${message}`.substr(-3);
      this.socket.on('error', reject);
      this.socket.once('data', data => {
        this.socket.off('error', reject);
        resolve(String(data));
      });
      this.socket.write(`FSBC${code}000`);
    });
  }
}

module.exports = {
  FreeStylerClient
};
