
const widgetState = {
cars:false,
activities:false,
cruises:false
};

function loadScript(src, containerId){

const container = document.getElementById(containerId);

if(!container){
return;
}

container.innerHTML = '';

const script = document.createElement('script');
script.src = src;
script.async = true;
script.charset = 'utf-8';

container.appendChild(script);
}

function loadWidgets(tab){

if(tab === 'cars' && !widgetState.cars){

loadScript(
'https://tpwgts.com/content?trs=520977&shmarker=719723&locale=en&country=153&city=68511&powered_by=true&campaign_id=87&promo_id=2466',
'cars-widget'
);

widgetState.cars = true;
}

if(tab === 'activities' && !widgetState.activities){

loadScript(
'https://tpwgts.com/content?trs=520977&shmarker=719723&powered_by=true&campaign_id=108&promo_id=8412',
'activities-widget'
);

widgetState.activities = true;
}

if(tab === 'cruises' && !widgetState.cruises){

loadScript(
'https://tpwgts.com/content?currency=usd&trs=520977&shmarker=719723&powered_by=true&locale=en&lowest_price=&highest_price=&min_lines=5&color_button=%230071c2&promo_id=5850&campaign_id=47',
'cruises-widget'
);

widgetState.cruises = true;
}
}
