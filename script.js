var numbertoDraw = Math.floor(Math.random() * 10)

var number = 0

const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)


var request1 = new XMLHttpRequest()

request1.open('GET', 'https://api.nasa.gov/techport/api/projects.json?api_key=oMmtQhJvRMcU8mo5CDJV0wHcZDVPMF0DjkrxI62k')

request1.onload = function () {

    var data = JSON.parse(this.response)

    if (request1.status >=200 && request1.status < 400) {
        dictionary = data.projects[numbertoDraw]
        for (var key in dictionary) {
            if (key === 'projectId') {
                number = dictionary[key]
            }
        }
        var request2 = new XMLHttpRequest()

        request2.open('GET', `https://api.nasa.gov/techport/api/projects/${number}.json?api_key=oMmtQhJvRMcU8mo5CDJV0wHcZDVPMF0DjkrxI62k`, true)
        
        request2.onload = function () {
        
            var data1 = JSON.parse(this.response)
        
            if (request2.status >=200 && request2.status < 400) {
                console.log(data1.project)
                dictionary1 = data1.project
                const card = document.createElement('div')
                card.setAttribute('class', 'card')
                
                for (var key in dictionary1) {
                    if (key === 'title') {
                        const h1 = document.createElement('h1')
                        h1.textContent = dictionary1[key]
                        card.appendChild(h1)
                    } else if (key === 'description') {
                        const p = document.createElement('p')
                        var text = dictionary1[key]
                        p.textContent = text.substring(3, text.length-4)
                        card.appendChild(p)
                    } else {
                        console.log(`skipping ${dictionary1}`)
                    }
                container.appendChild(card)
                }
            } else {
                console.log('error')
            }
        }
        request2.send()

    } else {
        console.log('error')
    }
}

request1.send()
