const username_input_value = $('#username_input_value')
const submit_input_button = $('#submit_input_button')
const search_value_span_el = $('#search_value_span_el')
const search_results_div = $('#search_results_div')
const trash_bin = $('#trash_bin')

let storeClickedIssues = [];
let storeTargetIssue = [];

function setLocalSearchVal(searchVal) {
      localStorage.setItem('stored_search_val', JSON.stringify(searchVal))
}
function setLocalData(searchData) {
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
            $(issue_container).attr('class', 'card-group bg-light text-dark fs-4 issue-container')
            let issue_item = document.createElement('ul')
            $(issue_item).attr('class', 'card-text')
            let issue_text = `Issue: ${issue.title}`

            issue_item.textContent = issue_text
            $(issue_item).attr('class', 'badge text-dark')

            issue_container.appendChild(issue_item)
            container.appendChild(issue_container)
      })
}

function displayIssueDescription (data) {
      let description = data.body
      console.log(description)

      // write global variable to grab issueDescriptionContainer
      // set visibility to display: flex
      // populate description subdiv with body property of data
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
                                    console.log('data for all repos associated with searched user')
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
                  console.log('data for each issue displayed')
                  console.log(data)
                  // storing important data for all issues globally
                  data.forEach((issue) => {
                        storeClickedIssues.push([
                              {
                                    issue_title: issue.title,
                                    issue_number: issue.number
                              }
                        ])
                  })
                  console.log('storeClickedIssues data')
                  console.log(storeClickedIssues)
            })
            .catch(err => {
                  throw new Error(err)
            })
}

function fetchIssueDescription (title, number) {
      fetch("https://api.github.com/repos/cchester11/"+title+"/issues/"+number, {
                  method: "get"
            })
            .then(results => {
                  return results.json()
            })
                  .then(data => {
                        console.log('data for clicked on issue')
                        console.log(data) 
                        console.log('body of issue')
                        displayIssueDescription(data)
                  })
}

function inputSubmission(event) {
      event.preventDefault()
      setLocalSearchVal('')
      setLocalData('')
      let user = username_input_value.val()
      setLocalSearchVal(user)
      if (user !== '') {
            fetchRepos(user)
            username_input_value.val('')
      } else {
            alert('Please search for a user')
      }
}

$(submit_input_button).on('click', inputSubmission)

$(search_results_div).on('click', (event) => {
      let clickedElement = event.target.tagName.toLowerCase()
      let clickedValue = event.target

      if (clickedElement === 'h2') {
            storeClickedIssues = []

            let container = event.target.parentElement
            let repo = event.target.textContent

            if ($(container).find('ul').length > 0) {
                  return;
            }

            let slash = repo.indexOf('/')

            let owner = (slash !== -1) ? repo.substring(0, slash) : alert('Please enter a valid repo name')
            let name = (slash !== -1) ? repo.substring(slash + 1) : alert('Please enter a valid repo name')

            storeClickedIssues.push({
                  repo_title: name
            })

            fetchSingleRepoIssues(owner, name, container)
      } else if (clickedElement === 'ul') {
            storeTargetIssue = []

            let issue = $(clickedValue).text().trim()
            let colon = issue.indexOf(':')
            let issueText = issue.substring(colon + 2)

            console.log('splitting clicked on target at :')
            console.log(issueText)

            for(let i = 0; i < storeClickedIssues.length; i ++) {
                  let currentIssue = storeClickedIssues[i]
                  if(Array.isArray(currentIssue)) {
                        if(currentIssue[0].issue_title === issueText) {
                              storeTargetIssue.push(currentIssue[0].issue_title)
                              storeTargetIssue.push(currentIssue[0].issue_number)
                              break;
                        }
                  } else if (currentIssue.repo_title) {
                        storeTargetIssue.push(currentIssue.repo_title)
                  }
            }

            console.log('storeTargetIssue array data')
            console.log(storeTargetIssue)

            let repo_store = storeTargetIssue[0]
            // let issue_store = storeTargetIssue[1]
            let number_store = JSON.stringify(storeTargetIssue[2])
            console.log(repo_store, number_store)

            fetchIssueDescription(repo_store, number_store)
            // then write a function for displaying description
      } else {
            return;
      }
})

$(trash_bin).on('click', () => {
      setLocalData('')
      setLocalSearchVal('')
      search_results_div.empty()
      search_value_span_el.text('')
})

$(window).on('load', function () {
      let storedVal = JSON.parse(localStorage.getItem('stored_search_val'));
      let storedData = JSON.parse(localStorage.getItem('stored_search_data'));

      if (storedData === '' && storedVal === '') {
            return;
      }

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