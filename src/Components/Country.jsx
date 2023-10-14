import { useNavigate } from 'react-router-dom'

export default function Country({ data }) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/country/${data.alpha3Code}`)
    }

    return (
        <div className='w-80 bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] shadow-lg rounded-lg overflow-hidden cursor-pointer'
            onClick={handleClick}
        >
            <div className='h-48'>
                <img className='w-full h-full' src={data.flags.png} alt='Bandera del país' />
            </div>
            <div className='px-6 pt-6 pb-10 text-sm'>
                <p className='text-xl font-bold mb-3'>{data.name}</p>
                <p> <span className='font-medium'>Population:</span> {data.population}</p>
                <p> <span className='font-medium'>Region:</span> {data.region}</p>
                <p> <span className='font-medium'>Capital:</span> {data.capital}</p>
            </div>
        </div>
    )
}
