// Write an expression that returns a FeatureSet.
// Documentation: https://arcg.is/3c419TD
// Samples: https://arcg.is/38SEWWz

//buurtenLayer = FeatureSetByPortalItem("8fb37017cbc4499c8d17658c32893f2f")
var constateringenItemId = "945c3534d93c49baaad9470d545c3bad"
var wijkenItemId = "17df41cf00af46c08848c4c2ce731e1b"

var aportal = Portal('https://www.arcgis.com')
var wijkenLayer = FeatureSetByPortalItem(aportal,wijkenItemId, 1)
var zwolse_wijken = Filter(wijkenLayer, "gm_naam='Zwolle'")

var constateringenLayer = FeatureSetByPortalItem(aportal,constateringenItemId,0)
var temp = {}
for(var wijk in zwolse_wijken)
{
    
    temp[wijk.wk_naam] = {'wk_naam':wijk.wk_naam,'aantal':0,'tot_ernst':0,'gem_ernst':0}
}
var counter = 0
for(var constatering in constateringenLayer)
{
    counter +=1
    if(counter > 100)
    {
        //break;
    }
    var const_wijk
    for(wijk in zwolse_wijken)
    {
        if(Intersects(wijk,constatering))
        {
            const_wijk = wijk
        }
    }
    //Console(constatering.OBJECTID,const_wijk.wk_naam)
    temp[const_wijk.wk_naam]['aantal']+=1
    temp[const_wijk.wk_naam]['tot_ernst']+=constatering.Ernst
}


var resultDict = { 
  'fields': [{ 'name': 'wk_naam', 'type': 'esriFieldTypeString'},
  {'name': 'aantal', 'type': 'esriFieldTypeInteger'},
  {'name': 'tot_ernst', 'type': 'esriFieldTypeInteger'},
  {'name': 'gem_ernst', 'type': 'esriFieldTypeDouble'}], 
  'geometryType': '', 
  'features': [] 
}; 
var index=0;
for(var resultitemname in temp)
{
    var resultitem = temp[resultitemname]
    resultitem['gem_ernst'] = Round(resultitem['tot_ernst'] / resultitem['aantal'],2)
    Console(resultitem)
    resultDict.features[index] = {"attributes":resultitem}
    
    index++;
}
//Console(temp)
var sla = zwolse_wijken
//Console(Count(zwolse_wijken))
var resultFS = FeatureSet(Text(resultDict))
return resultFS

