export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function getFormattedName(f_name, l_name) {
  if (f_name && l_name) {
    const firstLetter = String(l_name).charAt(0).toUpperCase();
    const firstname =
      String(f_name).charAt(0).toUpperCase() +
      String(f_name).slice(1).toLowerCase();

    return firstLetter + ". " + firstname;
  } else {
    return "";
  }
}
