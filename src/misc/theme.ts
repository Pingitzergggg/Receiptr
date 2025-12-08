function setTheme() : void {
    const theme = localStorage.getItem("theme");
    if (theme == "light") {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
    location.reload();
}

export default setTheme;