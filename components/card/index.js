export default {
    props: {
        title: '',
        titleTag: 'h5',
        image: null,
        imageHeight: null
    },

    render (props, attrs, el) {
        var sel = this.select(el),
            body = sel.text(),
            card = this.createElement('div').classed('card', true);

        if (body) body = `<p>${body}</p>`;
        else body = sel.html();

        if (props.image) {
            const img = card.append('img')
                .classed("card-img-top", true)
                .attr("src", props.image)
                .attr("alt", props.imageAlt || props.title);
            if (props.imageHeight) img.attr("height", props.imageHeight);
        }
        const main = card.append('div').classed("card-body", true);
        if (props.title) body.append(props.titleTag).classed("card-title", true).text(props.title);
        main.append('div').html(body);
        return card;
    }
};
