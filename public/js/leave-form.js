(() => {
    const leaveForm = document.getElementById('leaveForm');
    const errorMessage = document.querySelector('#leaveform-error-message');

    leaveForm.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.innerText = '';
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error-red)';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert("Please fill all required fields marked with *");
            return false;
        }

        const data = formDataToJson(new FormData(leaveForm));

        fetch(location.href, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            if(!data.ok) {
                errorMessage.innerText = data.message;
            }else {
                location.href = '/';
            }
        })
    });
})();