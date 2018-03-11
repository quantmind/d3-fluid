import {easeExpOut} from 'd3-ease';
import {isString} from 'd3-let';

import tpl from './template.html';


const modalComponent = {
    props: {
        transitionDuration: 300
    },

    model: {
        modalTitle: "d3-view modal",
        modalBody: '',
        modalDisabled: false,
        modalActions: [
            {
                label: "Close"
            }
        ],
        showModal: false,
        $showModal () {
            this.showModal = true;
        },
        $hideModal () {
            this.showModal = false;
        },
        $actionClass (action) {
            return action.level ? `btn-${action.level}` : 'btn-secondary';
        },
        $action (action) {
            if (action.$action) action.$action();
            else this.$hideModal();
        },
        $actionLabel (action) {
            var html = action.icon ? `<i class='${action.icon}'></i> ` : '';
            return `${html}${action.label}`;
        }
    },

    render: function (props) {
        return this.viewElement(tpl, props);
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


// function for opening a modal
// inject this method to the root model
const modalOpen = (vm) => {

    return options => {
        if (isString(options)) options = optionsFromTarget(vm, options);
        var modal = vm.select('#d3-view-modal');
        if (!modal.size())
            vm.select('body').append('modal').mount(options).then(cm => cm.model.$showModal());
        else
            modal.model().$update(options).$showModal();
    };
};


const viewModal = {
    modalComponent,
    modalDirective,
    modalOpen,

    install (vm) {
        vm.addComponent('modal', viewModal.modalComponent);
        vm.addDirective('modal', viewModal.modalDirective);
        vm.model.$openModal = viewModal.modalOpen;
    }
};


export default viewModal;


const optionsFromTarget = (vm, selector) => {
    var sel = vm.select(selector);
    if (sel.size() === 1) {
        return {
            modalTitle: textFromTarget(sel.select('modal-title')),
            modalBody: textFromTarget(sel.select('modal-body'))
        };
    } else {
        vm.logWarn(`Could not obtain target from selector "${selector}"`);
        return {};
    }
};

const textFromTarget = sel => sel.size() ? sel.html() : '';
