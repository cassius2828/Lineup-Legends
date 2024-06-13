const hamburger = document.querySelector(".hamburger-container");
const bar = document.querySelector(".bar");
const sidebar = document.querySelector('.sidebar')
// change names
const lineupContainer = document.querySelector('.lineup-container')
const titleInfo = document.querySelector('.title-info')

console.log(hamburger)
hamburger.addEventListener('click', (e) => {
    bar.classList.toggle('close');
    sidebar.classList.toggle('move')
    lineupContainer.classList.toggle('full')
    titleInfo.classList.toggle('full')
    console.log('closed')
    console.log(e.target)
})
