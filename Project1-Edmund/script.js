const sidebar = document.querySelector('#sidebar')
const color = {
    default: ['#666666','#999999','#cccccc','#333333'],
    ponder: ['#0F4C81','#658DC6','#B5C7D3','#84898C'],
    sunset: ['#FC8F9B','#E55982','#E881A6','#9D446E'],
    calm:['#88B04B','#D4CACD','#C1CEC1','#EEA0A6']
}

let selectColor = 'default'

startup()

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
        value.setAttribute('style',`background-color: ${ (value.id == eventID)? color[selectColor][1] :'transparent'} !important`)
    })
}

function startup(){
    themeChange(selectColor, false)
}



document.querySelector('#theme').addEventListener('click',function(){
    selectColor = event.target.id
    themeChange(selectColor, true)
})


function themeChange( id , isSetting){
    if (isSetting) sidebarItemColor('setting')
    document.querySelector('.navbar').setAttribute('style',`background-color: ${color[id][3]} !important`)
    document.querySelector('.sidebar').setAttribute('style',`background-color: ${color[id][0]} !important`)
    document.querySelector(`a${(isSetting)? '#setting':'#home'}`).setAttribute('style',`background-color: ${color[id][1]} !important`)

    document.querySelectorAll('.form-check-input').forEach(value => {
        value.checked = (value.id == selectColor);
    })
}