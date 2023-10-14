
const api =  'data.json'

export async function getCountries(region = null) {
    return await fetch(api)
        .then(val => val.json())
        .then(data => {
            if(!!region) {
                return data.filter((value) => value.region === region)
            }
            return data
        })
}

export async function getCountry(country) {
    return await fetch(api)
        .then(val => val.json())
        .then(data =>  data.find((value) => value.alpha3Code === country))
}

export async function getCountryByName(country) {
    return await fetch(api)
        .then(val => val.json())
        .then(data =>  data.find((value) => value.name === country))
}