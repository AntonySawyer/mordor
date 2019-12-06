let checkAllState = false;

export const setIndeterminate = () => {
  if (checkAllState) {
    document.getElementById('mainCheckbox').indeterminate = true;
  }
};

export const checkAll = e => {
    checkAllState = e.target.checked;
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach(el => (el.checked = e.target.checked));
  }