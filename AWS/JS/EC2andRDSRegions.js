const regionDataJson = require('../JSON/AWSRegions.json');
const regionCodesAndNames = {
    "us-east-2": "US East (Ohio)",
    "us-east-1": "US East (N. Virginia)",
    "us-west-1": "US West (N. California)",
    "us-west-2": "US West (Oregon)",
    "af-south-1": "Africa (Cape Town)",
    "ap-east-1": "Asia Pacific (Hong Kong)",
    "ap-south-2": "Asia Pacific (Hyderabad)",
    "ap-southeast-3": "Asia Pacific (Jakarta)",
    "ap-southeast-4": "Asia Pacific (Melbourne)",
    "ap-south-1": "Asia Pacific (Mumbai)",
    "ap-northeast-3": "Asia Pacific (Osaka)",
    "ap-northeast-2": "Asia Pacific (Seoul)",
    "ap-southeast-1": "Asia Pacific (Singapore)",
    "ap-southeast-2": "Asia Pacific (Sydney)",
    "ap-northeast-1": "Asia Pacific (Tokyo)",
    "ca-central-1": "Canada (Central)",
    "eu-central-1": "Europe (Frankfurt)",
    "eu-west-1": "Europe (Ireland)",
    "eu-west-2": "Europe (London)",
    "eu-south-1": "Europe (Milan)",
    "eu-west-3": "Europe (Paris)",
    "eu-south-2": "Europe (Spain)",
    "eu-north-1": "Europe (Stockholm)",
    "eu-central-2": "Europe (Zurich)",
    "me-south-1": "Middle East (Bahrain)",
    "me-central-1": "Middle East (UAE)",
    "sa-east-1": "South America (São Paulo)",
    "us-gov-east-1": "AWS GovCloud (US-East)",
    "us-gov-west-1": "AWS GovCloud (US-West)",
    "cn-north-1": "China (Beijing)",
    "cn-northwest-1": "China Ningxia"
}


function checkIfEC2andRDSHaveSameRegions (EC2Regions, RDSRegions) {
    for (i=0; i<EC2Regions.length; i++) {
        if (EC2Regions[i] !== RDSRegions[i]) { return false; }
    }
    return true;
}

// Returns array of region codes for the specified service. 
function getEC2orRDSRegionCodes (service) {
    const regionDataJson = require('../JSON/AWSRegions.json');
    let EC2Regions = [];
    let RDSRegions = [];
    for (i=0; i<regionDataJson["prices"].length; i++) {
        if (regionDataJson["prices"][i]['attributes']['aws:serviceName'] === "Amazon Elastic Compute Cloud (EC2)") {
            EC2Regions.push(regionDataJson["prices"][i]['attributes']['aws:region']);
        }
        if (regionDataJson["prices"][i]['attributes']['aws:serviceName'] === "Amazon Relational Database Service (RDS)") {
            RDSRegions.push(regionDataJson["prices"][i]['attributes']['aws:region']);
        }
    }
    EC2Regions.sort();
    RDSRegions.sort();
        if (service === "EC2") return EC2Regions;
        else if (service === "RDS") return RDSRegions;
}

// Returns array of region names
function getEC2orRDSRegionNames (service) {
    const regionCodes = getEC2orRDSRegionCodes(service);
    const regionNames = [];
    const noMatch = [];
    regionCodes.forEach((regionCode) => {
        if (regionCodesAndNames[regionCode]) regionNames.push(regionCodesAndNames[regionCode]);
        else noMatch.push(regionCode);
    })
    return regionNames;
    //return noMatch;
}


module.exports.checkIfEC2andRDSHaveSameRegions = checkIfEC2andRDSHaveSameRegions;
module.exports.getEC2orRDSRegionCodes = getEC2orRDSRegionCodes;
module.exports.getEC2orRDSRegionNames = getEC2orRDSRegionNames;
module.exports.regionCodesAndNames = regionCodesAndNames;


// console.log(getEC2orRDSRegionCodes('EC2'));
// console.log(getEC2orRDSRegionNames('EC2'));


