import feather from './icons.json';


const icons = {
    //  map icon name to svg src
    //  by default use feather icons
    default: 'droplet',
    svg: feather,
    width: 24,
    height: 24,

    src (name) {
        return `https://unpkg.com/feather-icons/dist/icons/${name}.svg`;
    },

    install (vm) {
        vm.addComponent('icon', icon);
    }
};


//
//  Icon component
export const icon = {

    props: {
        width: null,
        height: null,
        name: null,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        linecup: "round",
        linejoin: "round",
        src: null
    },

    render () {
        const props = this.props;
        if (props.src)
            return this.createElement('img').attr('alt', props.name || '').attr('src', props.src);

        const width = props.width || icons.width,
            height = props.height || icons.height,
            name = props.name || icons.default;
        if (!name) return '<i/>';
        const svg = icons.svg[name];
        if (!svg) return '<i/>';
        return this.createElement('div')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('fill', props.fill)
            .attr('stroke', props.stroke)
            .attr('stroke-width', props.strokeWidth)
            .attr('stroke-linecup', props.linecup)
            .attr('stroke-linejoin', props.linejoin)
            .attr('version', '1.1')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .classed('view-icon', true)
            .html(svg);
    }
};


export default icons;
