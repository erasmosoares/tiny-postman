$(document).ready(function() {
    $('#btn-ajax-call').click(function () {
        $.ajax({
            url: 'https://reqres.in/api/users/1',
            method: 'get',
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
              
                renderUsers(response)
               
            },
            error: function (err) {
                alert(err);
            }
        });
    });

    $('#btn-fetch-call').click(async function () {
        
        await fetch('https://reqres.in/api/users/2')
        .then(response => response.json())
        .then(data => renderUsers(data))
        .catch((error) =>{
            console.error('Error:', error);
        });
    });

    async function renderUsers(response){
        console.log(response);
        let htmlSegment = `<div class="user">
                             <img src="${response.data.avatar}" >
                             <h2>${response.data.first_name} ${response.data.last_name}</h2>
                             <div class="email"><a href="email:${response.data.email}">${response.data.email}</a></div>
                          </div>`;

        let container = document.querySelector('.user-container');
        container.innerHTML = htmlSegment;
    }

    const form  = document.getElementById('form-postman');
    const uri = form.elements['uri'];
    const response =  $('#response');

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
    
        await fetch(uri.value)
        .then(response => response.json())
        .then(data => response.text(JSON.stringify(data)))
        .catch((error) =>{
            console.error('Error:', error);
        });
    });

});

