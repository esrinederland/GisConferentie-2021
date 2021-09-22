var kleurtje = '';

//determine the color based on the field value
if ($datapoint["avg_Ernst"] <= 1) {
    kleurtje = '#FC3B09'
}
else if ($datapoint["avg_Ernst"] <= 2) {
    kleurtje = '#FF760C'
}
else if ($datapoint["avg_Ernst"] <= 3) {
    kleurtje = '#FCA210'
}
else if ($datapoint["avg_Ernst"] <= 4) {
    kleurtje = '#FCC813'
}
else if ($datapoint["avg_Ernst"] <= 5) {
    kleurtje = '#F7EE1E'
}
else if ($datapoint["avg_Ernst"] <= 6) {
    kleurtje = '#D8F01D'
}
else if ($datapoint["avg_Ernst"] <= 7) {
    kleurtje = '#A4D016'
}
else if ($datapoint["avg_Ernst"] <= 8) {
    kleurtje = '#6FB113'
}
else if ($datapoint["avg_Ernst"] <= 9) {
    kleurtje = '#33910D'
}
else if ($datapoint["avg_Ernst"] <= 10) {
    kleurtje = '#007206'
}

//return all values 
return {
    //textColor:'',
    backgroundColor:kleurtje,
    topText: 'Gemiddeld oordeel',
    //topTextColor: '',
    //topTextOutlineColor: '',
    topTextMaxSize: 'medium',
    middleText: Round($datapoint["avg_Ernst"],1),
    middleTextColor: '',
    middleTextOutlineColor: '',
    middleTextMaxSize: 'large',
    //bottomText: '',
    //bottomTextColor: '',
    //bottomTextOutlineColor: '',
    //bottomTextMaxSize: 'medium',
    //iconName:'',
    //iconAlign:'left',
    //iconColor:'',
    //iconOutlineColor:'',
    //noValue:false,
    //attributes: {
      // attribute1: '',
      // attribute2: ''
    // }
  }
