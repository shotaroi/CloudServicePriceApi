let continentsAndRegions = {
    'continents': [
        {   'regionName': 'northAmerica',
            'regions': [
            'Central US',
            'East US',
            'East US',
            'North Central US ',
            'South Central US',
            'West US',
            'West US 2',
            'West US 3',
            'Canada Central',
            'Canada East',
        ]},
        {   'regionName': 'europe',
            'regions': [
            'UK South',
            'UK West',
            'Switzerland North',
            'Switzerland West',
            'Sweden Central',
            'Sweden South',
            'Poland Central',
            'Norway East',
            'Norway West',
            'Germany North',
            'Germany West Central',
            'France Central',
            'France South',
            'North Europe',
            'West Europe',
        ]
        },
        {   'regionName': 'southAmerica',
            'regions': [
            'Brazil South',
            'Brazil Southeast',
            ]},
        {   'regionName': 'africa',
            'regions': [
            'South Africa North',
            'South Africa West',
            ]
        },
        {    'regionName': 'asia',
            'regions': [
            'Korea Central',
            'Korea South',
            'Japan East',
            'Japan West',
            'East Asia',
            'Southeast Asia',
            'Central India',
            'South India',
            'West India',
            ]
        },
        {   'regionName': 'oceania', 
            'regions': [
            'Australia Central',
            'Australia Central 2',
            'Australia East',
            'Australia Southeast',
            ]
        },
        {   'regionName': 'middleEast', 
            'regions': [
            'Qatar Central',
            'UAE Central',
            'UAE North',
            ]
        }
    ]
}



let result;
let array = [];
let region = 'Japan West'
continentsAndRegions.continents.forEach((continent) => {
	if (continent.regions.includes(region)) result = continent.regionName;
    // console.log(continent)
    // array.push(continentsAndRegions.continent[0]);
});

console.log(result)
// console.log(continentsAndRegions.continents[0].northAmerica.includes('East US'))
// console.log(continentsAndRegions)