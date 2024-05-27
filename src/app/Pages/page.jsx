import { getSession } from '../actions'
import { redirect } from "next/navigation";
import ScrollInfiniteList from '../components/clientComponents/ScrollInfiniteList';
// import InfiniteScroll from 'react-infinite-scroll-component';

const IndexPage = async () => {

  const session = await getSession();
  if(!session.isLoggedIn){
    redirect("/Login")
  }

  return (
    <div className="profile">
      <h1 >IDDEX INDEX</h1>
      <p>WELCOME,
        <b>{session.userEmail}</b>
      </p>

      {/* <h1>Lista de elementos</h1>
        <ScrollInfiniteList/> */}
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

export default IndexPage
