import { useParams } from 'react-router-dom'
import Header from './Header'
import CountryList from './CountryList'
import { useEffect, useState } from 'react'
import { getCountries } from '../utils/utils'

export default function CountryContainer() {

    const { region } = useParams()
    const [countries, setCountries] = useState([])

    useEffect(() => {
        if(!!region) {
            getCountries(region)
                .then(data => setCountries(data))
        } else {
            getCountries()
                .then(data => setCountries(data))
        }
    }, [region])

    return (
        <div className='px-6 sm:px-10 pt-5 pb-10 sm:pt-10'>
            <Header countries={countries} />
            <CountryList countries={countries} />
        </div>
    )
}
