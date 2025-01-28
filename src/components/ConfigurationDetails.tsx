import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Configuration } from "@/types/configurator";

interface ConfigurationDetailsProps {
  config: Configuration;
  isOpen: boolean;
  onClose: () => void;
}

const ConfigurationDetails = ({ config, isOpen, onClose }: ConfigurationDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Детали конфигурации #{config.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Процессор</h3>
              <p>{config.cpu.name}</p>
              <p className="text-sm text-gray-500">
                {config.cpu.manufacturer} • {config.cpu.frequency} ГГц • {config.cpu.wattage}Вт
              </p>
              <p className="text-sm font-medium">{config.cpu.price} ₽</p>
            </div>
            <div>
              <h3 className="font-semibold">Видеокарта</h3>
              <p>{config.gpu.name}</p>
              <p className="text-sm text-gray-500">
                {config.gpu.manufacturer} • {config.gpu.frequency} ГГц • {config.gpu.wattage}Вт
              </p>
              <p className="text-sm font-medium">{config.gpu.price} ₽</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Материнская плата</h3>
              <p>{config.motherboard.name}</p>
              <p className="text-sm text-gray-500">
                {config.motherboard.manufacturer} • {config.motherboard.socket}
              </p>
              <p className="text-sm font-medium">{config.motherboard.price} ₽</p>
            </div>
            <div>
              <h3 className="font-semibold">Блок питания</h3>
              <p>{config.psu.name}</p>
              <p className="text-sm text-gray-500">
                {config.psu.manufacturer} • {config.psu.wattage}Вт
              </p>
              <p className="text-sm font-medium">{config.psu.price} ₽</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Оперативная память</h3>
            <p>{config.ram.name}</p>
            <p className="text-sm text-gray-500">
              {config.ram.manufacturer} • {config.ram.capacity} ГБ
            </p>
            <p className="text-sm font-medium">{config.ram.price} ₽</p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-lg font-semibold">
              Общая стоимость: {config.price} ₽
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationDetails;