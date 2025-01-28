export interface ConfiguratorRequest {
  price: number;
  cpu?: string;
  gpu?: string;
  ram?: number;
}

export interface Component {
  id: number;
  manufacturer: string;
  name: string;
  price: number;
}

export interface CPU extends Component {
  socket: string;
  wattage: number;
  frequency: number;
}

export interface GPU extends Component {
  frequency: number;
  port: string;
  wattage: number;
}

export interface Motherboard extends Component {
  cpuManufacturer: string;
  socket: string;
  chipset: string;
  port: string;
}

export interface PSU extends Component {
  wattage: number;
}

export interface RAM extends Component {
  capacity: number;
}

export interface Configuration {
  id: number;
  cpuId: number;
  gpuId: number;
  motherboardId: number;
  psuId: number;
  ramId: number;
  price: number;
  createdAt: string;
  cpu: CPU;
  gpu: GPU;
  motherboard: Motherboard;
  psu: PSU;
  ram: RAM;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface ConfigurationsListRequest {
  limit: number;
  offset: number;
}