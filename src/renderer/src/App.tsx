import { ConfigProvider, Space, Switch } from 'antd';
import { SchemaEditor } from './components/SchemaEditor';
import { SchemaForm } from './components/SchemaForm';
import { JsonOutputViewer } from './components/JsonOutputViewer';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useLocalStorageState from 'use-local-storage-state'

const App = () => {
  const [showEditor, setShowEditor] = useLocalStorageState('showEditor', {
    defaultValue: true,
  });
  const [showForm, setShowForm] = useLocalStorageState('showForm', {
    defaultValue: true,
  });
  const [showOutput, setShowOutput] = useLocalStorageState('showOutput', {
    defaultValue: true,
  });

  return (
    <ConfigProvider>
      <Space
        style={{
          width: '100%',
          borderBottom: '1px solid #434343',
          justifyContent: 'center',
          padding: '8px 0',
        }}
      >
        <Switch
          checked={showEditor}
          onChange={() => setShowEditor(!showEditor)}
          checkedChildren="Schema"
          unCheckedChildren="Schema"
        />
        <Switch
          checked={showForm}
          onChange={() => setShowForm(!showForm)}
          checkedChildren="Form"
          unCheckedChildren="Form"
        />
        <Switch
          checked={showOutput}
          onChange={() => setShowOutput(!showOutput)}
          checkedChildren="Output"
          unCheckedChildren="Output"
        />
      </Space>

      <PanelGroup direction="horizontal" autoSaveId="persistenceApp">
        {showEditor &&
        <>
          <Panel defaultSize={35} order={1} minSize={20}>
            <SchemaEditor />
          </Panel>
          <PanelResizeHandle
            style={{width: '2px', backgroundColor: '#434343'}}
          />
        </>
        }

        {showForm &&
        <Panel defaultSize={40} order={2} minSize={20}>
          <SchemaForm />
        </Panel>
        }

        {showOutput &&
        <>
          <PanelResizeHandle
            style={{width: '2px', backgroundColor: '#434343'}}
          />

          <Panel defaultSize={25} order={3} minSize={20}>
            <JsonOutputViewer />
          </Panel>
        </>
        }
      </PanelGroup>
    </ConfigProvider>
  )
};

export default App
