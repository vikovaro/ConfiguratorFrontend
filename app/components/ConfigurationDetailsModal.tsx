import React from "react";
import { Configuration } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  configuration: Configuration | null;
}

export default function ConfigurationDetailsModal({ open, onClose, configuration }: Props) {
  if (!open || !configuration) return null;
  const { cpu, gpu, motherboard, psu, ram, price, id } = configuration;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;f 
        </button>
        <h2 className="text-2xl font-semibold mb-6">Детали конфигурации #{id}</h2>
        <div className="grid grid-cols-2 gap-6 text-base mb-6">
          <div>
            <div className="font-bold">Процессор</div>
            <div className="text-lg">{cpu.name}</div>
            <div className="text-gray-500 text-base">{cpu.manufacturer} • {cpu.frequency} ГГц • {cpu.wattage}Вт</div>
            <div className="font-semibold mt-1 text-lg">{cpu.price} ₽</div>
          </div>
          <div>
            <div className="font-bold">Видеокарта</div>
            <div className="text-lg">{gpu.name}</div>
            <div className="text-gray-500 text-base">{gpu.manufacturer} • {gpu.frequency} ГГц • {gpu.wattage}Вт</div>
            <div className="font-semibold mt-1 text-lg">{gpu.price} ₽</div>
          </div>
          <div>
            <div className="font-bold">Материнская плата</div>
            <div className="text-lg">{motherboard.name}</div>
            <div className="text-gray-500 text-base">{motherboard.manufacturer} • {motherboard.socket}</div>
            <div className="font-semibold mt-1 text-lg">{motherboard.price} ₽</div>
          </div>
          <div>
            <div className="font-bold">Блок питания</div>
            <div className="text-lg">{psu.name}</div>
            <div className="text-gray-500 text-base">{psu.manufacturer} • {psu.wattage}Вт</div>
            <div className="font-semibold mt-1 text-lg">{psu.price} ₽</div>
          </div>
          <div>
            <div className="font-bold">Оперативная память</div>
            <div className="text-lg">{ram.name}</div>
            <div className="text-gray-500 text-base">{ram.manufacturer} • {ram.capacity} ГБ</div>
            <div className="font-semibold mt-1 text-lg">{ram.price} ₽</div>
          </div>
        </div>
        <div className="border-t pt-4 text-2xl font-bold text-right">Общая стоимость: {price} ₽</div>
      </div>
    </div>
  );
} 