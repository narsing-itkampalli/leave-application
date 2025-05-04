(() => {
    const approvalForm = document.getElementById('approvalForm');
    const errorMessage = document.querySelector('#approval-error-message');

    function validateForm(event) {
        event.preventDefault();
        errorMessage.innerText = '';
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="date"], input[type="number"]');
        let filled = false;
        inputs.forEach(input => {
            if (input.value.trim() !== '') filled = true;
        });
        if (!filled) {
            alert("Fill the form\nThank you SIR/MAM");
            return false;
        }

        const data = formDataToJson(new FormData(approvalForm));

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
    }

    approvalForm.addEventListener('submit', validateForm);
})();