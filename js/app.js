/**
 * Define Global Variables
 * 
*/

let sections=document.querySelectorAll('section');
let header=document.querySelector("header");
let navList=document.querySelector('#nav-list');
let slidUpBtn=document.querySelector("#slide-up");
let imgs=document.querySelectorAll("#Work .imgContainer img");
let imgSlider=document.getElementById("img-slider");
let closeBtn=document.getElementById("close-btn");
let nextBtn=document.getElementById("next-btn");
let prevBtn=document.getElementById("prev-btn");
let imgShown=document.getElementById("img-shown");
let currentImgIndex,isScrolling;


// initialize two empty arrays for id and data attr of sections
let idArray=[];
let dataNavArray=[];
let imgSrcArray=[];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// cal offset top of sections
function calcOffsetTop(section){
  return document.querySelector(section).offsetTop;
}
// get index of current img
function getImgIndex(src){
  let index=imgSrcArray.indexOf(`${src}`);
  return index;
}
// show img in img slider
function showImg(src){
  imgShown.innerHTML= `<img src="${src}" class="h-100"  alt="">`;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

// get id and data attr of each section
for(section of sections){
   if(section.getAttribute('id')!=null && section.getAttribute('data-nav')!=null){
    idArray.push(section.getAttribute('id'));
    dataNavArray.push(section.getAttribute('data-nav'));
   }
}

// function to built nav bar links
(function(){
    let navItems='';
    
    for(let i=0; i<idArray.length;i++){
        navItems+=`
        <li class="nav-item ">
          <a id="${dataNavArray[i]}" class="nav-link" href="#${idArray[i]}">${idArray[i]}</a>
        </li>
        `;
    }
    navList.innerHTML=navItems;
    // The first link is set to active class 
    let home=document.getElementById("section1");
    home.classList.add('active-nav');
})();


// Scroll to anchor ID using scrollTO method
function scrollToSection(offsetTop){
  scrollTo({
    top: offsetTop,
    behavior: "smooth"
  });
}

// Add class 'active' to nav link of section when near top of viewport
let navlinks=document.querySelectorAll("#nav-list a");
function activeNav(index){
  navlinks.forEach(link => link.classList.remove('active-nav'));
  navlinks[index].classList.add('active-nav');      
}
// Add class 'active' to section when near top of viewport
function addActiveSection(index){
  sections.forEach(section => section.firstElementChild.classList.remove('active-section'));
  sections[index].firstElementChild.classList.add('active-section');      
}

// control of image slider
// get next image index 
function nextImg(){
  if(currentImgIndex==imgSrcArray.length-1){
    currentImgIndex=0;
  }
  else{
    currentImgIndex++;
  }
  showImg(imgSrcArray[currentImgIndex]);
}
// get previous image index
function prevImg(){
  if(currentImgIndex==0){
    currentImgIndex=imgSrcArray.length-1;
  }
  else{
    currentImgIndex--;
  }
  showImg(imgSrcArray[currentImgIndex]);
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
navList.addEventListener("click", (event)=> {
  event.preventDefault();
  let sectionId=event.target.getAttribute("href");
  const sectionOffsetTop= calcOffsetTop(sectionId);
  scrollToSection(sectionOffsetTop);
});

// on scroll of browser
// get offset top of first section
let firstOffsetTop=calcOffsetTop("#AboutUs");

window.addEventListener("scroll",()=>{
  let windowOffsetTop=window.scrollY;
  // change style of header
  if(windowOffsetTop>50){
    header.style.backgroundImage="linear-gradient(to bottom, rgba(228,129,125,1) 0%, rgba(255,175,75,1) 100%)";
  }else{
    header.style.backgroundImage="none";
    
  }
// show and hide scroll up btn
  if(windowOffsetTop>firstOffsetTop){
     slidUpBtn.style.display="block";
  }  else{
    slidUpBtn.style.display="none";
  }

  // detect which section near top view
  for(let index=0; index<idArray.length;index++){
    if(index==idArray.length-1){
      activeNav(index);
      addActiveSection(index);
    }
    else if( windowOffsetTop >= calcOffsetTop(`#${idArray[index]}`) && windowOffsetTop < calcOffsetTop(`#${idArray[index+1]}`)){
      activeNav(index);
      addActiveSection(index);
      break;
    }
  }

  // Clear our timeout throughout the scroll
  window.clearTimeout( isScrolling );
  header.style.display='block';
  

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
		// Run the callback
		header.style.display='none';

	}, 1000);
  

});

// Scroll to home on button click
slidUpBtn.addEventListener("click",()=>{
  scrollToSection("0");
});

// open img slider on click on image
for(img of imgs){
  img.addEventListener("click",(event)=>{
    let imgSrc=event.target.getAttribute("src");
    imgSlider.style.display="block";
    showImg(imgSrc);
    currentImgIndex =getImgIndex(imgSrc);
  });
  imgSrcArray.push(img.getAttribute("src"));
};

// close img slider on click
closeBtn.addEventListener("click",()=>{
  imgSlider.style.display="none";
});
// get next and prev img on click
nextBtn.addEventListener("click",nextImg);
prevBtn.addEventListener("click",prevImg);


