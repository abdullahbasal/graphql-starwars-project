import { useQuery, gql } from "@apollo/client";
import ChracterDataListView from "../../components/character-data-list-view/ChracterDataListView";

const GET_STAR_WARS_CHARACTERS = gql`
  query GetStarWarsCharacters {
    allPeople {
      people {
        name
        species {
          skinColors
        }
      }
    }
  }
`;

const StarWarsCharacters = () => {
  const { loading, error, data } = useQuery(GET_STAR_WARS_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: "100%" }}>
      <ChracterDataListView
        title={"Star Wars Characters"}
        data={data.allPeople.people}
      />
    </div>
  );
};

export default StarWarsCharacters;
