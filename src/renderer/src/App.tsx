import { createTheme, ThemeProvider, useTheme, Stack, ToggleButton } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SchemaEditor } from './components/SchemaEditor';
import { SchemaForm } from './components/SchemaForm';
import { JsonOutputViewer } from './components/JsonOutputViewer';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useLocalStorageState from 'use-local-storage-state'

const appTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const theme = useTheme();
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
    <ThemeProvider theme={appTheme}>
      <CssBaseline />

      <Stack direction="row" sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'center',
        }}>
        <ToggleButton
          value="check"
          selected={showEditor}
          onClick={() => setShowEditor(!showEditor)}
        >
          Schema
        </ToggleButton>
        <ToggleButton
          value="check"
          selected={showForm}
          onClick={() => setShowForm(!showForm)}
        >
          Form
        </ToggleButton>
        <ToggleButton
          value="check"
          selected={showOutput}
          onClick={() => setShowOutput(!showOutput)}
        >
          Output
        </ToggleButton>
      </Stack>

      <PanelGroup direction="horizontal" autoSaveId="persistenceApp">
        {showEditor &&
        <>
          <Panel defaultSize={35} order={1} minSize={20}>
            <SchemaEditor />
          </Panel>
          <PanelResizeHandle
            style={{width: '2px', backgroundColor: theme.palette.divider}}
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
            style={{width: '2px', backgroundColor: theme.palette.divider}}
          />

          <Panel defaultSize={25} order={3} minSize={20}>
            <JsonOutputViewer />
          </Panel>
        </>
        }
      </PanelGroup>
    </ThemeProvider>
  )
};

export default App
