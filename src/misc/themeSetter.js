const root = document.querySelector(":root").style;

if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}

root.setProperty("--accent-hover-color", "#143114");
root.setProperty("--error-color", "#a52424");

if (localStorage.getItem("theme") == "dark") {
    root.setProperty("--font-color", "whitesmoke");
    root.setProperty("--bg-color", "#1d232a");
    root.setProperty("--card-background", "#323339");
    root.setProperty("--input-bg", "#252525");
    root.setProperty("--border-icon-color", "#4d5051");
    root.setProperty("--accent-color", "#127012");
} else  {
    root.setProperty("--bg-color", "whitesmoke");
    root.setProperty("--font-color", "black");
    root.setProperty("--card-background", "#cccccc");
    root.setProperty("--input-bg", "#a0a0a0ff");
    root.setProperty("--border-icon-color", "#4d5051");
    root.setProperty("--accent-color", "#1d9d1dff");
}