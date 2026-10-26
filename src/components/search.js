import {
    jobListSearchEl,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    numberEl
} from '../components/common.js'

import renderError from './error.js'
import renderSpinner from './spinner.js';


const submitHandler = event => {
    event.preventDefault();
    const exist = searchInputEl.value;
    const check = /[0-9]/;

    const patternmatch = check.test(exist)
    if (patternmatch) {
        renderError('your search may not contain number')

        return;
    }
    searchInputEl.blur();
    // spinnerSearchEl.classList.add('spinner--visible')
    renderSpinner('search');
    fetch('src/data.json')
        .then(res => {
            if (!res.ok) {
                console.log('something went wrong');

            }
            return res.json();
        })
        .then(data => {
            const jobItems = data.jobItems;
            const filterJob = jobItems.filter(item =>
                item.title.toLowerCase().includes(exist.toLowerCase())
            );

            const htmlList = filterJob.map(job => `
<li class="job-item">
    <a class="job-item__link" href="${job.id}">
        <div class="job-item__badge">${job.badgeLetters}</div>
        <div class="job-item__middle">
            <h3 class="third-heading">${job.title}</h3>
            <p class="job-item__company">${job.company}</p>
            <div class="job-item__extras">
    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${job.duration}</p>
    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${job.salary}</p>
    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${job.location}</p>
</div>
        </div>
        <div class="job-item__right">
            <p class="job-item__time">${job.daysAgo}d</p>
        </div>
    </a>
</li>`);

            jobListSearchEl.innerHTML = '';
            jobListSearchEl.insertAdjacentHTML('beforeend', htmlList.join(''));

            spinnerSearchEl.classList.remove('spinner--visible');
            numberEl.textContent = filterJob.length;
        })

        .catch(error => {
            console.log(error);
            spinnerSearchEl.classList.remove('spinner--visible')
        })
}
searchFormEl.addEventListener('submit', submitHandler);