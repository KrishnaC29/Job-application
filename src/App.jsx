import {Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import DetailedJobs from './components/detailedJobs'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProctectingRouter from './components/protectingRouter'

const App = () => {



        

        return(
                <>
                <Routes>
                        <Route path = "/"  element = {<ProctectingRouter Component = {<Home/>}/>}></Route>
                        <Route path = "/login" element = {<Login/>}></Route>
                        <Route path = "/jobs" element = {<ProctectingRouter Component = {<Jobs/>}/>}></Route>
                        <Route path = "/jobs/:id" element = {<ProctectingRouter Component = {<DetailedJobs/>}/>}></Route>
                        <Route path = "/*" element = {<NotFound/>}></Route>
                </Routes>
                </>
        )
}
export default App;