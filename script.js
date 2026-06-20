const departments = [
  { name: 'Pilot teams', value: 82 },
  { name: 'PMO', value: 74 },
  { name: 'Engineering', value: 63 },
  { name: 'Operations', value: 55 },
  { name: 'Legacy teams', value: 38 }
];

const tabCopy = {
  success: '<h3>Success factors</h3><p>Pilot-tested departments with structured support, engaged managers, and cleaner data achieved smoother integration, better AI recommendations, and measurable reporting-time gains.</p>',
  failure: '<h3>Failure points</h3><p>Incomplete data, algorithmic bias, inconsistent training, and weak communication caused some teams to distrust the platform and return to legacy tools.</p>',
  alternative: '<h3>Better approach</h3><p>A hybrid transition, agile implementation sprints, and department-specific diagnostics would have reduced disruption while preserving transparency and workflow fit.</p>'
};

function renderBars(data) {
  const chart = document.querySelector('#adoptionChart');
  chart.innerHTML = data.map(item => `
    <div class="bar">
      <strong>${item.name}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${item.value}%"></div></div>
      <span>${item.value}%</span>
    </div>`).join('');
}

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

document.querySelector('.nav-toggle').addEventListener('click', event => {
  const links = document.querySelector('#nav-links');
  const isOpen = links.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));

document.querySelector('[data-randomize]').addEventListener('click', () => {
  const shifted = departments.map(item => ({ ...item, value: Math.max(25, Math.min(92, item.value + Math.round(Math.random() * 18 - 7))) }));
  renderBars(shifted);
});

document.querySelector('#explainBtn').addEventListener('click', () => {
  document.querySelector('#aiExplain').textContent = 'Example: The AI flags a schedule risk because Engineering has 63% adoption, two missing dependency updates, and a resource load above the recommended threshold. A manager should validate the context before approving any resource shift.';
});

renderBars(departments);
setTab('success');
animateKpis();
