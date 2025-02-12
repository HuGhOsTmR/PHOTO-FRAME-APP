import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const frames = ["/frames/1.png", "/frames/2.png", "/frames/3.png"];
const filters = ["none", "grayscale(100%)", "sepia(100%)", "invert(100%)"];

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
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
  border-radius: 20px;
  background: #f3f3f3;
`;

const StyledCanvas = styled.canvas`
  display: none;
`;

const DownloadButton = styled.button`
  padding: 10px 15px;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    background-color: #e64a2e;
  }
`;

const PhotoFrame = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("none");
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

  const handleMouseDown = (e) => {
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
    setPhotoSize((prevSize) => Math.min(Math.max(prevSize - e.deltaY * 0.1, 50), 200));
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
        ctx.filter = selectedFilter;
        ctx.drawImage(img, position.x, position.y, (photoSize / 100) * 300, (photoSize / 100) * 300);
        ctx.filter = "none";
        ctx.drawImage(frameImg, 0, 0, 300, 300);
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
                width: `${photoSize}%`,
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
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
          <h2>Filtros</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {filters.map((filter, index) => (
              <button key={index} onClick={() => setSelectedFilter(filter)} style={{ padding: "5px", cursor: "pointer" }}>
                {filter}
              </button>
            ))}
          </div>
          <DownloadButton onClick={handleDownload}>Descargar Imagen</DownloadButton>
        </>
      )}
    </FrameContainer>
  );
};

export default PhotoFrame;
