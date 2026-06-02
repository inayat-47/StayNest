
// To add the new review

const addReviewBtn = document.querySelectorAll(".add-review");
addReviewBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        Swal.fire({
            title: `<h5 class="fw-bold text-black text-start mb-4">Add Review</h5></br><p class="fs-6 fw-bold text-black text-start">${"your rating".toUpperCase()}</p>`,
            html: `<form method="post" action="/listings/${btn.dataset.listing}/reviews" novalidate class="needs-validation">
                        <div class="mb-3">
                            <fieldset class="starability-slot">
                                <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." />
                                <input type="radio" id="first-rate1" name="rating" value="1" />
                                <label for="first-rate1" title="Terrible">1 star</label>
                                <input type="radio" id="first-rate2" name="rating" value="2" />
                                <label for="first-rate2" title="Not good">2 stars</label>
                                <input type="radio" id="first-rate3" name="rating" value="3" />
                                <label for="first-rate3" title="Average">3 stars</label>
                                <input type="radio" id="first-rate4" name="rating" value="4" />
                                <label for="first-rate4" title="Very good">4 stars</label>
                                <input type="radio" id="first-rate5" name="rating" value="5" />
                                <label for="first-rate5" title="Amazing">5 stars</label>
                            </fieldset>
                        </div>
                        <div class="mb-3">
                            <p for="comment" class="fs-6 fw-bold text-black text-start">${"your experience".toUpperCase()}</p>
                            <textarea class="form-control" name="comment" id="comment" rows="2" placeholder="Give your experience"
                                required></textarea>
                            <div class="invalid-feedback">*Cannot Submit Empty</div>
                        </div>
                        <button class="btn btn-dark form-btn rounded-4 px-5 py-3 w-100">Add review</button>
                    </form>`,

            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            reverseButtons: true,
            didOpen: () => {
                const form = Swal.getPopup().querySelector('form');

                form.addEventListener('submit', (event) => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                });
            },
            customClass: {
                popup: 'rounded-4 ',
                cancelButton: 'btn btn-outline-secondary w-100 rounded-4 px-5 py-3',
            },
            buttonsStyling: false,
        });
    });
});