import {
    jobListSearchEl,
    jobDetailsContentEl,
} from '../components/common.js'
import renderSpinner from './spinner.js';


const clickHandler = event => {
    event.preventDefault();
    const jobItemEl = event.target.closest('.job-item');
    if (!jobItemEl) return;

    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEl.classList.add('job-item--active');

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('job-details')

    const jobId = jobItemEl.children[0].getAttribute('href');

    fetch('src/data.json')
        .then(res => res.json())
        .then(data => {
            const job = data.jobItems.find(item => String(item.id) === jobId);
            if (!job) {
                renderSpinner('job-details')

                return;
            }

            const qualificationsHtml = job.qualifications
                .map(q => `<li class="qualifications__item">${q}</li>`)
                .join('');

            const reviewsHtml = job.reviews
                .map(r => `<li class="reviews__item">${r}</li>`)
                .join('');

            const detail = `
<img src="img/Pasted image.png " alt="#" class="job-details__cover-img">
<a class="apply-btn" href="${job.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>
<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${job.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${job.daysAgo}d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${job.title}</h2>
        <p class="job-info__company">${job.company}</p>
        <p class="job-info__description">${job.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${job.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${job.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${job.location}</p>
        </div>
    </div>
</section>
<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">${qualificationsHtml}</ul>
    </section>
    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">${reviewsHtml}</ul>
    </section>
</div>
<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>`;

            renderSpinner('job-details')

            jobDetailsContentEl.innerHTML = detail;
        })
        .catch(error => {
            console.log(error);
            renderSpinner('job-details')

        });
};
jobListSearchEl.addEventListener('click', clickHandler);