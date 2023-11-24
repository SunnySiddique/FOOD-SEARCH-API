import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Define styled components here outside the Veggie component
const Wrapper = styled.div `
  margin: 4rem 0rem;
`;

const Card = styled.div `
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div `
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
      getVeggie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      try {
        const res = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=20&tags=vegetarian`);

        localStorage.setItem('veggie', JSON.stringify(res.data.recipes));

        setVeggie(res.data.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
       <Wrapper>
       <h3>Our Vegetarian Picks</h3>

        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}>
          {veggie.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Card>
                    <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
        </Splide>
      </Wrapper>
    </div>
  );
}

export default Veggie;
