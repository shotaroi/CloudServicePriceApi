let dataJson = require('../JSON/cloudSQL.json');
let dataJson2 = require('../JSON/cloudSQL2.json');
let SQLdataJsonArray = [dataJson, dataJson2];
let CEdataJson = require('../JSON/computeEngine.json');
let CEdataJson2 = require('../JSON/computeEngine2.json');
let CEdataJson3 = require('../JSON/computeEngine3.json');
let CEdataJson4 = require('../JSON/computeEngine4.json');
let CEdataJsonArray = [CEdataJson, CEdataJson2, CEdataJson3, CEdataJson4];
let SQLRegions = new Set();
let CERegions = new Set();

/*
SQLRegionsResult:
    'europe-west1',
    'us-west4',
    'europe-west9',
    'europe-southwest1',
    'asia-south1',
    'europe-west4',
    'us-west3',
    'australia-southeast2',
    'asia-east1',
    'us-east5',
    'europe-west8',
    'europe-west12',
    'asia-south2',
    'northamerica-northeast1',
    'northamerica-northeast2',
    'southamerica-west1',
    'me-central1',
    'us-west2',
    'us-east7',
    'me-west1',
    'us-east4',
    'asia-northeast3',
    'asia-northeast2',
    'asia-northeast1',
    'europe-west2',
    'asia-southeast1',
    'us-central1',
    'europe-west6',
    'europe-west3',
    'asia-east2',
    'asia-southeast2',
    'us-south1',
    'europe-north1',
    'southamerica-east1',
    'europe-central2',
    'australia-southeast1',
    'global',
    'us-east1',
    'us-west1'
Total 39

Compute Engine regions result: 
[
  'asia',*
  'asia-east1',
  'asia-east2',
  'asia-northeast1',
  'asia-northeast2',
  'asia-northeast3',
  'asia-south1',
  'asia-south2',
  'asia-southeast1',
  'asia-southeast2',
  'australia-southeast1',
  'australia-southeast2',
  'europe',*
  'europe-central2',
  'europe-north1',
  'europe-southwest1',
  'europe-west1',
  'europe-west12',
  'europe-west2',
  'europe-west3',
  'europe-west4',
  'europe-west5',*
  'europe-west6',
  'europe-west8',
  'europe-west9',
  'global',*
  'me-central1',
  'me-west1',
  'northamerica-northeast1',
  'northamerica-northeast2',
  'southamerica-east1',
  'southamerica-west1',
  'us',*
  'us-central1',
  'us-east1',
  'us-east4',
  'us-east5',
  'us-east7',*
  'us-south1',
  'us-west1',
  'us-west2',
  'us-west3',
  'us-west4'
] 43

The regions which weren't in Cloud SQL Database: 
europe
asia
us
europe-west5
*/


SQLdataJsonArray.forEach((dataJson) => {
    dataJson.skus.forEach((sku) => {
            SQLRegions.add(sku.serviceRegions[0]);
        }
    )    
})

// console.log(SQLRegions, SQLRegions.size);


CEdataJsonArray.forEach((dataJson) => {
    dataJson.skus.forEach((sku) => {
            CERegions.add(sku.serviceRegions[0]);
        }
    )    
})

console.log(Array.from(CERegions).sort(), CERegions.size);

// CERegions.forEach((CEregion) => {
//     if (!SQLRegions.has(CEregion)) console.log(CEregion);
// })

// SQLRegions.forEach((SQLregion) => {
//     if (!CERegions.has(SQLregion)) console.log(SQLregion);
// })