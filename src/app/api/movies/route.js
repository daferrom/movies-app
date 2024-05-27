import mockDataMovies from '../../__fixtures__/mockDataMovies.json'


const movies = mockDataMovies;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const paginatedMovies = movies.slice(startIndex, startIndex + pageSize);
  
    return new Response(JSON.stringify({
      movies: paginatedMovies,
      totalPages: Math.ceil(movies.length / pageSize),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }