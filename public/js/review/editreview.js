let btns = document.querySelectorAll("#edit-review");
btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        Swal.fire({
            title: `<h5 class="fw-bold text-black text-start mb-4">Edit Review</h5></br><p class="fs-6 fw-bold text-black text-start">${"your rating".toUpperCase()}</p>`,

            html: `<form method="post" action="/listings/${btn.dataset.listing}/reviews/${btn.dataset.review}?_method=PUT" novalidate
                    class="needs-validation">
                    <div class="mb-3">
                        <fieldset class="starability-slot">
                            <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0"
                                ${btn.dataset.rating == 0 ? 'checked' : ''} aria-label="No rating" />
                            <input type="radio" id="first-rate1" name="rating" value="1" ${btn.dataset.rating == 1
                    ? 'checked' : ''} />
                            <label for="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="rating" value="2" ${btn.dataset.rating == 2
                    ? 'checked' : ''} />
                            <label for="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="rating" value="3" ${btn.dataset.rating == 3
                    ? 'checked' : ''} />
                            <label for="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="rating" value="4" ${btn.dataset.rating == 4
                    ? 'checked' : ''} />
                            <label for="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="rating" value="5" ${btn.dataset.rating == 5
                    ? 'checked' : ''} />
                            <label for="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                    </div>
                    <div class="mb-3">
                        <p for="comment" class="form-label text-black fw-bold fs-6 text-start">${"your experience".toUpperCase()}</p>
                        <textarea class="form-control" name="comment" id="comment" rows="2"
                            required>${btn.dataset.comment}</textarea>
                        <div class="invalid-feedback">*Cannot Submit Empty</div>
                    </div>
                    <button class="btn btn-dark form-btn mt-4 py-3 col-12 rounded-4">Update Review</button>
                </form>`,

            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: false,

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
                popup: 'rounded-4',
                cancelButton: 'btn btn-outline-secondary py-3 col-12 rounded-4',
            },
        })
    })
});