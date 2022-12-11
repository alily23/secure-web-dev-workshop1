// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

//Question 1
// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log("\n", "Question 1")
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris.`)

//Question 2
// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	//const filmingLocationsByStartDate2 = filmingLocations.sort(function (film) { return film["date_debut"]})
	const filmingLocationsByStartDate = (film1, film2) => new Date(film1.fields.date_debut) - new Date(film2.fields.date_debut)
	const sortedArray = filmingLocations.sort(filmingLocationsByStartDate)
	return sortedArray
}
console.log("\n", "Question 2")
console.log("The oldest movie to start is:", "\n", sortFilmingLocationsByStartDate()[0])
console.log("The most recent movie to start is:", "\n", sortFilmingLocationsByStartDate()[filmingLocations.length-1])

//Question 3
// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	const filmingLocations2020 = [] //Array
	for (let pas = 0; pas < filmingLocations.length; pas++) {
		if (filmingLocations[pas].fields.annee_tournage === "2020") {
			filmingLocations2020.push(filmingLocations[pas].fields.nom_tournage)
		}
	}
	return filmingLocations2020
}
console.log("\n", "Question 3")
console.log(`There are ${getFilmingLocationsNumber2020().length} filming locations in 2020`)
//filmingLocations.filter(function filmingLocations => {return filmingLocations.fields.nom_tournage === "2020"})

//Question 4
// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	let filmingLocationsPerYear = {
		'2016' : 0,
		'2017' : 0,
		'2018' : 0,
		'2019' : 0,
		'2020' : 0,
		'2021' : 0
	}
	for (let pas = 0; pas < filmingLocations.length; pas++) {
		filmingLocationsPerYear[filmingLocations[pas].fields.annee_tournage] = filmingLocationsPerYear[filmingLocations[pas].fields.annee_tournage] + 1
	}
	return {filmingLocationsPerYear}
}
console.log("\n", "Question 4")
console.log(getFilmingLocationsNumberPerYear())

//Question 5
// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let filmingLocationsPerDistrict = {}
	for (let pas = 0; pas < filmingLocations.length; pas++) {
		if(filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu] === undefined) {
			filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu] = 1
		}
		else {
			filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu] = filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu] + 1
		}
	}
	return {filmingLocationsPerDistrict}
}
console.log("\n", "Question 5")
console.log(getFilmingLocationsNumberPerDistrict())
//console.log(Object.keys(locationsPerDistrict).map((district) => ({'arrondissement': district, 'count': locationsPerDistrict[district]})).sort((a,b) => b.count-a.count))

//Question 6
// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	let filmingLocationsByFilm = []
	let result = false
	let indice = 0
	for (let x = 0; x < filmingLocations.length; x++) {
		for (let pas = 0; pas < filmingLocationsByFilm.length; pas++) {
			if (filmingLocationsByFilm[pas].film === filmingLocations[x].fields.nom_tournage ) {
				result = true
				indice = pas
			}
		}
		if (result == true) {
			filmingLocationsByFilm[indice].locations = filmingLocationsByFilm[indice].locations + 1
			result = false
		}
		else {
			let movie = {
				film : filmingLocations[x].fields.nom_tournage,
				locations : 1
			}
			filmingLocationsByFilm.push(movie)
		}
	}
	return filmingLocationsByFilm
}

console.log("\n", "Question 6")
console.log(getFilmLocationsByFilm().sort((a,b) => a.locations - b.locations).reverse())

//Question 7
// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	let listFilms = []
	for (let i = 0; i < filmingLocations.length; i++) {
		if (listFilms.indexOf(filmingLocations[i].fields.nom_tournage) === -1) {
			listFilms.push(filmingLocations[i].fields.nom_tournage)
		}
	}
	return listFilms
}
console.log("\n", "Question 7")
console.log("There are",getNumberOfFilms().length, "different films.")

//Question 8
// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let ArseneFilmingLocations = []
	for (let i=0; i < filmingLocations.length; i++) {
		if(filmingLocations[i].fields.nom_tournage === 'LRDM - Patriot season 2') {
			if(ArseneFilmingLocations.indexOf(filmingLocations[i].fields.adresse_lieu) === -1) {
				ArseneFilmingLocations.push(filmingLocations[i].fields.adresse_lieu)
			}
		}
	}
	return ArseneFilmingLocations
}
console.log("\n", "Question 8")
console.log("The filming locations of `LRDM - Patriot season 2` are : \n", getArseneFilmingLocations())

//Question 9
// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let filmArray = []
	for (let i = 0; i < favoriteFilmsNames.length; i++) {
		let districtArray = []
		for (let j = 0; j < filmingLocations.length; j++) {
			if(filmingLocations[j].fields.nom_tournage === favoriteFilmsNames[i]) {
				if(districtArray.indexOf(filmingLocations[j].fields.ardt_lieu) === -1) {
					districtArray.push(filmingLocations[j].fields.ardt_lieu)
				}
			}
		}
		let films = {
			[favoriteFilmsNames[i]] : districtArray
		}
		filmArray.push(films)
	}
	return filmArray
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]
console.log("\n", "Question 9")
//console.log(getFavoriteFilmsLocations(favoriteFilms))

//Question 10
// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const films = {}
	let filmsList = []
	for (let i = 0; i<filmingLocations.length; i++) {
		if(filmsList.indexOf(filmingLocations[i].fields.nom_tournage) === -1) {
			films[filmingLocations[i].fields.nom_tournage] = []
			films[filmingLocations[i].fields.nom_tournage].push(filmingLocations[i].fields.adresse_lieu)
			filmsList.push(filmingLocations[i].fields.nom_tournage)
			//filmsList.push(filmingLocations[i].fields.nom_tournage)
		}
		else {
			films[filmingLocations[i].fields.nom_tournage].push(filmingLocations[i].fields.adresse_lieu)
		}
	}
	return films
}
console.log("\n", "Question 10")
//console.log(getFilmingLocationsPerFilm())
//console.log(Object.keys(getFilmingLocationsPerFilm()).length)

//Question 11
// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	let typeArray = []
	for (let i = 0; i < filmingLocations.length; i++) {
		if (typeArray.indexOf(filmingLocations[i].fields.type_tournage) === -1) {
			typeArray.push(filmingLocations[i].fields.type_tournage)
		}
	}
	return typeArray
}
console.log("\n", "Question 11")
console.log(countFilmingTypes())
console.log("There are", countFilmingTypes().length, "types of films.")

//Question 12
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	let filmingTypes = countFilmingTypes()
	let countTypes = []
	for (let i = 0; i < filmingTypes.length; i++) {
		let typeFilm = {
			type : filmingTypes[i],
			count : 0
		}
		countTypes.push(typeFilm)
		for (let j = 0; j < filmingLocations.length ; j++) {
			if (filmingTypes[i] === filmingLocations[j].fields.type_tournage) {
				countTypes[i].count = countTypes[i].count + 1
			}
		}
	}
	return countTypes
}
console.log("\n", "Question 12")
console.log(sortedCountFilmingTypes())

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

//Question 13
// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
console.log("\n", "Question 13")
let longestDuration = (a,b) => (new Date(a.fields.date_fin).getTime()-new Date(a.fields.date_debut).getTime()) - (new Date(b.fields.date_fin)-new Date(b.fields.date_debut))
const sortedA = filmingLocations.sort(longestDuration).reverse()
console.log(sortedA[0])

//Question 14
// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
console.log("\n", "Question 14")
let sum = 0
for (let i = 0; i < filmingLocations.length; i++) {
	sum = sum + new Date(filmingLocations[i].fields.date_fin).getTime()-new Date(filmingLocations[i].fields.date_debut).getTime()
}
let average = duration(sum / filmingLocations.length)
console.log(average)

