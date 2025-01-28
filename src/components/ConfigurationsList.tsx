import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import ConfigurationDetails from "./ConfigurationDetails";

const ConfigurationsList = () => {
    const { toast } = useToast();
    const [configurations, setConfigurations] = useState([]);
    const [offset, setOffset] = useState(0);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const limit = 5;

    const fetchConfigurations = async () => {
        try {
            const response = await fetch("http://localhost:3001/configurator/all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ limit, offset }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при загрузке конфигураций");
            }

            const data = await response.json();
            setConfigurations(data.configurations);
            setTotalCount(data.count);
            setIsDataFetched(true); // Устанавливаем флаг, что данные загружены
        } catch (error) {
            toast({
                variant: "destructive",
                title: `Ошибка`,
                description: error.message,
            });
        }
    };

    const handleNextPage = () => {
        if (offset + limit < totalCount) {
            setOffset((prevOffset) => prevOffset + limit); // Устанавливаем новое значение offset
        }
    };

    const handlePrevPage = () => {
        if (offset >= limit) {
            setOffset((prevOffset) => prevOffset - limit); // Устанавливаем новое значение offset
        }
    };

    useEffect(() => {
        if (isDataFetched) {
            fetchConfigurations();
        }
    }, [offset]);

    const toggleConfigurations = () => {
        if (isDataFetched) {
            // Если данные уже загружены, сбрасываем состояние
            setConfigurations([]);
            setTotalCount(0);
            setIsDataFetched(false);
        } else {
            // Если данные не загружены, загружаем их
            fetchConfigurations();
        }
    };

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="space-y-4">
            <div className="flex justify-center mt-2">
                <Button variant="default" onClick={() => window.location.href = "/admin"}>
                    Админ-панель
                </Button>
            </div>

            <div className="flex justify-center">
                <Button onClick={toggleConfigurations}>
                    {isDataFetched ? "Скрыть сборки" : "Показать все сборки"}
                </Button>
            </div>

            {isDataFetched && configurations.length > 0 && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        {configurations.map((config) => (
                            <div
                                key={config.id}
                                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                                onClick={() => setSelectedConfig(config)}
                            >
                                <p className="font-medium">Сборка id: {config.id}</p>
                                <p className="text-sm text-gray-500">
                                    {config.cpu.name} • {config.gpu.name} • {config.ram.capacity} ГБ RAM
                                </p>
                                <p className="text-sm font-medium">{config.price} ₽</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={handlePrevPage}
                            disabled={offset === 0}
                        >
                            Назад
                        </Button>
                        <p className="text-sm text-gray-500">
                            Страница {currentPage} из {totalPages}
                        </p>
                        <Button
                            variant="outline"
                            onClick={handleNextPage}
                            disabled={offset + limit >= totalCount}
                        >
                            Вперед
                        </Button>
                    </div>
                </div>
            )}

            {selectedConfig && (
                <ConfigurationDetails
                    config={selectedConfig}
                    isOpen={!!selectedConfig}
                    onClose={() => setSelectedConfig(null)}
                />
            )}

        </div>
    );
};

export default ConfigurationsList;