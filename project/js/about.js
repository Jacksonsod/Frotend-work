document.addEventListener('DOMContentLoaded', function () {
    const faqDetails = document.querySelectorAll('.faq details');

    faqDetails.forEach((detail) => {
        const icon = detail.querySelector('.faq-icon');

        detail.addEventListener('toggle', () => {
            // Close all other details
            faqDetails.forEach((otherDetail) => {
                if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                    otherDetail.removeAttribute('open');
                    otherDetail.querySelector('.faq-icon').textContent = '▶';
                }
            });

            // Toggle the current detail's icon
            if (detail.hasAttribute('open')) {
                icon.textContent = '▼';
            } else {
                icon.textContent = '▶';
            }
        });
    });
});