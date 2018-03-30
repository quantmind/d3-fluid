export default {
    render (el) {
        return (`
            <div class="modal-body">
                ${el.innerHTML}
            </div>
        `);
    }
};
