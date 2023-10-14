import { Route, Routes, HashRouter as Router } from 'react-router-dom'
import CountryContainer from './Components/CountryContainer'
import Navbar from './Presentational/Navbar'
import CountryDetail from './Components/CountryDetail'

export default function App() {
    return (
        <div className='min-h-screen bg-[#eaeaea67] dark:bg-[#202c37]'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<CountryContainer />} />
                    <Route path='/:region' element={<CountryContainer />} />
                    <Route path="/country/:name" element={<CountryDetail />} />
                </Routes>
            </Router>
        </div>
    )
}
