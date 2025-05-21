import { useParams } from "react-router";
import { useDevices } from "../context/DeviceContext";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import styles from "./DeviceDetail.module.css";
import { useEffect } from "react";

export default function DeviceDetail() {
  const { id } = useParams();
  const { devices } = useDevices();
  const navigate = useNavigate();
  const device = devices.find((d) => d.id === Number(id));
  const currentIndex = devices.findIndex((d) => d.id === Number(id));

  const goToDevice = (direction: "prev" | "next") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < devices.length) {
      navigate(`/device/${devices[newIndex].id}`);
    }
  };

  useEffect(() => {
    console.log("current index", currentIndex);
  }, [currentIndex]);

  if (!device)
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Dispositivo no encontrado</h2>

          <button
            className={styles.backButton}
            onClick={() => navigate("/", { replace: true })}
          >
            <Home style={{ marginRight: 10 }} /> Home
          </button>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {id === "1" ? (
          <button className={styles.backButton} onClick={() => navigate("/")}>
            <Home style={{ marginRight: 10 }} /> Home
          </button>
        ) : (
          <button
            className={styles.backButton}
            onClick={() => goToDevice("prev")}
          >
            <ArrowLeft style={{ marginRight: 10 }} /> Anterior
          </button>
        )}

        {currentIndex < devices.length - 1 && (
          <button
            className={styles.backButton}
            onClick={() => goToDevice("next")}
          >
            Siguiente <ArrowRight style={{ marginLeft: 10 }} />
          </button>
        )}
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Detalles del Dispositivo</h1>

        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>ID</span>
            <span className={styles.detailValue}>{device.id}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Nombre</span>
            <span className={styles.detailValue}>{device.name}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Estado</span>
            <span className={`${styles.statusBadge} ${styles[device.status]}`}>
              {device.status}
            </span>
          </div>
        </div>
      </div>

      {id !== "1" && (
        <div style={{justifySelf: "center", marginTop: 10}}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/", { replace: true })}
          >
            <Home style={{ marginRight: 10 }} /> Home
          </button>
        </div>
      )}
    </div>
  );
}
