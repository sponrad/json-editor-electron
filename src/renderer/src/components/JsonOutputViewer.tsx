import { Space, Button, Tabs } from "antd";
import { useGlobalContext } from "../GlobalContext";
import MonacoEditor from '@monaco-editor/react';

export const JsonOutputViewer = () => {
    const { formData } = useGlobalContext();

    return (
      <>
        <Space
          style={{
            width: '100%',
            borderBottom: '1px solid #434343',
            padding: '8px',
          }}>
          <Tabs
            items={[{ key: '1', label: 'Output', disabled: true }]}
          />
          <Button disabled>
            Open
          </Button>
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(formData);
            }}>
            Copy
          </Button>
          <Button
            onClick={() => {
              window.electronAPI.saveFile(formData);
            }}>
            Save
          </Button>
        </Space>
        <div style={{
          overflowY: 'auto',
          height: 'calc(100vh - 100px)'
        }}>
          <MonacoEditor
            language='json'
            value={formData}
            height="100%"
            options={{
              readOnly: true,
              domReadOnly: true,
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
            }}
          />
        </div>
      </>
    );
}
