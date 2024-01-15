import { useQuery, gql } from "@apollo/client";
import VehiclesDataListView from "../../components/vehicles-data-list-view/VehiclesDataListView";

const GET_STAR_WARS_VEHICLES = gql`
  query GetStarWarsVehicles {
    allVehicles {
      vehicles {
        name
      }
    }
  }
`;

const StarWarsVehicles = () => {
  const { loading, error, data } = useQuery(GET_STAR_WARS_VEHICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: "100%" }}>
      <VehiclesDataListView
        title={"Star Wars Vehicles"}
        data={data.allVehicles.vehicles}
      />
    </div>
  );
};

export default StarWarsVehicles;
