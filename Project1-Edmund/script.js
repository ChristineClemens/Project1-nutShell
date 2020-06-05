const sidebar = document.querySelector('#sidebar')
const color = {
    default: ['#666666','#999999','#cccccc','#333333'],
    ponder: ['#0F4C81','#658DC6','#B5C7D3','#84898C'],
    sunset: ['#FC8F9B','#E55982','#E881A6','#9D446E'],
    calm:['#88B04B','#D4CACD','#C1CEC1','#EEA0A6']
}

let selectColor = 'default'

startup()

//Loading Theme at Startup
function startup(){
    if (!sessionStorage.email) window.location.href = './Project1-Shayanne/';
    else themeChange(selectColor, false)
}

//Sidebar Page onClick
sidebar.addEventListener('click', function(){
    sidebarItemColor(event.target.id)

    if (event.target.id != 'logout'){
        document.querySelectorAll(`.display-row`).forEach(value => {
            value.style.display = (value.id == `${event.target.id}-row`) ? 'inline' : 'none'
        })
    }
})

//Sidebar Color Change MouseOver 
sidebar.addEventListener('mouseover', function(){
    sidebarItemColor(event.target.id)
})


//Sidebar Color Change Function
function sidebarItemColor(eventID){
    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == eventID)? color[selectColor][1] :'transparent'} !important`)
    })
}

//Setting Theme Change onClick
document.querySelector('#theme').addEventListener('click',function(){
    selectColor = event.target.id
    themeChange(selectColor, true)
})

//Setting Theme Change Function
function themeChange( id , isSetting){
    if (isSetting) sidebarItemColor('setting')
    document.querySelector('.navbar').setAttribute('style',`background-color: ${color[id][3]} !important`)
    document.querySelector('.sidebar').setAttribute('style',`background-color: ${color[id][0]} !important`)
    document.querySelector(`a${(isSetting)? '#setting':'#home'}`).setAttribute('style',`background-color: ${color[id][1]} !important`)
    document.querySelector('.btn-cancel').setAttribute('style',`background-color: ${color[id][(selectColor == 'sunset')? 0 : 1]} !important`)
    

    document.querySelectorAll('.form-check-input').forEach(value => {
        value.checked = (value.id == selectColor);
    })

    metricChange(id)
    buttonColor(id)
}

//Setting Weather Unit Change Function
function metricChange(selectColor){
    const inactiveColor = color[selectColor][(selectColor == 'sunset')? 0 : 1]
    const activeColor = color[selectColor][(selectColor == 'sunset')? 1 : 0]
    
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.setAttribute('style', `background-color: ${inactiveColor} !important; border-color: ${inactiveColor} !important;`)
    })
    
    document.querySelector('.active').setAttribute('style', `background-color: ${activeColor} !important; border-color: ${activeColor} !important;`)
}

//Setting Weather Unit Change onClick
function changeUnit(){
    metricChange(selectColor)
}

//Button Color Change Function
function buttonColor(selectColor){
    document.querySelectorAll('.btn-color').forEach(button =>{
        button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 1 : 0]} !important`)
        button.addEventListener('mouseover', function(){
            button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 0 : 1]} !important`)
        })
        button.addEventListener('mouseout', function(){
            button.setAttribute('style',`background-color: ${color[selectColor][(selectColor == 'sunset')? 1 : 0]} !important`)
        })
    })
}

//Save Profile onClick
document.querySelector('#saveProfile').addEventListener('click',function(){
    const confirmPassword = document.querySelector('#confirmPassword')
    const setPassword = document.querySelector('#setPassword').value

    confirmPassword.setAttribute('class',`form-control ${(confirmPassword.value == setPassword)? '':'is-invalid'}`)
})


//Show Password Checkbox
document.querySelector('#showPassword').addEventListener('change',function(){
    const showPassword = (this.checked)? 'text':'password'
    document.querySelector('#setPassword').setAttribute('type',showPassword)
    document.querySelector('#confirmPassword').setAttribute('type',showPassword)
})


//Log Out onClick
document.querySelector('#confirmLogout').addEventListener('click',function(){
    sessionStorage.clear()
    location.reload()
})


