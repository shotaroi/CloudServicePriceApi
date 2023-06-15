// index.json for RDS: https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/current/index.json
// Offer index file: https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json
const dataJson = require('../JSON/RDSindex.json');


function helperFunctionForRDSStroagePrice() {
        let SKULocationMap = new Map();
        let SKUs = [];
        Object.keys(dataJson["products"]).forEach(function(sku) {
        if (dataJson["products"][sku]["productFamily"] === "Database Storage" && 
            dataJson["products"][sku]["attributes"]["storageMedia"] === "SSD" &&
            dataJson["products"][sku]["attributes"]["volumeType"] === "General Purpose" &&
            dataJson["products"][sku]["attributes"]["deploymentOption"] === "Single-AZ" &&
            dataJson["products"][sku]["attributes"]["engineCode"] === "10" &&   // 10, 11, 12, 14 or 15. Seems like 14 is for Postfres, and others are for SQL Server.
            (dataJson["products"][sku]["attributes"]["databaseEngine"] === "PostgreSQL" ||
            dataJson["products"][sku]["attributes"]["databaseEngine"] === "SQL Server")) {
                SKUs.push(sku);
                SKULocationMap.set(sku, dataJson["products"][sku]["attributes"]["location"]);
                // logStorageInfo(key); 
            }
        })
        return [SKUs, SKULocationMap];
}


function logStorageInfo() {
    let SKUsAndSKULocationMap = helperFunctionForRDSStroagePrice();
    let SKUs = SKUsAndSKULocationMap[0];
    let SKULocationMap = SKUsAndSKULocationMap[1];
    Object.keys(dataJson["products"]).forEach(function(sku) {
    if (dataJson["products"][sku]["productFamily"] === "Database Storage" && 
        dataJson["products"][sku]["attributes"]["storageMedia"] === "SSD" &&
        dataJson["products"][sku]["attributes"]["volumeType"] === "General Purpose" &&
        dataJson["products"][sku]["attributes"]["deploymentOption"] === "Single-AZ" &&
        dataJson["products"][sku]["attributes"]["engineCode"] === "10" &&   // 10, 11, 12, 14 or 15. Seems like 14 is for Postfres, and others are for SQL Server.
        (dataJson["products"][sku]["attributes"]["databaseEngine"] === "PostgreSQL" ||
        dataJson["products"][sku]["attributes"]["databaseEngine"] === "SQL Server")) {
            SKUs.push(sku);
            SKULocationMap.set(sku, dataJson["products"][sku]["attributes"]["location"]);
            // logStorageInfo(key); 
        }
    })
    SKUs.forEach((sku) => {
        console.log('SKU : ' + sku + ', Storage Info : ' + dataJson["products"][sku]["attributes"]["location"] +
        " " + dataJson["products"][sku]["attributes"]["storageMedia"] + 
        " " + dataJson["products"][sku]["attributes"]["volumeType"] + 
        " " + dataJson["products"][sku]["attributes"]["databaseEngine"] + 
        " " + dataJson["products"][sku]["attributes"]["engineCode"] 
        )
    })
}


// On-demand offerTermCode = JRTCKXETXF , rateCode = sku + ".JRTCKXETXF.6YS6EN2CT7"
function logStoragePrices() {
    let SKUsAndSKULocationMap = helperFunctionForRDSStroagePrice();
    let SKUs = SKUsAndSKULocationMap[0];
    let SKULocationMap = SKUsAndSKULocationMap[1];
    SKUs.forEach((foundSKU) => {
        Object.keys(dataJson["terms"]["OnDemand"]).forEach((priceSKU) => {
            if (foundSKU === priceSKU) {
                console.log(SKULocationMap.get(priceSKU) + ': ' + 
                dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+".JRTCKXETXF.6YS6EN2CT7"]["pricePerUnit"]["USD"])
            }
        })
    })
}

// Writes storage prices (USD) in GB / month for different regions
function writeStoragePrices() {
    const fs = require('fs')
    let SKUsAndSKULocationMap = helperFunctionForRDSStroagePrice();
    let SKUs = SKUsAndSKULocationMap[0];
    let SKULocationMap = SKUsAndSKULocationMap[1];
    let lines = [];
    SKUs.forEach(function(foundSKU){
        Object.keys(dataJson["terms"]["OnDemand"]).forEach(function(priceSKU) {
            if (foundSKU === priceSKU) {
                lines.push('  \''+SKULocationMap.get(priceSKU)+ '\'' + ': ' + 
                dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+".JRTCKXETXF.6YS6EN2CT7"]["pricePerUnit"]["USD"]
                + ',\n');
            }
        })
    })
    lines.sort();
    fs.writeFile('../PriceOutput/RDSStoragePrices.txt', '{\n'+lines.join('')+'}', (err) => { if (err) throw err; })
    console.log('File written')
}


// writeStoragePrices();
// logStorageInfo();
// logStoragePrices();





