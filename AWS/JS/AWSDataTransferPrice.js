const getEC2orRDSRegionCodes = require('./EC2andRDSRegions.js');
const dataJson = require('../JSON/DataTransferindex.json');
const regions = getEC2orRDSRegionCodes.getEC2orRDSRegionCodes('EC2');  // Array of regions
const transferTypelist = [
    'AWS Outbound',
    'IntraRegion',
    'InterRegion Outbound',
    'InterRegion Inbound',
    'AWS Inbound',
    'Inter Region Peering Data Transfer Outbound',
    'Inter Region Peering Data Transfer Inbound',
    'IntraRegion-xAZ-Out',
    'IntraRegion-xAZ-In',
    'IntraRegion-VPCpeering-In',
    'IntraRegion-VPCpeering-Out'
]


function showAWSOutboundPriceList() {
    let transferType = 'AWS Outbound';
    let SKUs = [];
    let SKULocationMap = new Map();
    let rateCodeLastPart = ['.JRTCKXETXF.Q3Z75P77EN', '.JRTCKXETXF.VF6T3GAUKQ', '.JRTCKXETXF.N9EW5UVVPA', '.JRTCKXETXF.GPHXDESFBB']; 
    // Find SKUs for (region) => (External) transfer. 
    Object.keys(dataJson["products"]).forEach((sku) => {
        if (dataJson["products"][sku]["productFamily"] === "Data Transfer" && 
            regions.includes(dataJson["products"][sku]["attributes"]["fromRegionCode"]) &&
            dataJson["products"][sku]["attributes"]["toLocation"] === 'External' &&
            transferType === dataJson["products"][sku]["attributes"]["transferType"]) {
            SKUs.push(sku);    
            SKULocationMap.set(sku, dataJson["products"][sku]["attributes"]["fromLocation"] + " => " +
            dataJson["products"][sku]["attributes"]["toLocation"] + ":  " + dataJson["products"][sku]["attributes"]["transferType"]);
        }
    })
    // On-demand offerTermCode = JRTCKXETXF , rateCode = sku + ".JRTCKXETXF.6YS6EN2CT7"
    // Find price information for found SKUs.
    SKUs.forEach((foundSKU) => {
        Object.keys(dataJson["terms"]["OnDemand"]).forEach((priceSKU) => {
            if (foundSKU === priceSKU && dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]) {
                rateCodeLastPart.forEach((element) => {
                    console.log(SKULocationMap.get(priceSKU) + ':  ' + 
                    dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+element]["pricePerUnit"]["USD"] + ":  " +
                    dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+element]["description"])
                })
            }
        })
    })
}

// Price in USD. Per GB. 
function showIntraOrInterRegionPriceList(transferTypeString) {
    let transferTypeInput = transferTypeString;  // 'IntraRegion','InterRegion Outbound', or 'InterRegion Inbound'
    let SKUs = [];
    let SKUToLocationMap = new Map();
    let rateCodeSecondPart = '.JRTCKXETXF';
    let rateCodeSecondAndThirdPart = '.JRTCKXETXF.6YS6EN2CT7';
    // Find SKUs for Intra or Inter region transfer. 
    Object.keys(dataJson["products"]).forEach((sku) => {
        if (dataJson["products"][sku]["productFamily"] === "Data Transfer" && 
            dataJson["products"][sku]["attributes"]["fromLocationType"] === 'AWS Region' &&
            dataJson["products"][sku]["attributes"]["toLocationType"] === 'AWS Region' &&
            transferTypeInput === dataJson["products"][sku]["attributes"]["transferType"]) {
            SKUs.push(sku);    
            SKUToLocationMap.set(sku, dataJson["products"][sku]["attributes"]["fromLocation"] + " => " +
            dataJson["products"][sku]["attributes"]["toLocation"] + ":  " + dataJson["products"][sku]["attributes"]["transferType"]);
        }
    })
    // On-demand offerTermCode = JRTCKXETXF , rateCode = sku + ".JRTCKXETXF.6YS6EN2CT7"
    // Find price information for found SKUs.
    SKUs.forEach((foundSKU) => {
        Object.keys(dataJson["terms"]["OnDemand"]).forEach((priceSKU) => {
            if (foundSKU === priceSKU && dataJson["terms"]["OnDemand"][priceSKU][priceSKU+rateCodeSecondPart]) {
                console.log(SKUToLocationMap.get(priceSKU) + ':  ' + 
                dataJson["terms"]["OnDemand"][priceSKU][priceSKU+rateCodeSecondPart]["priceDimensions"][priceSKU+rateCodeSecondAndThirdPart]["pricePerUnit"]["USD"] + ":  " +
                dataJson["terms"]["OnDemand"][priceSKU][priceSKU+rateCodeSecondPart]["priceDimensions"][priceSKU+rateCodeSecondAndThirdPart]["description"])
            }
        })
    })
}

