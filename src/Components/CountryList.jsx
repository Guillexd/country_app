import Country from "./Country";

export default function CountryList({ countries }) {

    return (
        <div className='flex flex-wrap gap-20 justify-center mt-10'>
            {countries.map((data, index) => <Country data={data} key={index} />)}
        </div>
    )
}
