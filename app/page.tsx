'use client';
import { useState } from "react";
import ConfiguratorModal from "./components/ConfiguratorModal";
import ConfigurationDetailsModal from "./components/ConfigurationDetailsModal";
import ConfigurationsList from "./components/ConfigurationsList";
import { Configuration } from "./types";

export default function Home() {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null);

  return (
    <div className="min-h-screen w-full flex bg-white relative overflow-x-hidden">
      {/* Центральная часть */}
      <div className="flex flex-col justify-center items-center min-h-screen max-w-[calc(100%-340px)] w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Заказать конфигурацию</h1>
        <button
          className="bg-[#0a1128] text-white px-6 py-3 rounded hover:bg-[#223366] transition text-lg"
          onClick={() => setShowConfigurator(true)}
        >
          Подобрать сборку
        </button>
      </div>
      {/* Вертикальная линия-разделитель */}
      <div className="hidden lg:block absolute top-0 right-[340px] h-full w-px bg-gray-200 z-20" />
      {/* Правая панель — минималистичная */}
      <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-[340px] max-w-full z-30 py-2">
        {/* Кнопки сверху */}
        <div className="flex flex-col gap-2 w-full items-center pt-2 pb-2 px-4">
          <a
            href="/admin"
            className="bg-[#0a1128] text-white px-4 py-2 rounded-lg hover:bg-[#223366] transition text-sm w-48 text-center"
          >
            Админ-панель
          </a>
          <button
            className="bg-[#0a1128] text-white px-4 py-2 rounded-lg hover:bg-[#223366] transition text-sm w-48"
            onClick={() => setShowList((v) => !v)}
          >
            {showList ? 'Скрыть сборки' : 'Показать все сборки'}
          </button>
        </div>
        {/* Список сборок */}
        <div className="flex-1 w-full overflow-y-auto px-4 pb-4">
          {showList && (
            <ConfigurationsList
              open={showList}
              onClose={() => setShowList(false)}
              onSelect={(config) => {
                setSelectedConfig(config);
                setShowDetails(true);
              }}
            />
          )}
        </div>
      </aside>
      {/* Модальные окна */}
      <ConfiguratorModal
        open={showConfigurator}
        onClose={() => setShowConfigurator(false)}
        onSuccess={(config) => {
          setSelectedConfig(config);
          setShowConfigurator(false);
          setShowDetails(true);
        }}
      />
      <ConfigurationDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        configuration={selectedConfig}
      />
    </div>
  );
}