// Price in USD. Per GB. 
function writeAWSOutboundDataTransferPrices() {
    let transferType = 'AWS Outbound';
    let SKUs = [];
    let rateCodes = [];
    let SKULocationMap = new Map();
    let rateCodeToPriceMap = new Map();
    let SKUDescriptionMap = new Map();
    let rateCodeToLocationMap = new Map();
    let rateCodesToDataPriceIndexMap = new Map();
    // Q3Z75P77EN = first 10 TB / month,  VF6T3GAUKQ = next 40 TB / month, N9EW5UVVPA = next 100 TB / month, GPHXDESFBB = greater than 150 TB / month data transfer out Carrier. 
    let rateCodeLastPart = ['.JRTCKXETXF.Q3Z75P77EN', '.JRTCKXETXF.VF6T3GAUKQ', '.JRTCKXETXF.N9EW5UVVPA', '.JRTCKXETXF.GPHXDESFBB']; 
    // Find SKUs for (region) => (External) transfer. 
    Object.keys(dataJson["products"]).forEach((sku) => {
        if (dataJson["products"][sku]["productFamily"] === "Data Transfer" && 
            //dataJson["products"][key]["attributes"]["fromLocationType"] === 'AWS Region' &&
            regions.includes(dataJson["products"][sku]["attributes"]["fromRegionCode"]) &&
            dataJson["products"][sku]["attributes"]["toLocation"] === 'External' &&
            transferType === dataJson["products"][sku]["attributes"]["transferType"]) {
            SKUs.push(sku);    
            SKULocationMap.set(sku, dataJson["products"][sku]["attributes"]["fromLocation"]);
        }
    })
    // On-demand offerTermCode = JRTCKXETXF , rateCode = sku + ".JRTCKXETXF.6YS6EN2CT7"
    // Find price information for found SKUs.
    SKUs.forEach((foundSKU) => {
        Object.keys(dataJson["terms"]["OnDemand"]).forEach((priceSKU) => {
            if (foundSKU === priceSKU && dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]) {
                rateCodeLastPart.forEach((element) => {
                    rateCodes.push(foundSKU+element);
                    if (element === '.JRTCKXETXF.GPHXDESFBB') rateCodesToDataPriceIndexMap.set(foundSKU+element, 0);
                    else if (element === '.JRTCKXETXF.N9EW5UVVPA') rateCodesToDataPriceIndexMap.set(foundSKU+element, 1);
                    else if (element === '.JRTCKXETXF.VF6T3GAUKQ') rateCodesToDataPriceIndexMap.set(foundSKU+element, 2);
                    else if (element === '.JRTCKXETXF.Q3Z75P77EN') rateCodesToDataPriceIndexMap.set(foundSKU+element, 3);
                    rateCodeToLocationMap.set(foundSKU+element, SKULocationMap.get(foundSKU));
                    rateCodeToPriceMap.set(foundSKU+element, dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+element]["pricePerUnit"]["USD"]); 
                    SKUDescriptionMap.set(foundSKU+element, dataJson["terms"]["OnDemand"][priceSKU][priceSKU+".JRTCKXETXF"]["priceDimensions"][priceSKU+element]["description"]); 
                })
            }
        })
    })
    const fs = require('fs')
    let lines = [];
    let newLines = [];
    let currentLocation;
    let firstLine = true;
    let lineToRateCodeMap = new Map();
    let dataPrice = ['greater than 150 TB / month', 'next 100 TB / month', 'next 40 TB / month', 'upto 10 TB / month'];
    let dataPriceIndex = 0;
    rateCodes.forEach((rateCode) => {
        lines.push(rateCodeToLocationMap.get(rateCode) + ' ' + rateCodeToPriceMap.get(rateCode));
        lineToRateCodeMap.set(rateCodeToLocationMap.get(rateCode) + ' ' + rateCodeToPriceMap.get(rateCode), rateCode);
    })
    lines.sort();
    lines.forEach((line) => {
        if (firstLine) {
            newLines.push('  \'' + rateCodeToLocationMap.get(lineToRateCodeMap.get(line)) + '\': {\n');    
            firstLine = false;
            currentLocation = rateCodeToLocationMap.get(lineToRateCodeMap.get(line));
        }
        if (currentLocation !== rateCodeToLocationMap.get(lineToRateCodeMap.get(line))) {
            newLines.push('  },\n  \'' + rateCodeToLocationMap.get(lineToRateCodeMap.get(line)) +
            '\': { \n' + '    \'' + dataPrice[rateCodesToDataPriceIndexMap.get(lineToRateCodeMap.get(line))] + '\': ' + rateCodeToPriceMap.get(lineToRateCodeMap.get(line))
            + ',\n');
            currentLocation = rateCodeToLocationMap.get(lineToRateCodeMap.get(line));
            dataPriceIndex++;
        } else {
            newLines.push('    \'' + dataPrice[rateCodesToDataPriceIndexMap.get(lineToRateCodeMap.get(line))] + '\': ' + rateCodeToPriceMap.get(lineToRateCodeMap.get(line))
            + ',\n');
            dataPriceIndex < 3 ? dataPriceIndex++ : dataPriceIndex = 0;
        }
    })
    fs.writeFile('../PriceOutput/AWSOutboundDataTransferPrices.txt', '{\n' + newLines.join('') + '  }\n}', (err) => { if (err) throw err; });
    console.log('File written')
}

