import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`;

        const response = await fetch(url);

        const detailData = await response.json();
        setDetails(detailData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 style={{
                  fontSize: "18px",
                  marginTop: "24px",
                  width: "132%",
                  marginBottom: "31px",
                  textAlign: "justify",
                  lineHeight: "25px"
              
            }} dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <p style={{
                  fontSize: "18px",
                  marginTop: "24px",
                  width: "132%",
                  marginBottom: "31px",
                  textAlign: "justify",
                  lineHeight: "25px"
              
            }} dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients &&
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    margin-left: 1px;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid balck;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
