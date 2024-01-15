import { gql, useQuery } from "@apollo/client";
import FilmsDataListView from "../../components/films-data-list-view/FilmsDataListView";

const GET_STAR_WARS_FILMS = gql`
  query GetStarWarsFilms {
    allFilms {
      films {
        title
        producers
      }
    }
  }
`;

const StarWarsFilms = () => {
  const { loading, error, data } = useQuery(GET_STAR_WARS_FILMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: "100%" }}>
      <FilmsDataListView
        title={"Star Wars Films"}
        data={data.allFilms.films}
      />
    </div>
  );
};

export default StarWarsFilms;
