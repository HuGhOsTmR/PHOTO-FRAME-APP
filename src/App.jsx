import styled from "styled-components";
import PhotoFrame from './components/PhotoFrame';

const Container = styled.div`
  background-color: white; /* Fondo blanco */
  color: #333; /* Color de texto oscuro para contraste */
  min-height: 100vh; /* Asegura que ocupe toda la altura */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  color: #007bff; /* Azul para el encabezado */
`;

const Button = styled.button`
  background-color: #ff0000; /* Rojo para el botón */
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #cc0000; /* Rojo más oscuro al pasar el cursor */
  }
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
        <img src="../public/frames/banner.jpeg" style={{ width: '100%', height: 'auto' }} alt="Banner" />

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

