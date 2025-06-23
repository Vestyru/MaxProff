const modalContainer = document.querySelector('#headerModal')
const overlay = document.querySelector('.overlay')

function openModal() {
	modalContainer.classList.add('active')
	overlay.classList.add('active')
	document.body.style.overflow = 'hidden'
}

function closeModal() {
	modalContainer.classList.remove('active')
	overlay.classList.remove('active')
	document.body.style.overflow = ''
}
