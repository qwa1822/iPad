import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js'
//장바구니 !
const basketStarterEl=document.querySelector("header .basket-starter")
const basketEl=basketStarterEl.querySelector(".basket")









//장바구니 클릭시show클래스 있으면 삭제
//없으면 show추가 
basketStarterEl.addEventListener('click',function(event){
  event.stopPropagation(); //장바구니 클릭시 윈도우까지 전파되는것을
  //막아줌 
  if(basketEl.classList.contains('show')){  
    hideBasket();
  } //false && true
    else{
      showBasket();
    }
})
basketEl.addEventListener('click',function(event){
  event.stopPropagation();
})

//화면전체 클릭시
window.addEventListener('click',function(){
  basketEl.classList.remove('show');
})

function showBasket(){
  basketEl.classList.add('show');
}

function hideBasket(){
  basketEl.classList.remove('show');
}


//검색 !


const headerEl=document.querySelector("header");
const searchWrapEl=headerEl.querySelector('.search-wrap')
const serachStarterEl=headerEl.querySelector('.search-starter')


const headerMenuEl=[...headerEl.querySelectorAll('ul.menu>li')];


const searchCloseEl=searchWrapEl.querySelector(".search-closer");
const shadowEl=document.querySelector('.shadow');

const searchInputEl=searchWrapEl.querySelector('input');


const searchDelay=[...searchWrapEl.querySelectorAll('li')];
serachStarterEl.addEventListener('click',showSearch);

searchCloseEl.addEventListener('click',hideSearch);

shadowEl.addEventListener('click',hideSearch);


function showSearch(){
  headerEl.classList.add("searching");
  document.documentElement.classList.add('fixed');
 headerMenuEl.reverse().forEach(((el,idx)=>{
  el.style.transitionDelay=idx*.4/el.length+'s'
 }))

 searchDelay.forEach((el,idx)=>{
  el.style.transitionDelay=idx*.4/el.length+'s'
 })

 //인풋요소 클릭창활성화
 setTimeout(()=>{
  searchInputEl.focus();
 },600)
}

function hideSearch(){
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEl.reverse().forEach(((el,idx)=>{
    el.style.transitionDelay=idx*.4/el.length+'s'
   }))
   searchDelay.reverse().forEach((el,idx)=>{
    el.style.transitionDelay=idx*.4/el.length+'s'
   })


   searchDelay.reverse();


   searchInputEl.value="";


}


// 요소의 가시성 관찰
const io=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return;
    }
    entry.target.classList.add('show');
  })
})

const infoEls=document.querySelectorAll(".info");
infoEls.forEach(function(el){
  io.observe(el)
})


// 비디오 재생!
const video=document.querySelector('.stage video');
const playBtn=document.querySelector('.stage .contorller--play');
const PauseBtn=document.querySelector('.stage .contorller--puase');


playBtn.addEventListener('click',function(){
  video.play();
  playBtn.classList.add('hide');
  PauseBtn.classList.remove('hide');
})

PauseBtn.addEventListener('click',function(){
  video.pause();
  playBtn.classList.remove('hide');
  PauseBtn.classList.add('hide');
})


const itemEL=document.querySelector('section.compare .items');


ipads.forEach((el)=>{
  const itemEl=document.createElement('div');
  itemEl.classList.add('item');


  let colorList='';

  el.colors.forEach((color)=>{
    colorList+=`<li style="background-color:${color};"></li>`
  })

  itemEl.innerHTML=/*html */`
  <div class="thumbnail">
    <img src="${el.thumbnail}" alt="${el.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
    
  </ul>
  <h3 class="name">${el.name}</h3>
  <p class="tagline">${el.tagline}</p>
  <p class="price">${el.price}</p>
  <button class="btn">구입하기</button>
  <a href="${el.url}" class="link">더 알아보기</a>
  
  
  `

  itemEL.append(itemEl)
})


const navigationsEl=document.querySelector('footer .navigations');

navigations.forEach((el)=>{
  const mapEl=document.createElement('div');
  mapEl.classList.add('map');

  let mapList=``;
  el.maps.forEach((map)=>{
    mapList+=
    /*html*/ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML=/*html*/`
  <h3>
    <span class="text">${el.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `


navigationsEl.append(mapEl);
})

const thisYearel=document.querySelector('.this-year');
thisYearel.textContent=new Date().getFullYear();