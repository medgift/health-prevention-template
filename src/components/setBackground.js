export default function setBodyColor({color1, color2}) {
    document.documentElement.style.setProperty('--primary', color1)
    document.documentElement.style.setProperty('--secondary', color2)
}