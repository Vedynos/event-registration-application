document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('btn-register');
    const modal = document.getElementById('register-modal');
    const closeModalBtn = document.getElementById('close-modal');

    const form = document.getElementById('register-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const feedbackBox = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        nameInput.classList.remove('input-invalid');
        emailInput.classList.remove('input-invalid');
        feedbackBox.className = 'feedback-box hidden';
        feedbackBox.textContent = '';
    }

    function showFeedback(message, type) {
        feedbackBox.textContent = message;
        feedbackBox.className = `feedback-box ${type}`;
    }

    // Abrir modal e bloquear o fundo
    if (registerButton && modal) {
        registerButton.addEventListener('click', () => {
            clearErrors();
            modal.showModal();
        });
    }

    // Fechar no botão "X"
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Fechar ao clicar fora da janela (no fundo escuro)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }

    // Validação e envio do formulário
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearErrors();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            let isValid = true;

            if (!name) {
                nameError.textContent = 'Por favor, introduza o seu nome completo.';
                nameInput.classList.add('input-invalid');
                isValid = false;
            }

            if (!email) {
                emailError.textContent = 'Por favor, introduza o seu endereço de email.';
                emailInput.classList.add('input-invalid');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'O formato do email é inválido (ex: nome@dominio.pt).';
                emailInput.classList.add('input-invalid');
                isValid = false;
            }

            if (!isValid) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'A processar...';

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email })
                });

                const data = await response.json();

                if (!response.ok) {
                    showFeedback(data.error || 'Erro ao efetuar o registo.', 'error');
                    return;
                }

                if (data.checkoutUrl) {
                    window.location.href = data.checkoutUrl;
                    return;
                }

                showFeedback('Registo guardado com sucesso!', 'success');
                form.reset();

            } catch (error) {
                console.error('Erro de ligação:', error);
                showFeedback('Não foi possível ligar ao servidor. Verifica se o backend está a correr.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Registar e Avançar para Pagamento';
            }
        });
    }
});