// Price in USD. Per GB. 
function writeInterRegionOutboundPrices() {
    let SKUs = [];
    let SKUToLocationMap = new Map();
    let rateCodeSecondPart = '.JRTCKXETXF';
    let rateCodeSecondAndThirdPart = '.JRTCKXETXF.6YS6EN2CT7';
    let SKUToFromLocationMap = new Map();
    let SKUToToLocationMap = new Map();
    let fromLocationToToLocationAndPriceArrayMap = new Map();
    let regionsSet = new Set();
    let lines = [];
    const fs = require('fs')
    // Find SKUs for Intra or Inter region transfer. 
    Object.keys(dataJson["products"]).forEach((sku) => {
        if (dataJson["products"][sku]["productFamily"] === "Data Transfer" && 
            dataJson["products"][sku]["attributes"]["fromLocationType"] === 'AWS Region' &&
            dataJson["products"][sku]["attributes"]["toLocationType"] === 'AWS Region' &&
            'InterRegion Outbound' === dataJson["products"][sku]["attributes"]["transferType"]) {
            SKUs.push(sku);    
            SKUToLocationMap.set(sku, dataJson["products"][sku]["attributes"]["fromLocation"] + " => " +
            dataJson["products"][sku]["attributes"]["toLocation"] + ":  " + dataJson["products"][sku]["attributes"]["transferType"]);
            SKUToFromLocationMap.set(sku, dataJson["products"][sku]["attributes"]["fromLocation"]);
            SKUToToLocationMap.set(sku, dataJson["products"][sku]["attributes"]["toLocation"]);
            regionsSet.add(dataJson["products"][sku]["attributes"]["fromLocation"]);
        }
    })
    // On-demand offerTermCode = JRTCKXETXF , rateCode = sku + ".JRTCKXETXF.6YS6EN2CT7"
    // Find price information for found SKUs.
    SKUs.forEach((foundSKU) => {
        Object.keys(dataJson["terms"]["OnDemand"]).forEach((priceSKU) => {
            if (foundSKU === priceSKU && dataJson["terms"]["OnDemand"][priceSKU][priceSKU+rateCodeSecondPart]) {
                if (!fromLocationToToLocationAndPriceArrayMap.get(SKUToFromLocationMap.get(foundSKU))) {
                    fromLocationToToLocationAndPriceArrayMap.set(SKUToFromLocationMap.get(foundSKU), [])
                }   
                fromLocationToToLocationAndPriceArrayMap.get(SKUToFromLocationMap.get(foundSKU)).push([SKUToToLocationMap.get(foundSKU),
                dataJson["terms"]["OnDemand"][priceSKU][priceSKU+rateCodeSecondPart]["priceDimensions"][priceSKU+rateCodeSecondAndThirdPart]["pricePerUnit"]["USD"]])
            }
        })
    })
    lines.push('{\n')
    regionsSet.forEach((region) => {
        lines.push('  \'' + region + '\': {\n');
        fromLocationToToLocationAndPriceArrayMap.get(region).forEach((toRegionAndPrice) => {
            lines.push('    \'' + toRegionAndPrice[0] + '\': ' + toRegionAndPrice[1] + ',\n');
        })
        lines.push('  },\n')
    })
    fs.writeFile('../PriceOutput/interRegionOutboundDataTransferPrices.txt', lines.join('')+'}', (err) => { if (err) throw err; });
    console.log('File written');
}


//  showIntraOrInterRegionPriceList('InterRegion Outbound');
//  showAWSOutboundPriceList();
//  writeAWSOutboundDataTransferPrices();
//  writeInterRegionOutboundPrices();


