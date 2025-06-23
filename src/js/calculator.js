const checkboxWrapper = document.querySelector('.hero__view')
const repairTypeWrapper = document.querySelector('.hero__view-flexbox')
const properTypeWrapper = document.querySelector('.hero__view-realty')
const roomsQuantityWrapper = document.querySelector('.hero__view-rooms')
const discountElement = document.querySelector('.price')
const discountText = Number(discountElement.textContent.replace(/[^\d.-]/g, ''))
const range = document.getElementById('range')
const output = document.querySelector('.output')

function CalculatorClear() {
	repairTypeWrapper.innerHTML = ''
	properTypeWrapper.innerHTML = ''
	roomsQuantityWrapper.innerHTML = ''
}
CalculatorClear()

function renderInput() {
	let index = 0

	Object.entries(settings.repairType).forEach((item) => {
		index++
		const [name, cost] = item
		const input = document.createElement('input')
		const label = document.createElement('label')

		input.type = 'radio'
		input.name = 'property'
		input.setAttribute('id', `${index}`)
		input.dataset.cost = `${cost}`

		label.classList.add('hero__view-checkbox')
		label.classList.add('checkbox-item')
		label.setAttribute('for', `${index}`)
		label.textContent = `${name}`

		repairTypeWrapper.append(input, label)
	})

	Object.entries(settings.propertyType).forEach((item) => {
		index++
		const [name, multiplier] = item
		const input = document.createElement('input')
		const label = document.createElement('label')

		input.type = 'radio'
		input.name = 'repair'
		input.setAttribute('id', `${index}`)
		input.dataset.multiplier = `${multiplier}`

		label.classList.add('hero__view-checkbox')
		label.classList.add('checkbox-item')
		label.setAttribute('for', `${index}`)
		label.textContent = `${name}`

		properTypeWrapper.append(input, label)
	})

	Object.entries(settings.roomsQuantity).forEach((item) => {
		index++
		const [quantity, area] = item
		const areaMin = area[0]
		const areaMax = area[1]

		const input = document.createElement('input')
		const label = document.createElement('label')

		input.type = 'radio'
		input.name = 'quantity'
		input.setAttribute('id', `${index}`)
		input.dataset.areaMin = `${areaMin}`
		input.dataset.areaMax = `${areaMax}`

		label.classList.add('hero__view-checkbox')
		label.classList.add('checkbox-block')
		label.setAttribute('for', `${index}`)
		label.textContent = `${quantity}`

		roomsQuantityWrapper.append(input, label)
	})

	repairTypeWrapper.querySelector('input[name="property"]').checked = true
	properTypeWrapper.querySelector('input[name="repair"]').checked = true
	roomsQuantityWrapper.querySelector('input[name="quantity"]').checked = true
}
renderInput()

checkboxWrapper.addEventListener('change', function (e) {
	if (e.target.name === 'quantity') {
		const selectedQuantity = roomsQuantityWrapper.querySelector('input[name="quantity"]:checked')
		const quantityMin = Number(selectedQuantity.dataset.areaMin)
		const quantityMax = Number(selectedQuantity.dataset.areaMax)

		range.setAttribute('min', quantityMin)
		range.setAttribute('max', quantityMax)

		range.value = quantityMin
		output.textContent = range.value
		range.style.backgroundSize = `0% 100%`
	}

	calculator()
})

range.addEventListener('input', function () {
	const value = this.valueAsNumber
	const percent = (Number(this.max) - Number(this.min)) / 100
	const distance = (value - Number(this.min)) / percent

	output.textContent = value
	range.style.backgroundSize = `${distance}% 100%`

	calculator()
})

function animateValue(element, start, end, duration) {
	const range = end - start
	const minTimer = 50
	const stepTime = Math.max(duration / range, minTimer)

	let startTime = null

	function step(timestamp) {
		if (!startTime) startTime = timestamp
		const progress = timestamp - startTime
		const percent = Math.min(progress / duration, 1)
		const value = Math.floor(start + range * percent)

		element.textContent = value.toLocaleString()

		if (percent < 1) {
			requestAnimationFrame(step)
		}
	}

	requestAnimationFrame(step)
}

function calculator() {
	const selectedRepair = repairTypeWrapper.querySelector('input[name="property"]:checked')
	const selectedProperty = properTypeWrapper.querySelector('input[name="repair"]:checked')

	const repairCost = Number(selectedRepair.dataset.cost)
	const propertyMultiplier = Number(selectedProperty.dataset.multiplier)
	const area = Number(range.value)

	const totalPrice = repairCost + propertyMultiplier * area

	const currentPrice = Number(discountElement.textContent.replace(/[^\d.-]/g, '')) || 0

	animateValue(discountElement, currentPrice, totalPrice, 1000)
}
