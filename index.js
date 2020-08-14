/* Github API for retrieving repos by username: https://api.github.com/users/USERNAME/repos */

function getInputValue() {
    console.log('getInputValue() is running');
    const inputVal = $('#github-handle').val();
    return inputVal;
} 

function getGithubRepo() {
    fetch(`https://api.github.com/users/${getInputValue()}/repos`)
        .then(function(response){
            return response.json()
        })
        .then(function(responseJson) {
            return displayResults(responseJson)
        })
        .catch(function(error) {
            return alert('Woops! That does not appear to be a username. Pleaser enter a working Github user handle.')
        });
}

// 'url'

function displayResults(responseJson) {
    $('results-container').empty();
    for (i = 0; i < responseJson.length; i++){
        $('.results-container').append(`<div class="results">
                                        <h3>${responseJson[i].name}</h3><br>
                                        <a href="${responseJson[i].url}">${responseJson[i].url}</a>    
                                    </div>`)
    };
    $('.results-container').removeClass('hidden');
    console.log('displayResults() is running');
} 

function clearResults() {
    $('#clear-button').on('click', function(event){
        event.preventDefault();
        $('.results').remove();
    });
    console.log('clearResults() is running');
}

function watchForm() {
    $('.form-container').on('submit', function(event){
        event.preventDefault();
        getGithubRepo();
    })
    console.log('watchForm() is running');
}

function handleApp() {
    watchForm();
    clearResults();
}

handleApp()