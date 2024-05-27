const IndexPage = async () => {


  return (
    <div className="profile">
        HOLA MUNDO
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
