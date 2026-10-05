const fs = require('fs');

const prBody = process.env.PR_BODY || '';

/*
 * Remove HTML comments from the PR body.
 *
 * Example:
 *
 * <!--
 * Apex::[TestClass1,TestClass2]::Apex
 * -->
 *
 * will be completely ignored.
 */
const bodyWithoutComments = prBody.replace(
    /<!--[\s\S]*?-->/g,
    ''
);

const startMarker = 'Apex::[';
const endMarker = ']::Apex';

let apexTests = 'all';

const startIndex = bodyWithoutComments.indexOf(startMarker);

if (startIndex !== -1) {

    const endIndex = bodyWithoutComments.indexOf(
        endMarker,
        startIndex + startMarker.length
    );

    if (endIndex !== -1) {

        apexTests = bodyWithoutComments
            .substring(
                startIndex + startMarker.length,
                endIndex
            )
            .trim();

    }
}

/*
 * If the active PR body contains:
 *
 * Apex::[]::Apex
 *
 * treat it as "all".
 */
if (!apexTests) {
    apexTests = 'all';
}

console.log('==============================================');
console.log('          APEX TEST CONFIGURATION');
console.log('==============================================');

console.log('Tests from PR:', apexTests);

if (apexTests.toLowerCase() === 'all') {
    console.log('Test Level: RunLocalTests');
} else {
    console.log('Test Level: RunSpecifiedTests');
}

console.log('==============================================');

fs.writeFileSync('testsToRun.txt', apexTests);