import {easeExpOut} from 'd3-ease';

import modalHeader from './header';
import modalBody from './body';
import modalFooter from './footer';


const ESCAPE_KEY = 27;


const modalComponent = {
    components: {
        modalHeader,
        modalBody,
        modalFooter
    },

    props: {
        transitionDuration: 300
    },

    model: {
        showModal: false,
        innerHtml: '',
        $showModal (innerHtml) {
            if (innerHtml) this.innerHtml = innerHtml;
            this.showModal = true;
        },
        $hideModal () {
            this.showModal = false;
        }
    },

    render () {
        var props = this.props;
        this.on(this.ownerDocument, 'keydown.modal', this.maybeHide.bind(this));
        return (`
            <div id="d3-view-modal">
                <div class="modal" tabindex="-1" role="dialog" d3-modal="showModal" data-transition-duration="${props.transitionDuration}">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" d3-html="innerHtml">
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop fade" d3-modal="showModal" data-transition-duration="${props.transitionDuration}"></div>
            </div>
        `);
    },

    maybeHide (e) {
        switch(e.keyCode) {
        case ESCAPE_KEY:
            this.model.$hideModal();
            break;
        default:
            break;
        }
    }
};


const modalDirective = {
    refresh (model, show) {
        if (!this.passes) return;
        var sel = this.sel,
            modal = sel.classed('modal');
        let height;
        if (show) {
            sel.style('display', 'block').classed('show', true);
            if (modal) {
                height = sel.style('height');
                sel.style('top', '-' + height);
                this.transition(sel).ease(easeExpOut).style('top', '0px');
            }
        }
        else {
            var op = sel.style('opacity'),
                t = this.transition(sel);
            sel.classed('show', false);
            if (modal) {
                height = sel.style('height');
                t.style('top', '-' + height).on('end', function () {
                    sel.style('display', 'none');
                });
            } else
                t.style('opacity', 0);
            t.on('end', function () {
                sel.style('display', 'none').style('opacity', op);
            });
        }
    }
};


const viewModal = {
    modalComponent,
    modalDirective,
    modalOpen (innerHtml) {
        const vm = this.$$view;
        const se = vm.select(innerHtml);
        if (se.size()) innerHtml = se.html();
        var modal = vm.select('#d3-view-modal');
        if (!modal.size())
            vm.sel.append('modal').mount().then(() => {
                vm.select('#d3-view-modal').model().$showModal(innerHtml);
            });
        else
            modal.model().$showModal(innerHtml);
    },

    install (vm) {
        vm.addComponent('modal', viewModal.modalComponent);
        vm.addDirective('modal', viewModal.modalDirective);
        vm.model.$openModal = viewModal.modalOpen;
    }
};


export default viewModal;
