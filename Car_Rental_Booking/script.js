// Script for displaying car price in modal
const modal = document.getElementById('offerModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; 
    const price = button.getAttribute('data-price'); 
    const modalBody = modal.querySelector('.modal-body #carPrice');
    modalBody.textContent = price; 
});
    