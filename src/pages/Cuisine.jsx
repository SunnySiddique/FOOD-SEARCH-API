import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Cuisine = () => {

    const [cuisine, setCuisine] = useState([]);
    const params = useParams();

    useEffect(() => {
        getCuisine(params.type)
    },[params.type])
    

   const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}`)
    const recipes = await data.json();
    setCuisine(recipes.results);
    
   }

   return (
    <Grid
      animate={{opacity: 1}}
      initial= {{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      {cuisine && cuisine.map((items) => (
        <Card key={items.id}>
          <Link to={"/recipe/" + items.id}>
          <img src={items.image} alt="" />
          <h4>{items.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
  
    
}


const Grid = styled(motion.div) `
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


export default Cuisine
