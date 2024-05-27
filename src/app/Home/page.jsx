
import { getSession } from '../../app/actions'
import ScrollInfiniteList from '../components/clientComponents/ScrollInfiniteList';
// import InfiniteScroll from 'react-infinite-scroll-component';

const Home = async () => {

  const session = await getSession();
  if(!session.isLoggedIn){
    redirect("/Login")
  }

  return (
    <div className="profile">
      <h1>Welcome <b>{session.userEmail}</b></h1>
        <ScrollInfiniteList/>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const response = await axios.get(`http://localhost:3000/api/items?page=1&limit=20`);
//   const initialItems = response.data;

//   return {
//     props: {
//       initialItems,
//       initialPage: 2,
//     },
//   };
// };

// }

export default Home

