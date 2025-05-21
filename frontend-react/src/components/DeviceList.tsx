import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDevices } from "../context/DeviceContext";
import { getDevices, postDevice } from "../endpoints/api";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import DeviceForm from "./form/DeviceForm";
import styles from "./DeviceList.module.css";

type FormTypes = {
  name: string;
  status: "activo" | "inactivo";
};

function DeviceList() {
  const [form, setForm] = useState<FormTypes>({
    name: "",
    status: "inactivo",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [itemStatus, setItemStatus] = useState("todos");
  const { devices, setDevices } = useDevices();
  const navigate = useNavigate();

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateInputs() {
    if (!form.name || !form.status) {
      toast.error("No pueden haber campos vacíos");
      return true;
    }
    return false;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validateInputs()) return;

    try {
      const res = await postDevice({ ...form, id: devices.length + 1 });
      setDevices((prev) => [...prev, res.data]);
      setForm({ name: "", status: "inactivo" });
      toast.success("Dispositivo agregado con éxito");
      setIsModalOpen(false);
    } catch (error: any) {
      console.log(error.response?.status);

      if (error.response?.status === 400) {
        toast.error("El ID ya existe");
      } else {
        toast.error("Error al agregar dispositivo");
      }
    }
  }

  useEffect(() => {
    async function fetchDevices() {
      try {
        const devices = await getDevices();
        setDevices(devices.data);
        console.log("dispositivos", devices.data);
      } catch (error) {
        console.error("No se pudo obtener los dispositivos", error);
      }
    }
    fetchDevices();
  }, []);

  function navigateToDevice(id: number) {
    navigate(`/device/${id}`);
  }

  function openModal() {
    setIsModalOpen(true);
    document.body.classList.add(styles.noScroll);
  }

  function closeModal() {
    setIsModalOpen(false);
    document.body.classList.remove(styles.noScroll);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Lista de Dispositivos</h2>
          <button onClick={openModal} className={styles.addButton}>
            Agregar dispositivo
          </button>
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar dispositivo..."
              className={styles.searchInput}
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            {searchItem && (
              <button
                className={styles.clearButton}
                onClick={() => setSearchItem("")}
                type="button"
              >
                ×
              </button>
            )}
          </div>

          <div className={styles.filterContainer}>
            <select
              className={styles.filterSelect}
              value={itemStatus}
              onChange={(e) => setItemStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      {devices.length === 0 ? (
        <p className={styles.emptyMessage}>No hay dispositivos</p>
      ) : (
        <ul className={styles.deviceList}>
          {devices
            .filter(
              (device) =>
                device.name.toLowerCase().includes(searchItem.toLowerCase()) &&
                (itemStatus === "todos" || device.status === itemStatus)
            )
            .map(({ id, name, status }) => (
              <li
                key={id}
                className={styles.deviceItem}
                onClick={() => navigateToDevice(id)}
              >
                <div className={styles.deviceInfo}>
                  <span className={styles.deviceName}>{name}</span>
                  <span className={`${styles.deviceStatus} ${styles[status]}`}>
                    {status}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      )}

      {devices.length > 0 &&
        devices.filter(
          (device) =>
            device.name.toLowerCase().includes(searchItem.toLowerCase()) &&
            (itemStatus === "todos" || device.status === itemStatus)
        ).length === 0 && (
          <p className={styles.emptyMessage}>
            No se encontraron dispositivos con los filtros aplicados
          </p>
        )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <DeviceForm
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              form={form}
            />
          </div>
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            padding: "16px",
            borderRadius: "4px",
          },
          success: {
            iconTheme: {
              primary: "#4caf50",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f44336",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default DeviceList;
