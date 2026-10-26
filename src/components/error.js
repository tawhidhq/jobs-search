import {
    errorEl,
    errorTextEl,
    DISPLAY_TIME
} from './common.js'

const renderError = message => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible')
    }, DISPLAY_TIME)
}


export default renderError;