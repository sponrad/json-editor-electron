import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { numbersAndWidgets } from './sampleSchemas';
import { Box, Button, createTheme, Stack, ThemeProvider, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import JsonView from '@uiw/react-json-view';

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
        <Grid item xs={3}>
          Sidebar (file browser... or?)
        </Grid>

        <Grid item xs={9}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChange}
            >
              <Tab value={ViewTab.Schema} label="Schema" />
              <Tab value={ViewTab.Form} label="Form" />
              <Tab value={ViewTab.Output} label="Output JSON" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tab} index={ViewTab.Schema}>
            <JsonView value={numbersAndWidgets} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={ViewTab.Form}>
            <Form schema={numbersAndWidgets} validator={validator} onSubmit={()=> {alert('submit')}}>
              <Stack direction="row" gap={2}>
                <Button type='submit' variant="contained">Save</Button>
                {/* <Button type='button'>Cancel</Button> */}
              </Stack>
            </Form>
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={ViewTab.Output}>
            Render values from the form with a save button
          </CustomTabPanel>
        </Grid>
      </Grid>

    </ThemeProvider>
  )
};

export default App
