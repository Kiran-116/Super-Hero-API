// https://superheroapi.com/api/access-token/character-id

// for superheroapi : write api.php in the url

const SUPERHERO_TOKEN = '241794998275305'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const newHeroButton = document.getElementById('newHeroButton')
const heroesButton = document.getElementById('heroesButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const getSuperHero =  (id, name) => {
    // name -> base_url/search/batman
    // json.results[0].image.url

    // id: -> base_url/id
    // json.image.url

    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const name = `<h2 class="nameClass"> ${json.name} </h2>`
            const stats = getStatsHTML(json)
            heroImageDiv.innerHTML = 
                `<div class="hero1">
                ${name} 
                <img src="${json.image.url}" height=300 width=300'/> 
                 ${stats}
                </div>
                 `
        })
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '⚡',
    durability: '🏋️‍♂️',
    power: '📊',
    combat: '⚔'
}

const getStatsHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    })

    console.log(stats)
    return stats.join('')
}

const getSearchSuperHero = (name) => {
    // console.log(name)

    fetch(`${BASE_URL}/search/${name}`)
        .then(response => response.json())
        .then(json => {
            const hero = json.results[0]
            const name = `<h2 class="nameClass"> ${hero.name} </h2>`
            const stats = getStatsHTML(hero)
            heroImageDiv.innerHTML = 
                `<div class="hero1">
                ${name} 
                <img src="${hero.image.url}" height=300 width=300'/> 
                 ${stats}
                </div>
                 `
        })
}

const getSuperHeroes = (id, name) => {
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => {

            const name = `<h2 class="nameClass"> ${json.name} </h2>`
            const stats = getStatsHTML(json)
            heroImageDiv.innerHTML += 
                `<div class="hero1">
                ${name} 
                <img src="${json.image.url}" height=300 width=300'/> 
                 ${stats}
                </div>
                 `

            // console.log(json)
            // heroImageDiv.innerHTML += 
                // `<img src="${json.image.url}" height=300 width=300'/>`
        })
}

// getSuperHero(randomNumber)

// const img = "https://www.superherodb.com/pictures2/portraits/10/100/1390.jpg"

const randomHero = () => {
    const numberOfHeros = 731
    return Math.floor(Math.random() * numberOfHeros) + 1
}

newHeroButton.onclick = () => {
    console.log(randomHero())
    getSuperHero(randomHero())
}

heroesButton.onclick = () => {
    console.log(randomHero())
    getSuperHeroes(randomHero())
}

searchButton.onclick = () => {
    console.log("Clicked")
    getSearchSuperHero(searchInput.value)
}

// batman, thanos, spider-man, ethan, spider