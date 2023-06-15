let SQLdataJson = require('../JSON/cloudSQL.json');
let SQLdataJson2 = require('../JSON/cloudSQL2.json');
let CEdataJson = require('../JSON/computeEngine.json');
let CEdataJson2 = require('../JSON/computeEngine2.json');
let CEdataJson3 = require('../JSON/computeEngine3.json');
let CEdataJson4 = require('../JSON/computeEngine4.json');

let SQLdataJsonArray = [SQLdataJson, SQLdataJson2];
let CEdataJsonArray = [CEdataJson, CEdataJson2, CEdataJson3, CEdataJson4];
let resourceGroupInfo = new Set();
let geoInfo = new Set();

const networkResourceGroup = [
    'PremiumInternetEgress',
    'InterregionEgress',
    'IpAddress',
    'PeeringOrInterconnectEgress',
    'InterzoneEgress',
    'ExternalTraffic'
]

const EC2Regions = {
    'asia-east1': 'Taiwan (asia-east1)',
    'asia-east2': 'Hong Kong (asia-east2)',
    'asia-northeast1': 'Tokyo (asia-northeast1)',
    'asia-northeast2': 'Osaka (asia-northeast2)',
    'asia-northeast3': 'Seoul (asia-northeast3)',
    'asia-south1': 'Mumbai (asia-south1)',
    'asia-south2': 'Delhi (asia-south2)',
    'asia-southeast1': 'Singapore (asia-southeast1)',
    'asia-southeast2': 'Jakarta (asia-southeast2)',
    'australia-southeast1': 'Sydney (australia-southeast1)',
    'australia-southeast2': 'Melbourne (australia-southeast2)',
    'europe-central2': 'Warsaw (europe-central2)',
    'europe-north1': 'Finland (europe-north1)',
    'europe-southwest1': 'Madrid (europe-southwest1)',
    'europe-west1': 'Belgium (europe-west1)',
    'europe-west2': 'London (europe-west2)',
    'europe-west3': 'Frankfurt (europe-west3)',
    'europe-west4': 'Netherlands (europe-west4)',
    'europe-west6': 'Zürich (europe-west6)',
    'europe-west8': 'Milan (europe-west8)',
    'europe-west9': 'Paris (europe-west9)',
    'europe-west12': 'Turin (europe-west12)',
    'me-central1': 'Doha (me-central1)',
    'me-west1': 'Tel Aviv (me-west1)',
    'northamerica-northeast1': 'Montréal (northamerica-northeast1)',
    'northamerica-northeast2': 'Toronto (northamerica-northeast2)',
    'southamerica-east1': 'São Paulo (southamerica-east1)',
    'southamerica-west1': 'Santiago (southamerica-west1)',
    'us-central1': 'Iowa (us-central1)',
    'us-east1': 'South Carolina (us-east1)',
    'us-east4': 'Northern Virginia (us-east4)',
    'us-east5': 'Columbus (us-east5)',
    'us-south1': 'Dallas (us-south1)',
    'us-west1': 'Oregon (us-west1)',
    'us-west2': 'Los Angeles (us-west2)',
    'us-west3': 'Salt Lake City (us-west3)',
    'us-west4': 'Las Vegas (us-west4)'};

// function getCloudSQLDataTransferPrices() {
//     SQLdataJsonArray.forEach((dataJson) => {
//         dataJson.skus.forEach((sku) => {
//             if (sku.category.resourceFamily === 'Network' ) {
//                 console.log(sku.description + ':\t' + sku.category.resourceGroup + ':\t' + sku.pricingInfo[0].pricingExpression.tieredRates[0].unitPrice.nanos);
//                 resourceGroupInfo.add(sku.category.resourceGroup);
//                 geoInfo.add(sku.geoTaxonomy);
//             }
//         })
//     })
// }

// Internet standard tier egress
function getComputeEngineTransferPrices() {
    let result = [];
    const fs = require('fs');
    CEdataJsonArray.forEach((dataJson) => {
        dataJson.skus.forEach((sku) => {
            if (sku.category.resourceFamily === 'Network' && sku.category.resourceGroup === 'StandardInternetEgress')  { // StandardInternetEgress PremiumInternetEgress
                result.push('\n  \'' + EC2Regions[sku.serviceRegions] + '\': {\n' )
                sku.pricingInfo[0].pricingExpression.tieredRates.forEach((rate) => {
                    result.push('    \'startUsageAmount ' + rate.startUsageAmount + '\': ' + rate.unitPrice.nanos * (0.1**9) + ',\n'); 
                })
                result.push('  },');                
            }
        })
    })
    fs.writeFile('./GoogleCloud/PriceOutput/ComputeEngineStandardInternetEgressPrices.txt', '{' + result.join('') + '\n}', (err) => { if (err) throw err; } )
}




// getCloudSQLDataTransferPrices();
// getComputeEngineTransferPrices();






