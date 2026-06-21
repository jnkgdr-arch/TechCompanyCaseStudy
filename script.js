const tabCopy = {
  worked: ['Centralized portfolio visibility', 'Predictive scheduling and analytics', 'Faster reporting in integrated teams'],
  failed: ['Incomplete and inconsistent data', 'Uneven training and leadership support', 'Rigid department-level configurations'],
  better: ['Department-specific pilot testing', 'Agile implementation sprints', 'Stronger stakeholder engagement']
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
  document.querySelector('#tabContent').innerHTML = `<ul>${tabCopy[key].map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function closeAccordion(trigger) {
  trigger.setAttribute('aria-expanded', 'false');
  document.getElementById(trigger.getAttribute('aria-controls')).classList.remove('open');
}

function openAccordion(trigger) {
  const group = trigger.closest('[data-accordion-group]')?.dataset.accordionGroup;
  if (group) {
    document.querySelectorAll(`[data-accordion-group="${group}"] .accordion-trigger[aria-expanded="true"]`).forEach(openTrigger => {
      if (openTrigger !== trigger) closeAccordion(openTrigger);
    });
  }
  trigger.setAttribute('aria-expanded', 'true');
  document.getElementById(trigger.getAttribute('aria-controls')).classList.add('open');
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

document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeAccordion(trigger);
    else openAccordion(trigger);
  });
});

setTab('worked');
animateKpis();
