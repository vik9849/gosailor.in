
const BLOGS = [
{
title:'Ultimate Dubai Travel Guide',
link:'/blog/dubai-travel-guide.html'
},
{
title:'Best Boutique Hotels in Goa',
link:'/blog/goa-hotels.html'
},
{
title:'Cheap Flights from Hyderabad',
link:'/blog/cheap-flights-hyderabad.html'
}
];

const blogGrid = document.getElementById('blog-grid');

if(blogGrid){

blogGrid.innerHTML = BLOGS.map(blog => `
<div class="blog-card">
<h3>${blog.title}</h3>
<a href="${blog.link}">Read article</a>
</div>
`).join('');

}
