
const TABS = [
'flights',
'hotels',
'cars',
'activities',
'cruises',
'blog'
];

function switchTab(tab){

TABS.forEach(t => {

const section = document.getElementById(`section-${t}`);
const button = document.getElementById(`tab-${t}`);

if(section){
section.classList.toggle('active', t === tab);
}

if(button){
button.classList.toggle('active', t === tab);
}

});

if(tab === 'hotels'){
focusHotelSearch();
}

loadWidgets(tab);
}

function focusHotelSearch(){

const widget = document.getElementById('tpwl-search');

if(widget){
widget.scrollIntoView({
behavior:'smooth',
block:'start'
});
}

setTimeout(() => {

const hotelButton = [...document.querySelectorAll('button,div,a')]
.find(el =>
el.textContent &&
el.textContent.toLowerCase().includes('hotel')
);

if(hotelButton){
hotelButton.click();
}

}, 1000);
}
