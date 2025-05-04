import React, { useState } from "react";

interface ConfiguratorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export default function ConfiguratorModal({ open, onClose, onSuccess }: ConfiguratorModalProps) {
  const [price, setPrice] = useState("");
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/configurator/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: Number(price),
          cpu: cpu || undefined,
          gpu: gpu || undefined,
          ram: ram ? Number(ram) : undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Ошибка запроса");
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">Конфигуратор ПК</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-1">Цена (обязательно)</label>
            <input
              type="number"
              required
              className="w-full border rounded px-3 py-2 text-base"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min={1}
            />
          </div>
          <div>
            <label className="block text-base mb-1">Пожелания по CPU</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-base"
              value={cpu}
              onChange={e => setCpu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base mb-1">Пожелания по GPU</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-base"
              value={gpu}
              onChange={e => setGpu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base mb-1">Объем RAM (ГБ)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-base"
              value={ram}
              onChange={e => setRam(e.target.value)}
              min={1}
            />
          </div>
          {error && <div className="text-red-500 text-base">{error}</div>}
          <button
            type="submit"
            className="bg-[#0a1128] text-white rounded py-2 mt-2 hover:bg-[#223366] transition text-base"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
} 