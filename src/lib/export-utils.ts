// Utilitários de exportação para CSV e JSON

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  data: T[],
  headers: { key: keyof T; label: string }[]
) {
  if (!data || !data.length) return;

  const headerRow = headers.map((h) => `"${h.label}"`).join(";");
  const rows = data.map((item) => {
    return headers
      .map((h) => {
        const val = item[h.key];
        if (val === null || val === undefined) return '""';
        if (typeof val === "number") {
          return `"${val.toString().replace(".", ",")}"`;
        }
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(";");
  });

  const csvContent = "\uFEFF" + [headerRow, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, `${filename}.csv`);
}

export function exportToJson(filename: string, data: any) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
  triggerDownload(blob, `${filename}.json`);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
