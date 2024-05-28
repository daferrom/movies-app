import { getSession } from '../../app/actions'
import LandingPage from '../components/clientComponents/landingPage/LandingPage';


const Home = async () => {

  const session = await getSession();
  if(!session?.isLoggedIn){
    redirect("/Login")
  }

  return (
    <div className="profile">
      <h2>Welcome <b>{session.userEmail}</b></h2>
        <LandingPage/>
    </div>
  )
}
export default Home

