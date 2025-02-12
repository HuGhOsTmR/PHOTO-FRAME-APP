import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const frames = ["/frames/1.png", "/frames/2.png", "/frames/3.png"];
const filters = ["none", "grayscale(100%)", "sepia(100%)", "invert(100%)"];

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DownloadButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #e64a2e;
  }
`;

const PhotoFrame = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [photoSize, setPhotoSize] = useState(100);
  const [photoPosition, setPhotoPosition] = useState({ x: 0, y: 0 });
  const [selectedFilter, setSelectedFilter] = useState("none");
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDownload = () => {
    if (!photo || !selectedFrame) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = photo;
    img.onload = () => {
      const frameImg = new Image();
      frameImg.src = selectedFrame;
      frameImg.onload = () => {
        canvas.width = 300;
        canvas.height = 300;

        // Aplicar filtro
        ctx.filter = selectedFilter;

        // Dibujar imagen en la posición seleccionada y con el tamaño ajustado
        ctx.drawImage(img, photoPosition.x, photoPosition.y, (photoSize / 100) * 300, (photoSize / 100) * 300);

        // Dibujar marco
        ctx.filter = "none"; // No aplicar filtro al marco
        ctx.drawImage(frameImg, 0, 0, 300, 300);

        // Descargar imagen
        const link = document.createElement("a");
        link.download = "foto_con_marco.png";
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
          <ImageWrapper>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <img
              src={photo}
              alt="Foto"
              style={{
                width: `${photoSize}%`,
                position: "absolute",
                top: `${photoPosition.y}px`,
                left: `${photoPosition.x}px`,
                filter: selectedFilter,
                borderRadius: "50%",
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

          {/* Ajustes de imagen */}
          <h2>Ajustar Foto</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>
              Tamaño:
              <input type="range" min="50" max="150" value={photoSize} onChange={(e) => setPhotoSize(e.target.value)} />
            </label>
            <label>
              Mover X:
              <input type="range" min="-50" max="50" value={photoPosition.x} onChange={(e) => setPhotoPosition({ ...photoPosition, x: e.target.value })} />
            </label>
            <label>
              Mover Y:
              <input type="range" min="-50" max="50" value={photoPosition.y} onChange={(e) => setPhotoPosition({ ...photoPosition, y: e.target.value })} />
            </label>
          </div>

          {/* Filtros */}
          <h2>Filtros</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {filters.map((filter, index) => (
              <button key={index} onClick={() => setSelectedFilter(filter)} style={{ padding: "5px", cursor: "pointer" }}>
                {filter}
              </button>
            ))}
          </div>

          <DownloadButton onClick={handleDownload}>Descargar Imagen</DownloadButton>

          {/* Compartir en redes sociales */}
          <h2>Compartir</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => window.open(`https://api.whatsapp.com/send?text=Mira mi foto con marco!`, "_blank")}
              style={{ padding: "10px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              WhatsApp
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=URL_DE_TU_IMAGEN`, "_blank")}
              style={{ padding: "10px", backgroundColor: "#1877F2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              Facebook
            </button>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Mira mi foto con marco!`, "_blank")}
              style={{ padding: "10px", backgroundColor: "#1DA1F2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              Twitter
            </button>
          </div>
        </>
      )}
    </FrameContainer>
  );
};

export default PhotoFrame;
