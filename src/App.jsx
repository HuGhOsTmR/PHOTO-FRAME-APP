import styled from "styled-components";

// Estilos mejorados para el título y el banner
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Banner = styled.div`
  background: linear-gradient(135deg, #ff6f61, #ff8c42); /* Colores vibrantes */
  padding: 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  background: linear-gradient(90deg, rgba(255, 87, 34, 1), rgba(255, 193, 7, 1));
  -webkit-background-clip: text;
  color: transparent;
`;

const PhotoFrameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const App = () => {
  return (
    <Container>
      {/* Banner */}
      <Banner>
        ¡Tuto Frames!
      </Banner>

      {/* Título atractivo */}
      <Title>Tuto Frames</Title>

      {/* Componente de foto con marco */}
      <PhotoFrameContainer>
        <PhotoFrame />
      </PhotoFrameContainer>
    </Container>
  );
};

export default App;

