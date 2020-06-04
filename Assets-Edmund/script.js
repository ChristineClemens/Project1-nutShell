const sidebar = document.querySelector('#sidebar')



sidebar.addEventListener('click', function(){
    sidebarItemColor(event.target.id)

    document.querySelectorAll(`.display-row`).forEach(value => {
         value.style.display = (value.id == `${event.target.id}-row`) ? 'inline' : 'none'
    })
})



sidebar.addEventListener('mouseover', function(){
    sidebarItemColor(event.target.id)
})



function sidebarItemColor(eventID){
    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == eventID)? '#999999':'transparent'} !important`)
    })
}