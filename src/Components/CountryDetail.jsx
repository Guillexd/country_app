import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCountry } from '../utils/utils'

export default function CountryDetail() {

    const { name } = useParams()
    const navigate = useNavigate()
    const [country, setCountry] = useState({})
    const [borders, setBorders] = useState([])

    const handleRedirect = () => {
        navigate('/')
    }

    const getBorderCountries = (countries = []) => {
        
        Promise.all(
            countries.map(async (countryCode) => {
                try {
                    const data = await getCountry(countryCode);
                    return data
                } catch (error) {
                    return null
                }
            })
        )
        .then((data) => setBorders(data))
        .catch(e => console.log(e))
    }

    useEffect(() => {
        getCountry(name)
            .then(data => {
                setCountry(data)
                getBorderCountries(data.borders)
            })
    }, [name])

    return (
        <div className='px-6 sm:px-10 pt-7 sm:pt-10'>
            <button className='shadow-xl bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] px-4 py-1'
                onClick={handleRedirect}
            >
                &larr; Back
            </button>

            <div className='flex flex-col justify-center sm:flex-row gap-10 sm:gap-20 mt-14 pb-10 text-[#111517] dark:text-[#ffffff] mx-0'>
                <div className='w-full xl:w-4/5 h-48 sm:h-80 lg:h-96'>
                    <img className='w-full mx-auto max-w-md md:max-w-xl h-full' src={country.flags?.png} alt='Bandera del país' />
                </div>

                <div className='sm:w-11/12 lg:w-7/12 xl:w-full text-sm leading-7 grid grid-rows-auto grid-cols-1 sm:grid-cols-2 gap-5'>
                    <div className='flex flex-col justify-center'>
                        <p className='text-xl font-bold mb-3'>{country.name}</p>
                        <p> <span className='font-medium'>Native Name:</span> {country.nativeName}</p>
                        <p> <span className='font-medium'>Population:</span> {country.population}</p>
                        <p> <span className='font-medium'>Region:</span> {country.region}</p>
                        <p> <span className='font-medium'>Sub Region:</span> {country.subregion}</p>
                        <p> <span className='font-medium'>Capital:</span> {country.capital}</p>
                    </div>

                    <div className='flex flex-col justify-center'>
                        <p>
                            <span className='font-medium'>Top Level Domain:</span>
                            {country.topLevelDomain?.map((value, index) => {
                                return (
                                    <span key={`top-${index}`}> {value}, </span>
                                )
                            })}
                        </p>
                        <p>
                            <span className='font-medium'>Currencies:</span>
                            {country.currencies?.map((value, index) => {
                                return (
                                    <span key={`curr-${index}`}> {value.name}, </span>
                                )
                            })}
                        </p>
                        <p>
                            <span className='font-medium'>Languages:</span>
                            {country.languages?.map((value, index) => {
                                return (
                                    <span key={`lan-${index}`}> {value.name}, </span>
                                )
                            })}

                        </p>
                    </div>

                    <div className='sm:col-span-2'>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            <p className='basis-full sm:basis-auto'> <span className='font-medium'>Border Countries:</span> </p>
                            {borders.map((value, index) => {
                                return (
                                    <Link to={`/country/${value.alpha3Code}`} className='bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] w-20 text-center overflow-hidden truncate shadow-xl text-xs px-3 py-1 rounded cursor-pointer' key={`border-${index}`}>
                                        {value.name}
                                    </Link>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
