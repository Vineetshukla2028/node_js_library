
const moment = require('moment');
const momentTimezone = require('moment-timezone');

// Function to display date and time in various formats
function displayDateTime() {
    // Current date and time
    const now = moment();

    console.log('--- Various Date and Time Formats ---');
    console.log('Default format:', now.format());
    console.log('ISO 8601 format:', now.toISOString());
    console.log('Custom format (DD-MM-YYYY):', now.format('DD-MM-YYYY'));
    console.log('Custom format (MMMM Do YYYY, h:mm:ss a):', now.format('MMMM Do YYYY, h:mm:ss a'));

    // German time system
    const germanTime = momentTimezone.tz(now, 'Europe/Berlin');
    console.log('\n--- German Time System ---');
    console.log('Date and Time in Berlin:', germanTime.format('DD-MM-YYYY HH:mm:ss'));
    console.log('Day of the week in German:', germanTime.format('dddd'));

    // Indian time system
    const indianTime = momentTimezone.tz(now, 'Asia/Kolkata');
    console.log('\n--- Indian Time System ---');
    console.log('Date and Time in India:', indianTime.format('DD-MM-YYYY HH:mm:ss'));
    console.log('Day of the week in Hindi:', indianTime.format('dddd'));

    // Display relative times
    console.log('\n--- Relative Time ---');
    console.log('10 minutes ago:', moment().subtract(10, 'minutes').fromNow());
    console.log('In 5 days:', moment().add(5, 'days').fromNow());
}


displayDateTime();
