// to delete the listings

const form = document.getElementById("delete-listing");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        Swal.fire({
            title: `<p class="fs-6 fw-bold text-black">Are you absolutely sure?</p>`,
            html: `<p class="fs-s">This action cannot be undone. This will permanently delete <strong class="fw-bold text-dark">${form.dataset.title}</strong> and all of its associated data and reviews.</p>`,
            iconHtml: `<div class="rounded-5 d-flex items-center justify-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fb2c36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2 w-8 h-8 mx-auto"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></div>`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: "#e7000b",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "<b>Yes, Delete</b>",
            reverseButtons: true,
            customClass: {
                icon: 'border-0 bg-red-50',
                popup: 'rounded-4 ',
                cancelButton: 'btn btn-outline-secondary rounded-4 px-5 py-3 swal-btn',
                confirmButton: 'rounded-4 px-5 py-3 swal-btn'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        });
    });
}
