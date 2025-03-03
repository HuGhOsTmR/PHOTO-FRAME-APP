import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const frames = ["/frames/5.png", "/frames/2.png", "/frames/1.png"];

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  max-width: 500px;
  margin: auto;

`;
const StyledButton = styled.button`
  background-color: #007bff; /* Azul */
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3; /* Azul más oscuro */
  }
`;

const StyledLink = styled.a`
  color: #ff0000; /* Rojo para los enlaces */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: grab;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;


const StyledCanvas = styled.canvas`
  display: none;
`;

const DownloadButton = styled.button`
  padding: 12px 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const PhotoFrame = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [photoSize, setPhotoSize] = useState(100);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !imageRef.current) return;
    setPosition((prev) => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleWheel = (e) => {
  e.preventDefault();

  setPhotoSize((prevSize) => {
    let newSize = prevSize - e.deltaY * 0.05; // Ajusta la sensibilidad del zoom

    // Mantener el tamaño dentro de un rango válido
    newSize = Math.max(50, Math.min(newSize, 150)); // Mínimo 50%, Máximo 150%

    return newSize;
  });
};


const handleDownload = () => {
  if (!photo || !selectedFrame) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // Asegurar que las dimensiones coincidan con el marco
  const canvasSize = 2048; // Mismo tamaño del ImageWrapper
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const img = new Image();
  img.src = photo;
  img.crossOrigin = "anonymous"; // Evita problemas de CORS si usas imágenes externas
  
  img.onload = () => {
    const frameImg = new Image();
    frameImg.src = selectedFrame;
    frameImg.crossOrigin = "anonymous";

    frameImg.onload = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Crear un recorte circular para la imagen
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Dibujar la imagen de la foto centrada
      const imgSize = (photoSize / 100) * canvasSize;
      const imgX = (canvasSize - imgSize) / 2 + position.x;
      const imgY = (canvasSize - imgSize) / 2 + position.y;
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      // Restaurar el área de dibujo para agregar el marco
      ctx.restore();

      // Dibujar el marco sobre la imagen
      ctx.drawImage(frameImg, 0, 0, canvasSize, canvasSize);

      // Descargar la imagen
      const link = document.createElement("a");
      link.download = "Tuto_Frame.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };
};


  return (
    <FrameContainer>
      <h2>Sube tu Foto</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {photo && (
        <>
         <ImageWrapper
            ref={imageWrapperRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          >
            <StyledCanvas ref={canvasRef} />
            <img
              ref={imageRef}
              src={photo}
              alt="Foto"
              style={{
                width: "100%", // Ajusta la imagen al contenedor
                height: "100%", // Asegura que cubra todo el espacio               
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
                borderRadius: "50%", // Mantiene la imagen redonda
                objectFit: "cover", // Hace que la imagen se ajuste sin distorsionarse
                objectPosition: "center", // Asegura que la imagen esté centrada dentro del círculo
              }}
            />
            {selectedFrame && (
              <img
                src={selectedFrame}
                alt="Marco"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </ImageWrapper>

          <h2>Elige un Marco</h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {frames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Marco ${index + 1}`}
                onClick={() => setSelectedFrame(frame)}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: selectedFrame === frame ? "3px solid red" : "3px solid transparent",
                }}
              />
            ))}
          </div>
          <DownloadButton onClick={handleDownload}>Descargar Imagen</DownloadButton>
        </>
      )}
    </FrameContainer>
  );
};

export default PhotoFrame;
