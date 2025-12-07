const root = document.querySelector(":root").style;

if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
}

root.setProperty("--accent-color", "#127012");
root.setProperty("--accent-hover-color", "#143114");
root.setProperty("--error-color", "#a52424");

if (localStorage.getItem("theme") == "dark") {
    root.setProperty("--font-color", "whitesmoke");
    root.setProperty("--bg-color", "#1d232a");
    root.setProperty("--card-background", "#323339");
    root.setProperty("--input-color", "#252525");
    root.setProperty("--border-icon-color", "#4d5051");
} else  {
    root.setProperty("--bg-color", "whitesmoke");
    root.setProperty("--font-color", "black");
    root.setProperty("--card-background", "bisque");
    root.setProperty("--input-color", "#252525");
    root.setProperty("--border-icon-color", "#4d5051");
}