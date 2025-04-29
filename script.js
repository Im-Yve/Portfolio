//Preloader Script
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.display = "none";
    }, 1000);
});

//Contact Form Script
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const loadingIndicator = submitBtn.querySelector('.loading');
    const buttonText = submitBtn.querySelector('span');

    buttonText.classList.add('d-none');
    loadingIndicator.classList.remove('d-none');
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                form.reset();
            } else {
                result.innerHTML = '<div class="alert alert-danger">Something went wrong! Please try again.</div>';
            }
        })
        .catch(error => {
            result.innerHTML = '<div class="alert alert-danger">Something went wrong! Please try again.</div>';
        })
        .finally(() => {
            buttonText.classList.remove('d-none');
            loadingIndicator.classList.add('d-none');
            submitBtn.disabled = false;
        });
});