const username_input_value = $('#username_input_value')
const submit_input_button = $('#submit_input_button')
const search_value_span_el = $('#search_value_span_el')
const search_results_div = $('#search_results_div')

function setLocalSearchVal(searchVal) {
      localStorage.setItem('stored_search_val', JSON.stringify(searchVal))
}
function setLocalData (searchData) {
      localStorage.setItem('stored_search_data', JSON.stringify(searchData))
}

function displayResults(repos, user) {
      $(search_results_div).empty()
      $(search_value_span_el).empty()
      $(search_value_span_el).text(user)
      if (repos.length === 0) {
            alert(`No results showing for ${user}`)
      }

      repos.map((repo) => {
            let container = $('<div>')
            $(container).attr('class', 'card-body bg-dark text-light border border-success-subtle m-1 rounded')
            $(container).attr('style', "--bs-border-opacity: .5;")
            let repoNameContainer = $('<h2>')
            let repoName = `${repo.full_name}`
            $(repoNameContainer).text(repoName)

            container.append(repoNameContainer)
            search_results_div.append(container)
      })
}

function displayIssues(data, container) {
      data.map((issue) => {
            let issue_container = document.createElement('div')
            $(issue_container).attr('class', 'card-group bg-light text-dark fs-4')
            let issue_item = document.createElement('ul')
            $(issue_item).attr('class', 'card-text')
            let issue_text = `Issue: ${issue.title}`
            console.log(issue_text)
            issue_item.textContent = issue_text

            issue_container.appendChild(issue_item)
            container.appendChild(issue_container)
      })
}

function fetchRepos(user) {
      fetch("https://api.github.com/users/" + user + "/repos", {
            method: 'get'
      })
            .then(results => {
                  if (results.ok) {
                        results.json()
                              .then(data => {
                                    setLocalData(data)
                                    displayResults(data, user)
                                    console.log(data)
                              })
                  } else {
                        alert("Error: User not found")
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
                        return results.json()
                  } else if (!results.ok) {
                        alert('Error: ' + results.statusText)
                  }
            })
            .then(data => {
                  (data.length === 0) ? alert('There are no active issues associated with this repo') : displayIssues(data, container)
            })
            .catch(err => {
                  throw new Error(err)
            })
}

function inputSubmission(event) {
      event.preventDefault()
      setLocalSearchVal('')
      setLocalData('')
      let user = username_input_value.val()
      setLocalSearchVal(user)
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

      if ($(container).find('ul').length > 0) {
            return;
      }

      let slash = repo.indexOf('/')

      let owner = (slash !== -1) ? repo.substring(0, slash) : alert('Please enter a valid repo name')
      let name = (slash !== -1) ? repo.substring(slash + 1) : alert('Please enter a valid repo name')
      fetchSingleRepoIssues(owner, name, container)
})

$(window).on('load', function() {
      let storedVal = JSON.parse(localStorage.getItem('stored_search_val'));
      let storedData = JSON.parse(localStorage.getItem('stored_search_data'));

      $(search_value_span_el).text(storedVal)
      storedData.map((repo) => {
            let container = $('<div>')
            $(container).attr('class', 'card-body bg-dark text-light border border-success-subtle m-1 rounded')
            $(container).attr('style', "--bs-border-opacity: .5;")
            let repoNameContainer = $('<h2>')
            let repoName = `${repo.full_name}`
            $(repoNameContainer).text(repoName)

            container.append(repoNameContainer)
            search_results_div.append(container)
      })
})