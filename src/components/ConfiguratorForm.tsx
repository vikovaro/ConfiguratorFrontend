import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ConfiguratorRequest, Configuration, ErrorResponse } from "@/types/configurator";

interface ConfiguratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (config: Configuration) => void;
}

const ConfiguratorForm = ({ isOpen, onClose, onSuccess }: ConfiguratorFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ConfiguratorRequest>({
    price: 0,
    cpu: "",
    gpu: "",
    ram: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/configurator/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: errorData.message,
        });
        return;
      }

      onSuccess(data as Configuration);
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при отправке запроса",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Конфигуратор ПК</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Цена (обязательно)
            </label>
            <Input
                id="price"
                type="number"
                autoComplete="off"
                value={formData.price === 0 ? "" : formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, price: value === "" ? 0 : Number(value) });
                }}
                required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cpu" className="text-sm font-medium">
              Пожелания по CPU
            </label>
            <Input
              id="cpu"
              value={formData.cpu}
              onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gpu" className="text-sm font-medium">
              Пожелания по GPU
            </label>
            <Input
              id="gpu"
              value={formData.gpu}
              onChange={(e) => setFormData({ ...formData, gpu: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="ram" className="text-sm font-medium">
              Объем RAM (ГБ)
            </label>
            <Input
              id="ram"
              type="number"
              value={formData.ram || ""}
              onChange={(e) => setFormData({ ...formData, ram: Number(e.target.value) })}
            />
          </div>
          <Button type="submit" className="w-full">
            Отправить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfiguratorForm;