import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCountryByName } from '../utils/utils'

export default function Header({ countries }) {

    const navigate = useNavigate();
    const [region, setRegion] = useState('')

    const handleChange = (e) => {
        setRegion(e.target.value)
    }

    const handleSearch = async(e) => {
        if (e.key === 'Enter') {
            const value = await getCountryByName(e.target.value)
            !!value.alpha3Code && navigate(`/country/${value.alpha3Code}`)
        }
        return
    }

    useEffect(() => {
        navigate(`/${region}`)
    }, [region])

    return (
        <div className='flex flex-wrap justify-between mx-auto'>
            <div className='w-full sm:w-1/3'>
                <label className='relative'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-8'>
                        <svg className='h-4 w-4 fill-dark dark:fill-white' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'><path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' /></svg>
                    </span>
                    <input list='countries' className='placeholder:italic placeholder:text-slate-400 block bg-white dark:bg-[#2b3945] w-full shadow-lg rounded-md py-2 pl-14 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-14 text-dark dark:text-white' placeholder='Search for a country ...' type='text' onKeyUp={handleSearch}/>
                    <datalist id='countries'>
                        { countries.map((data, index) => {
                            return (
                                <option key={`helper-${index}`} value={data.name}>{data.name}</option>
                            )
                        })}
                    </datalist>

                </label>
            </div>

            <div className='relative mt-8 sm:mt-auto'>
                <select className='bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14 w-56 text-md border-none appearance-none shadow-lg'
                    onChange={handleChange}
                >
                    <option style={{ display: 'none' }}>Filter By Region</option>
                    <option className='bg-[#ffffff] dark:bg-[#2b3945]' value='Africa'>Africa</option>
                    <option className='bg-[#ffffff] dark:bg-[#2b3945]' value='Americas'>America</option>
                    <option className='bg-[#ffffff] dark:bg-[#2b3945]' value='Asia'>Asia</option>
                    <option className='bg-[#ffffff] dark:bg-[#2b3945]' value='Europe'>Europe</option>
                    <option className='bg-[#ffffff] dark:bg-[#2b3945]' value='Oceania'>Oceania</option>
                </select>

                <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}
