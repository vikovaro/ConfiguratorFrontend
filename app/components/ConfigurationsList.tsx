import React, { useEffect, useState } from "react";
import { Configuration } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (config: Configuration) => void;
}

const PAGE_SIZE = 5;

export default function ConfigurationsList({ open, onClose, onSelect }: Props) {
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("http://localhost:3001/configurator/all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
    })
      .then(res => res.json())
      .then(data => {
        setConfigs(data.configurations || []);
        setTotal(data.count || 0);
      })
      .finally(() => setLoading(false));
  }, [open, page]);

  if (!open) return null;

  return (
    <div className="w-full h-auto bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <>
            {configs.map((c) => (
              <div
                key={c.id}
                className="border rounded-md p-2 mb-1 cursor-pointer bg-white hover:bg-gray-50 w-full"
                onClick={() => onSelect(c)}
              >
                <div className="font-semibold">Сборка id: {c.id}</div>
                <div className="text-sm text-gray-700">{c.cpu.name} • {c.gpu.name} • {c.ram.capacity} ГБ RAM</div>
                <div className="font-bold mt-1">{c.price} ₽</div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 gap-2">
              <button
                className="px-4 py-2 bg-[#0a1128] text-white hover:bg-[#223366] transition disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-base"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Назад
              </button>
              <span className="text-sm">Страница {page} из {Math.ceil(total / PAGE_SIZE) || 1}</span>
              <button
                className="px-4 py-2 bg-[#0a1128] text-white hover:bg-[#223366] transition disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-base"
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(total / PAGE_SIZE)}
              >
                Вперед
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 