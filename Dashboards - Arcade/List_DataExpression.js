// Reference layer using the FeatureSetByPortalItem() method. 
var fs = FeatureSetByPortalItem(Portal('https://www.arcgis.com'), '945c3534d93c49baaad9470d545c3bad' , 0, ['Constatering'], false);

// Empty dictionary to capture each hazard reported as separate rows. 
var choicesDict = {'fields': [{ 'name': 'split_choices', 'type': 'esriFieldTypeString'}], 
                    'geometryType': '', 'features': []}; 

var index = 0; 

// Split comma separated hazard types and store in dictionary.  
for (var feature in fs) { 
    var split_array  =  Split(feature["Constatering"], ',') 
    var count_arr = Count(split_array) 
    for(var i = 0; i < count_arr; i++ ){ 
        choicesDict.features[index++] = { 
            'attributes': { 'split_choices': Trim(split_array[i]),  
            }
}}} 

// Convert dictionary to featureSet. 
var fs_dict = FeatureSet(Text(choicesDict)); 

// Return featureset after grouping by hazard types. 
return GroupBy(fs_dict, ['split_choices'], 
       [{ name: 'split_count', expression: 'split_choices', statistic: 'COUNT' }]);  