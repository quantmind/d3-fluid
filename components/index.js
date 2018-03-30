export {version as viewFluidVersion} from '../package.json';
export {default as viewActive} from './active/index';
export {default as viewAlert} from './alert/index';
export {default as viewAutocomplete} from './autocomplete/index';
export {default as viewCard} from './card/index';
export {default as viewCollapse} from './collapse/index';
export {default as viewFlatpickr} from './flatpickr/index';
export {default as viewIcons} from './icons/index';
export {default as viewMarked} from './markdown/index';
export {default as viewModal} from './modal/index';
export {default as viewSidebar} from './sidebar/index';
export {default as viewTabs} from './tabs/index';
export {default as viewRouter} from './router/index';

import 'd3-transition';
import Handlebars from 'handlebars';
import {viewProviders} from 'd3-view';

viewProviders.compileTemplate = Handlebars.compile;
