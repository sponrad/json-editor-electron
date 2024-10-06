import { Box, createTheme, ThemeProvider, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { SchemaEditor } from './components/SchemaEditor';
import { SchemaForm } from './components/SchemaForm';
import { JsonOutputViewer } from './components/JsonOutputViewer';

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
      {value === index && children}
    </div>
  );
}

const App = () => {
  const [tab, setTab] = useState<ViewTab>(ViewTab.Form);

  const handleChange = (_: React.SyntheticEvent, newTab: ViewTab) => {
    setTab(newTab);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Grid container>
        <Grid item xs={4} sx={{ height: '100vh' }}>
         <SchemaEditor />
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
            <SchemaForm />
          </CustomTabPanel>

          <CustomTabPanel value={tab} index={ViewTab.Output}>
            <JsonOutputViewer />
          </CustomTabPanel>
        </Grid>
      </Grid>

    </ThemeProvider>
  )
};

export default App
