import {
  createContext,
  useState,
  type ReactNode,
  type FC,
  useContext,
} from "react";

interface DeviceProvider {
  children: ReactNode;
}

export interface Devices {
  id: number;
  name: string;
  status: string;
}

interface DeviceContextType {
  devices: Devices[];
  setDevices: React.Dispatch<React.SetStateAction<Devices[]>>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: FC<DeviceProvider> = ({ children }) => {
  const [devices, setDevices] = useState<Devices[]>([]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
