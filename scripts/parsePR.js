const fs = require('fs');

const prBody = process.env.PR_BODY || '';

const startMarker = 'Apex::[';
const endMarker = ']::Apex';

let apexTests = 'all';

const startIndex = prBody.indexOf(startMarker);

if (startIndex !== -1) {
    const endIndex = prBody.indexOf(
        endMarker,
        startIndex + startMarker.length
    );

    if (endIndex !== -1) {
        apexTests = prBody
            .substring(
                startIndex + startMarker.length,
                endIndex
            )
            .trim();
    }
}

if (!apexTests) {
    apexTests = 'all';
}

console.log('==============================================');
console.log('          APEX TEST CONFIGURATION');
console.log('==============================================');

console.log(`Tests from PR: ${apexTests}`);

if (apexTests.toLowerCase() === 'all') {
    console.log('Test Level: RunLocalTests');
} else {
    console.log('Test Level: RunSpecifiedTests');
}

console.log('==============================================');

fs.writeFileSync('testsToRun.txt', apexTests);