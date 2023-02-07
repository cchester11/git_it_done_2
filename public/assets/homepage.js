// dom manipulation vars
const username_input_value = $('#username_input_value')
const submit_input_button = $('#submit_input_button')
const search_value_span_el = $('#search_value_span_el')
const search_results_div = $('#search_results_div')

// display function: accepts parameters (repos, user)
// do conditional check that makes sure repos return
// loop over repos (try map) and create a container element for each
// container includes a title (owners name/repo name)
// statusEl (if repo has issues then it is active. if not it is inactive)
function displayResults (repos, user) {
      $(search_value_span_el).text(user)
      if(repos.length === 0) {
            alert(`No results showing for ${user}`)
      }

      repos.map((repo, i) => {
            let container = $('<div>')
            let repoNameContainer = $('<h2>')
            let repoName = `${repo.full_name}`
            $(repoNameContainer).text(repoName)

            container.append(repoNameContainer)
            search_results_div.append(container)
      })
}

// fetch function: fetches user repos from github api; takes parameter (user)
// fetch the url using the parameter
// retrieve the data and call the display function 
// check for errors
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

// input function: accepts parameter (event)
// captures value of input
// fetches the fetch function, passes in input value
// checks for errors
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

// lastly, event listener that triggers input function
$(submit_input_button).on('click', inputSubmission)