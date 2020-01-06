function allContacts () {
    axios({
        method:'get',
        url:'http://localhost:3000/'
    })
    .then(({data}) => {
        for(let item of data) {
            $('.all-contacts').append(`
                <div class='contact mb-3'>
                    <p>Name: ${item.name}</p>
                    <p>Phone: ${item.phone}</p>
                    <button type="button" class="btn btn-outline-primary" onclick="updateForm('${item._id}')">Update</button>
                    <button type="button" class="btn btn-outline-danger" onclick="deleteContact('${item._id}')">Delete</button>
                    <form id="${item._id}" class="mt-3 mb-3" onsubmit="update('${item._id}')">
                        <div class="form-group">
                            <label for="name">Name :</label>
                            <input type="text" class="form-control" placeholder="Enter name" id="name${item._id}" value="${item.name}">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone :</label>
                            <input type="text" class="form-control" placeholder="Enter phone" id="phone${item._id}" value="${item.phone}">
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
            `)
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function toast( id ) {
    $(`#${id}`).toast('show');
}

function update( id,name,phone ) {
    console.log($(`#name${id}`).val())
    event.preventDefault();
    axios({
        method:'put',
        url:'http://localhost:3000/',
        data:{
            id,name:$(`#name${id}`).val(),phone:$(`#phone${id}`).val()
        }
    })
    .then(result => {     
        Swal.fire({
            icon: 'success',
            title: 'Contact Updated',
            showConfirmButton: false,
            timer: 1500
        })
        $(`#${id}`).hide()
        $('.all-contacts').empty()
        allContacts()
    })
    .catch(err => {
        Swal.fire({
            icon: 'error',
            title: 'Something is wrong!',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function add() {
    event.preventDefault()
    axios({
        method:'post',
        url:'http://localhost:3000/',
        data:{
            name:$('#addName').val(),
            phone:$('#addPhone').val()
        }
    })
    .then(({data}) => {
        Swal.fire({
            icon: 'success',
            title: `${data.name} added to contact`,
            showConfirmButton: false,
            timer: 1500
        })
        $(`#addContact`).hide();
        $(`#addContact`).trigger('reset');
        $('.all-contacts').empty()
        allContacts()
    })
    .catch(err => {
        Swal.fire({
            icon: 'error',
            title: 'Something is wrong!',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function deleteContact ( id ) {
    event.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            axios({
                method: 'delete',
                url: 'http://localhost:3000/',
                data: {id}
            })
                .then(result => {
                    Swal.fire({
                        title: 'Success',
                        text: "Contact deleted",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('.all-contacts').empty()
                    allContacts()
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something is wrong!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    })
}