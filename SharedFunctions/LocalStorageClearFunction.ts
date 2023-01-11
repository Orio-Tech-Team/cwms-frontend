export const localStorageClearFunction = () => {
  const pre = localStorage.getItem("sidebar_active");
  localStorage.clear();
  localStorage.setItem("sidebar_active", pre!);
};
