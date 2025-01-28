import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfiguratorForm from "@/components/ConfiguratorForm";
import ConfigurationsList from "@/components/ConfigurationsList";
import ConfigurationDetails from "@/components/ConfigurationDetails";
import { Configuration } from "@/types/configurator";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null);

  const handleConfigurationSuccess = (config: Configuration) => {
    setSelectedConfig(config);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8">Заказать конфигурацию</h1>
        <Button
          size="lg"
          onClick={() => setIsFormOpen(true)}
          className="text-xl px-8 py-6"
        >
          Подобрать сборку
        </Button>

        <ConfiguratorForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleConfigurationSuccess}
        />

        {selectedConfig && (
          <ConfigurationDetails
            config={selectedConfig}
            isOpen={!!selectedConfig}
            onClose={() => setSelectedConfig(null)}
          />
        )}
      </div>

      <div className="w-1/5 p-4 border-l">
        <ConfigurationsList />
      </div>
    </div>
  );
};

export default Index;