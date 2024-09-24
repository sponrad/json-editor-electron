// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { numbersAndWidgets } from './sampleSchemas';
import { Box, Button, createTheme, Stack, ThemeProvider, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import ReactJson from '@microlink/react-json-view';
import MonacoEditor from '@monaco-editor/react';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: ViewTab;
  value: ViewTab;
}

enum ViewTab {
  Schema,
  Form,
  Output,
}

const toJson = (val: unknown) => JSON.stringify(val, null, 2);

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const App = () => {
  const [tab, setTab] = useState<ViewTab>(ViewTab.Form);

  const handleChange = (event: React.SyntheticEvent, newTab: ViewTab) => {
    setTab(newTab);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Grid container>
        <Grid item xs={4} sx={{ height: '100vh' }}>
          <Stack direction="row" sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}>
            <Tab disabled label="Schema" />
          </Stack>
          <Box sx={{height: '100%'}}>
            <MonacoEditor
              language='json'
              value={toJson(numbersAndWidgets)}
              theme='vs-light'
              onChange={() => {}}
              height="100%"
              options={{
                minimap: {
                  enabled: false,
                },
                automaticLayout: true,
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={8} sx={{borderLeft: 1, borderColor: 'divider'}}>
          <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            zIndex: 2,
            bgcolor: 'background.default',
            }}>
            <Tabs
              value={tab}
              onChange={handleChange}
            >
              <Tab value={ViewTab.Form} label="Form" />
              <Tab value={ViewTab.Output} label="Output JSON" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tab} index={ViewTab.Form}>
            <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
              <Form
                schema={numbersAndWidgets}
                validator={validator}
                onSubmit={()=> {alert('submit')}}
              >
                <Stack direction="row" gap={2}>
                  <Button type='submit' variant="contained">Save</Button>
                  {/* <Button type='button'>Cancel</Button> */}
                </Stack>
              </Form>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={tab} index={ViewTab.Output}>
            <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
              <ReactJson
                src={numbersAndWidgets}
                displayObjectSize={false}
                enableClipboard={false}
                displayDataTypes={false}
              />
            </Box>
          </CustomTabPanel>
        </Grid>
      </Grid>

    </ThemeProvider>
  )
};

export default App
