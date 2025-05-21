import type { ChangeEvent, FormEvent } from "react";
import styles from "./DeviceForm.module.css";

type DeviceProps = {
  handleSubmit: (e: FormEvent) => void;
  form: {
    name: string;
    status: string;
  };
  handleInput: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

function DeviceForm({ handleSubmit, form, handleInput }: DeviceProps) {
  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Agregar nuevo dispositivo</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nombre del dispositivo"
            value={form.name}
            onChange={handleInput}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleInput}
            className={styles.select}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Agregar dispositivo
        </button>
      </form>
    </div>
  );
}

export default DeviceForm;
