'use strict'

const teamContainer = document.querySelector('.team__slider')
const teamSliderContainer = teamContainer.querySelector('.team__slider-list')
const teamSlider = teamContainer.querySelectorAll('.team__slider-item')
const pagination = teamContainer.querySelector('.team__pagination')
const teamSliderWidth = teamContainer.getBoundingClientRect()

/* tabs */
const tabsContainer = document.querySelector('.examples__work')
const tabsElements = document.querySelector('.examples__tabs')
const tabs = tabsElements.querySelector('.examples__tabs-list')
const tab = Array.from(tabs.querySelectorAll('.examples__tabs-item'))
const sliderTab = Array.from(tabsContainer.querySelectorAll('.examples__slider'))

let currentSlider = null

for (let i = 0; i < teamSlider.length; i++) {
	const button = document.createElement('button')
	button.classList.add('team__pagination-button')
	pagination.append(button)
}

const btn = Array.from(pagination.querySelectorAll('.team__pagination-button'))
btn[0].classList.add('active')

btn.forEach((button) => {
	button.addEventListener('click', (event) => {
		const targetBtn = event.target
		const activeIndexBtn = btn.findIndex((button) => button === targetBtn)
		const activeBtnElement = btn.find((button) => button.classList.contains('active'))
		const distanceSlide = teamSliderWidth.width * activeIndexBtn

		if (btn[activeIndexBtn] && activeBtnElement) {
			activeBtnElement.classList.remove('active')
			btn[activeIndexBtn].classList.add('active')
		}
		teamSliderContainer.style.transform = `translate3d(-${distanceSlide}px, 0px, 0px)`
	})
})

function initSlider(sliderContainer) {
	const thumbsContainer = sliderContainer.querySelector('.examples__slider-thumbs')
	const mainContainer = sliderContainer.querySelector('.examples__slider-main')
	const thumbs = Array.from(sliderContainer.querySelectorAll('.examples__slider-thumb'))
	const track = sliderContainer.querySelector('.examples__slider-track')
	const mainContainerRect = mainContainer.getBoundingClientRect()

	if (!thumbs.length || !track || !thumbsContainer) return

	thumbs.forEach((thumb) => thumb.classList.remove('active'))
	thumbs[0].classList.add('active')
	track.style.transform = `translate3d(0px, 0px, 0px)`

	const clickHandler = (event) => {
		const target = event.target

		if (!target.classList.contains('examples__slider-thumb')) return

		const activeIndex = thumbs.findIndex((item) => item === target)
		const activeElement = thumbs.find((item) => item.classList.contains('active'))

		if (thumbs[activeIndex] && activeElement) {
			activeElement.classList.remove('active')
			thumbs[activeIndex].classList.add('active')
			const distance = mainContainerRect.width * activeIndex
			track.style.transform = `translate3d(-${distance}px, 0px, 0px)`
		}
	}

	thumbsContainer.addEventListener('click', clickHandler)
	sliderContainer._thumbsClickHandler = clickHandler
}

function setActiveTab(event) {
	const targetTab = event.target
	const activeTabIndex = tab.findIndex((t) => t === targetTab)
	const activeTabElement = tab.find((t) => t.classList.contains('active'))

	if (activeTabIndex === -1) return

	if (tab[activeTabIndex] && activeTabElement) {
		activeTabElement.classList.remove('active')
		tab[activeTabIndex].classList.add('active')
	}

	setActiveSlider(activeTabIndex)
}

function setActiveSlider(index) {
	sliderTab.forEach((item, i) => {
		if (item._thumbsClickHandler) {
			const thumbsContainer = item.querySelector('.examples__slider-thumbs')
			thumbsContainer?.removeEventListener('click', item._thumbsClickHandler)
			delete item._thumbsClickHandler
		}
		item.classList.toggle('active', i === index)
	})

	const newSlider = sliderTab[index]
	if (newSlider && newSlider !== currentSlider) {
		currentSlider = newSlider
		initSlider(currentSlider)
	}
}

tab[0].classList.add('active')
tabsElements.addEventListener('click', setActiveTab)
setActiveSlider(0)
