import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getSearched = async (name) => {
      try {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    getSearched(params.search); 

  }, [params.search]); 

  return (
    <Grid>
      {searchedRecipes && searchedRecipes.map((item) => (
        <Card key={item.id}>
          <Link to={'/recipe/' + item.id}>
          <img src={item.image} alt="" />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};


const Grid = styled.div `
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 2rem;
`;

const Card = styled.div `
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration: none;
    }

    h4{
        text-align: center;
        padding: 1rem;
    }

`;


export default Searched;
