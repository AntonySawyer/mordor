export default function findIds() {
  const ids = [];
  const activeCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked:not(#mainCheckbox)'
  );
  activeCheckboxes.forEach(el => ids.push(el.value.split('_').pop()));
  return ids;
}