const tabCopy = {
  strengths: '<h3>What the platform improved</h3><p>The centralized AI project and portfolio management platform replaced spreadsheets, Microsoft Project files, and legacy PPM tools. It improved visibility, reduced duplicated administrative work, and introduced predictive scheduling, resource optimization, AI analytics, natural-language reporting, anomaly detection, and trend analysis.</p>',
  weaknesses: '<h3>Why adoption was mixed</h3><p>Weak governance, incomplete inputs, rigid configuration, limited department-manager engagement, uneven training, inconsistent executive reporting, and manual-workflow resistance reduced trust and prevented organization-wide value.</p>',
  recommendations: '<h3>Recommended implementation approach</h3><p>Global Tech should have used a hybrid implementation approach, department-specific pilots, iterative agile-style sprints, stronger stakeholder engagement, more consistent leadership involvement, and role-based training and support.</p>'
};

function animateKpis() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.dataset.count);
    let current = 0;
    const suffix = el.textContent.includes('mo') ? ' mo' : '%';
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = `${current}${suffix}`;
      if (current === target) clearInterval(timer);
    }, 35);
  });
}

function setTab(key) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === key));
  document.querySelector('#tabContent').innerHTML = tabCopy[key];
}

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#nav-links');
toggle.addEventListener('click', event => {
  const isOpen = links.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(isOpen));
});

links.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));

document.querySelector('#explainBtn').addEventListener('click', () => {
  document.querySelector('#aiExplain').textContent = 'Before acting, the dashboard should explain why the recommendation was made, which data was used, which assumptions were made, whether data is missing, how reliable the recommendation is, and whether managerial review is required.';
});

setTab('strengths');
animateKpis();
