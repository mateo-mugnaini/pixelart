"use client";
import styles from "./page.module.css";
import Canva from "./components/Canva/Canva";
import ColorPicker from "./pixelart/components/PanelRight/PanelRight";

export default function Home() {
  return (
    <div className={styles.ContenedorGeneral}>
      <div className={styles.ContenedorCanva}>
        <Canva />
      </div>
      <div className={styles.ContenedorColorPicker}>
        <ColorPicker />
      </div>
    </div>
  );
}
