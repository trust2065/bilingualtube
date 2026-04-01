import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { getSyncSettings, setSyncSettings } from '@/lib/settings';
import '../options/style.css'; // 確保有載入 Tailwind 樣式

function Popup() {
  const [enabled, setEnabled] = useState(true);

  // 初始化時讀取設定
  useEffect(() => {
    getSyncSettings().then(settings => {
      if (settings.enableTranslation !== undefined) {
        setEnabled(settings.enableTranslation);
      }
    });
  }, []);

  // 切換開關並存檔
  const toggle = async () => {
    const newVal = !enabled;
    setEnabled(newVal);
    const currentSettings = await getSyncSettings();
    await setSyncSettings({ ...currentSettings, enableTranslation: newVal });
  };

  // 保留一個可以連到原本完整設定頁的按鈕
  const openOptions = () => browser.runtime.openOptionsPage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">BilingualTube</h1>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="w-4 h-4 accent-primary"
        />
        <span className="text-sm">
          {enabled ? '雙語字幕：已開啟' : '雙語字幕：已關閉'}
        </span>
      </label>

      <hr className="border-border" />

      <button
        onClick={openOptions}
        className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
      >
        ⚙️ 開啟進階設定
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Popup />);