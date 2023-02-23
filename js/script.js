$(document).ready(function(){
	$('.catalogue__slider').slick({
		arrows:true,
		dots:true,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		speed:500,
		easing:'ease',
		infinite:true,
		initialSlide: 1,
		draggable: false,
		touchThreshold: 10,
		waitForAnimate: true,
		variableWidth: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 2
			}
		},{
			breakpoint: 420,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});

	

	const navButtons = document.querySelectorAll('.menu__option a');
	const aboutUsBlock = document.querySelector('.aboutus');
	const catalogueBlock = document.querySelector('.catalogue');
	const orderBlock = document.querySelector('.order');
	const bodyBlock = document.querySelector('body');
	navButtons[1].addEventListener("click", function (e) {
		catalogueBlock.scrollIntoView({
			block: "center",
			inline: "nearest",
			behavior: "smooth"
		});	
		e.preventDefault();
	});
	navButtons[2].addEventListener("click", function (e) {
		aboutUsBlock.scrollIntoView({
			block: "center",
			inline: "nearest",
			behavior: "smooth"
		});	
		e.preventDefault();
	});
	const orderButtons = document.querySelectorAll('.order_button');
	orderButtons.forEach(buttonItem => {
		buttonItem.addEventListener("click", function (e) {
			orderBlock.scrollIntoView({
				block: "end",
				inline: "nearest",
				behavior: "smooth"
			});
		});
	});
	const orderButtonPopUp = document.querySelector('.order_button_popup');
	const aboutTeaBlock = document.querySelector('.about-tea');
	const aboutTeaContainer = document.querySelector('.about-tea__container');
	orderButtonPopUp.addEventListener("click", function (e) {
		orderBlock.scrollIntoView({
				block: "end",
				inline: "nearest",
				behavior: "smooth"
		});
		turningOffPopUp();
		
	});
	//TODO filter
	const sliderButton = document.querySelectorAll('.slider__button button');
	const priceLabel = document.querySelector('.about-tea__price span');
	const sortLabel = document.querySelector('.about-tea__sort span');
	const imageLabel = document.querySelector('.about-tea__image img');
	sliderButton.forEach(buttonItem => {
		buttonItem.addEventListener("click", function (e) {
			const bodyNodes = buttonItem.parentNode.parentNode.childNodes;
			priceLabel.textContent = bodyNodes[5].textContent.slice(0, bodyNodes[5].textContent.indexOf('$')+1);
			sortLabel.textContent = bodyNodes[5].textContent.slice(bodyNodes[5].textContent.indexOf('$')+1);
			//console.log(bodyNodes[1].firstElementChild)
			imageLabel.src = bodyNodes[1].firstElementChild.src;


			aboutTeaBlock.classList.toggle('about-tea_active');
			aboutTeaBlock.style.cssText = `
			animation: toggle 0.5s;
			`;
			bodyBlock.classList.toggle('no-scroll');
		});
	});
	function turningOffPopUp() {
		aboutTeaBlock.style.cssText = `
		transition: 0.5s;
		opacity: 0;
		`;
		setTimeout(() => { aboutTeaBlock.classList.toggle('about-tea_active'); }, 1000); 
		bodyBlock.classList.toggle('no-scroll');			
	}
	document.addEventListener('keydown', function (e) {
		if(e.code == "Escape" && aboutTeaBlock.classList.contains('about-tea_active')){
			turningOffPopUp();
		}
	});
	aboutTeaBlock.addEventListener('click', function (e) {
		if(e.target==aboutTeaBlock){
			turningOffPopUp();			
		}
	});

	const filterButtonBlock = document.querySelector('.catalogue__filter');
	const filerSelectBlock = document.querySelector('.filter__select');
	var filtred = false;
	let filter_text = '.';
	$('.filter__button').on('click', function(){
		filterButtonBlock.classList.toggle('catalogue__filter_active');		
		filter_text = '.' + filerSelectBlock.options[filerSelectBlock.selectedIndex].value;
		if(filtred === false) {
			$('.catalogue__slider').slick('slickFilter', filter_text);
			filtred = true;
		} else {
			$('.catalogue__slider').slick('slickUnfilter');
			filtred = false;
		} 
		return false;
	});

	function closeMenu(e) {
		if(e.target!=document.querySelector('.menu__option') & e.target!=burgerButton){
			headerMenuBlock.classList.toggle('header__menu_burger-active');
			setTimeout(() => {
			if(!headerMenuBlock.classList.contains('header__menu_burger-active')){
				headerMenuBlock.style.display = 'none';
			}
		}, 500);
		}
			console.log(e.target);
	}

	const burgerButton = document.querySelector('.header__burger');
	const headerMenuBlock = document.querySelector('.header__menu');
	burgerButton.addEventListener("click", function(e){
		headerMenuBlock.classList.toggle('header__menu_burger-active');
		if(headerMenuBlock.classList.contains('header__menu_burger-active')){
			headerMenuBlock.style.display = 'block';
			bodyBlock.addEventListener("click", closeMenu);
		}else{
			bodyBlock.removeEventListener("click", closeMenu)
		}
		setTimeout(() => {
			if(!headerMenuBlock.classList.contains('header__menu_burger-active')){
				headerMenuBlock.style.display = 'none';
			}
		}, 500); 
	});
});