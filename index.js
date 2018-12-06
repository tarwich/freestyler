// const { connect } = require('net');

// const client = connect(3332, 'localhost');

// client.write('FSOC002255');

// setTimeout(() => {
//   client.write('FSOC002254');
//   client.write('FSBC002000');

//   const test = client.read(1);
//   client.on('data', function(data) {
//     console.log('Received: ' + data);
//     client.end();
//   });
//   console.log('test', test);
// }, 1500);

const { FreeStylerClient } = require('./freestyler-client');

async function main() {
  const client = new FreeStylerClient('localhost');

  // console.log('CueCaptions', await client.requestCueCaptions(), '\n');
  // console.log('OverrideButtonCaptions', await client.requestOverrideButtonCaptions(), '\n');
  // console.log('CuelistCaptionsOfCurrentPage', await client.requestCuelistCaptionsOfCurrentPage(), '\n');
  // console.log('AllCuelistCaptions', await client.requestAllCuelistCaptions(), '\n');
  // console.log('CueStatus', await client.requestCueStatus(), '\n');
  // console.log('OverrideButtonsFlashSetting', await client.requestOverrideButtonsFlashSetting(), '\n');
  // console.log('OverrideButtonsStatus', await client.requestOverrideButtonsStatus(), '\n');
  // console.log('GroupNames', await client.requestGroupNames(), '\n');
  // console.log('GroupStatus', await client.requestGroupStatus(), '\n');
  // console.log('FreeStylerVersion', await client.requestFreeStylerVersion(), '\n');
  // console.log('SubmasterNames', await client.requestSubmasterNames(), '\n');
  // console.log('SubmasterStatus', await client.requestSubmasterStatus(), '\n');
  // console.log('SubmasterIntensity', await client.requestSubmasterIntensity(), '\n');
  // console.log('BlackoutStatus', await client.requestBlackoutStatus(), '\n');
  // console.log('CurrentSelectedCueInSubmasters', await client.requestCurrentSelectedCueInSubmasters(), '\n');
  // console.log('CuelistStatus', await client.requestCuelistStatus(), '\n');
  // console.log('FixtureNames', await client.requestFixtureNames(), '\n');
  // console.log('FixtureAddress', await client.requestFixtureAddress(), '\n');

  client.selectFixture(2);

  for (let i = 0; i <= 255; ++i) {
    client.sendAsciiProtocol(138, i);
    await new Promise(resolve => setTimeout(resolve, 2000 / 255));
  }

  // for (let i = 0; i <= 999; ++i) {
  //   const response = await client.sendByteProtocol(i);
  //   if (response.substr(5)) console.log(`   ${i}`.substr(-3), response, '\n');
  // }

  client.disconnect();
}

main().catch(console.error);
