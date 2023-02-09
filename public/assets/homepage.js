const username_input_value = $('#username_input_value')
const submit_input_button = $('#submit_input_button')
const search_value_span_el = $('#search_value_span_el')
const search_results_div = $('#search_results_div')

function displayResults (repos, user) {
      $(search_value_span_el).text(user)
      if(repos.length === 0) {
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

// display single repo function

function fetchRepos (user) {
      fetch("https://api.github.com/users/" + user + "/repos", {
            method: 'get'
      })
            .then(results => {
                  if(results.ok) {
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

function fetchSingleRepo (repo) {
      fetch("https://api.github.com/repos/" + repo + "/issues?direction=asc", {
            method: 'get'
      })
            .then(results => {
                  if(results.ok) {
                        results.json()
                        .then(data => {
                              displaySingleRepo(data)
                              console.log(data)
                        })
                  } else {
                        alert('Error: ' + results.statusText)
                  }
            })
            .catch(err => {
                  throw new Error(err)
            })
}

function inputSubmission (event) {
      event.preventDefault()
      let user = username_input_value.val()
      if(user) {
            fetchRepos(user)
            username_input_value.val('')
      } else {
            alert('Please search for a user')
      }
}

$(submit_input_button).on('click', inputSubmission)
$(search_results_div).on('click', (event) => {
      let repo_container = event.target.parentElement
      let repo = event.target.textContent
      let slash = repo.indexOf('/')

      let new_repo_name = (slash !== 1) ? repo.substring(slash + 1) : alert('Please enter a valid repo name')

      // call the fetch function for single repo with the spliced name
      // map through each issue (use display single repo function)
      // create dom elements that will contain each issue
      // append the list of issues to the clicked on div
})