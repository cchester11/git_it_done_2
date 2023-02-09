const username_input_value = $('#username_input_value')
const submit_input_button = $('#submit_input_button')
const search_value_span_el = $('#search_value_span_el')
const search_results_div = $('#search_results_div')

function displayResults(repos, user) {
      $(search_value_span_el).text(user)
      if (repos.length === 0) {
            alert(`No results showing for ${user}`)
      }

      repos.map((repo) => {
            let container = $('<div>')
            let repoNameContainer = $('<h2>')
            let repoName = `${repo.full_name}`
            $(repoNameContainer).text(repoName)

            container.append(repoNameContainer)
            search_results_div.append(container)
      })
}

function displayIssues(data, container) {
      // maps data
      // creates dom container for data
      // appends dom container to container parameter
      console.log(data, container)
}

function fetchRepos(user) {
      fetch("https://api.github.com/users/" + user + "/repos", {
            method: 'get'
      })
            .then(results => {
                  if (results.ok) {
                        results.json()
                              .then(data => {
                                    displayResults(data, user)
                                    console.log(data)
                              })
                  } else {
                        alert("Error: " + results.statusText)
                  }
            })
            .catch(err => {
                  throw new Error(err)
            })
}

function fetchSingleRepoIssues(owner, repo, container) {
      fetch("https://api.github.com/repos/" + owner + "/" + repo + "/issues?state=open", {
            method: 'GET'
      })
            .then(results => {
                  if (results.ok) {
                        results.json()
                              .then(data => {
                                    (data.length === 0) ? alert('There are no active issues associated with this repo') : displayIssues(data, container)
                              })
                  } else {
                        alert('Error: ' + results.statusText)
                  }
            })
            .catch(err => {
                  throw new Error(err)
            })
}

function inputSubmission(event) {
      event.preventDefault()
      let user = username_input_value.val()
      if (user) {
            fetchRepos(user)
            username_input_value.val('')
      } else {
            alert('Please search for a user')
      }
}

$(submit_input_button).on('click', inputSubmission)
$(search_results_div).on('click', (event) => {
      let container = event.target.parentElement
      let repo = event.target.textContent
      let slash = repo.indexOf('/')

      let owner = (slash !== -1) ? repo.substring(0, slash) : alert('Please enter a valid repo name')
      let name = (slash !== -1) ? repo.substring(slash + 1) : alert('Please enter a valid repo name')
      fetchSingleRepoIssues(owner, name, container)
})