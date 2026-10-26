import{
    spinnerSearchEl,
    spinnerJobDetailsEl
} from './common.js';

const renderSpinner = whichSpinner =>{
    const spinnerEL = whichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEL.classList.toggle('spinner--visible')
}

export default renderSpinner;