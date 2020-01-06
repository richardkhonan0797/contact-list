function updateForm( id ) {
    if($(`#${id}`).is(':visible')){
        $(`#${id}`).hide()
    } else {
        $(`#${id}`).show()
    }
}

function toastAdd() {
    if( $('#addContact').is(':visible')){
        $('#addContact').hide()
    }
    else {
        $('#addContact').show()
    }
}