import Canva from "./components/Canva/Canva";
import style from "./page.module.css";
import PanelRight from "./components/PanelRight/PanelRight";
const PixelArtPage = () => {
  return (
    <div className={style.ContenedorGeneral}>
      <div className={style.ContenedorCanva}>
        <Canva />
      </div>
      <div className={style.ContenedorColorPicker}>
        <PanelRight />
      </div>
    </div>
  );
};

export default PixelArtPage;
