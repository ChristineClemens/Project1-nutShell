



document.querySelector('#sidebar').addEventListener('click', function(){
    const id = `${event.target.id}-row`

    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == event.target.id)? '#999999':'transparent'} !important`)
    })


    document.querySelectorAll(`.display-row`).forEach(value => {
         value.style.display = (value.id == id) ? 'inline' : 'none'
    })
    // document.querySelector(`#${event.target.id}-row`).style.display = 'inline';
})

document.querySelector('#sidebar').addEventListener('mouseover', function(){

    document.querySelectorAll('.list-group-item').forEach(value => {
        value.setAttribute('style',`background-color: ${ (value.id == event.target.id)? '#999999':'transparent'} !important`)
    })
})