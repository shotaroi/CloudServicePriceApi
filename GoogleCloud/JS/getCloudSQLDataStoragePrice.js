let dataJson = require('../JSON/cloudSQL.json');
let dataJson2 = require('../JSON/cloudSQL2.json');
let dataJsonsArray = [dataJson, dataJson2];
let postgresDescription = new Set();
let postgresRegions = new Set();
let postgresDescriptionToPriceMap = new Map();
const regionCodesAndNames = {
    'asia-east1': 'Taiwan ',
    'asia-east2': 'Hong Kong ',
    'asia-northeast1': 'Tokyo ',
    'asia-northeast2': 'Osaka ',
    'asia-northeast3': 'Seoul ',
    'asia-south1': 'Mumbai ',
    'asia-south2': 'Delhi ',
    'asia-southeast1': 'Singapore ',
    'asia-southeast2': 'Jakarta ',
    'australia-southeast1': 'Sydney ',
    'australia-southeast2': 'Melbourne ',
    'europe-central2': 'Warsaw ',
    'europe-north1': 'Finland ',
    'europe-southwest1': 'Madrid ',
    'europe-west1': 'Belgium ',
    'europe-west2': 'London ',
    'europe-west3': 'Frankfurt ',
    'europe-west4': 'Netherlands ',
    'europe-west6': 'Zürich ',
    'europe-west8': 'Milan ',
    'europe-west9': 'Paris ',
    'europe-west12': 'Turin ',
    'me-central1': 'Doha ',
    'me-west1': 'Tel Aviv ',
    'northamerica-northeast1': 'Montréal ',
    'northamerica-northeast2': 'Toronto ',
    'southamerica-east1': 'São Paulo ',
    'southamerica-west1': 'Santiago ',
    'us-central1': 'Iowa ',
    'us-east1': 'South Carolina ',
    'us-east4': 'Northern Virginia ',
    'us-east5': 'Columbus ',
    'us-south1': 'Dallas ',
    'us-west1': 'Oregon ',
    'us-west2': 'Los Angeles ',
    'us-west3': 'Salt Lake City ',
    'us-west4': 'Las Vegas ',
}


// Writes a google cloud data storage price list in USD. 
function writeDataStoragePrice() {
    const fs = require('fs');
    let lines = [];
    let regionToPrice = new Map();
    dataJsonsArray.forEach((dataJson) => {
        dataJson.skus.forEach((sku) => {
            if (sku.description.includes('PostgreSQL') && sku.description.includes('Zonal - Standard storage')) {
                postgresDescription.add(sku.description);
                sku.serviceRegions.forEach((region) => {
                     postgresRegions.add(region);
                     regionToPrice.set(region, sku.pricingInfo[0].pricingExpression.tieredRates[0].unitPrice.nanos);
                })
                postgresDescriptionToPriceMap.set(sku.description, sku.pricingInfo[0].pricingExpression.tieredRates[0].unitPrice.nanos)          
            }
        })    
    })  
    postgresRegions.forEach((region) => {
        if (regionCodesAndNames[region]) lines.push('  \'' + regionCodesAndNames[region] + '\': ' + regionToPrice.get(region)/10**9 + ',\n') 
    })
    fs.writeFile('./GoogleCloud/PriceOutput/CloudSQLDataStoragePrices.txt', '{\n' + lines.join('')+'}', (err) => { if (err) throw err; });
}

writeDataStoragePrice()
