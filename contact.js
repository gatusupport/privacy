'use strict';

const email = document.getElementById('support-email');
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email.textContent.trim());
    copyStatus.textContent = 'E-mail copiado. Cole no serviço de e-mail que você usa.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(email);
    selection.removeAllRanges();
    selection.addRange(range);
    email.focus({ preventScroll: true });
    copyStatus.textContent = 'Copie o endereço selecionado ou use a opção do Gmail abaixo.';
  }
});

const printButton = document.querySelector('.print-button');
printButton.hidden = false;
printButton.addEventListener('click', () => window.print());
const index = document.querySelector('.policy-index');
const mobile = window.matchMedia('(max-width: 720px)');
const setIndexForScreen = () => { index.open = !mobile.matches; };
setIndexForScreen();
mobile.addEventListener('change', setIndexForScreen);
const sectionLinks = Array.from(index.querySelectorAll('a'));
const sections = Array.from(document.querySelectorAll('.policy-section'));
if ('IntersectionObserver' in window) {
  const visibleSections = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    }
    const current = sections.find(section => visibleSections.has(section));
    for (const link of sectionLinks) {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-100px 0px -55% 0px' });
  for (const section of sections) observer.observe(section);
}
