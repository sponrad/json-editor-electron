import { Box, Button, Stack, Tab } from "@mui/material";
import { useGlobalContext } from "../GlobalContext";
import MonacoEditor from '@monaco-editor/react';

export const JsonOutputViewer = () => {
    const { formData } = useGlobalContext();

    return (
      <>
        <Stack
          direction="row"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}>
          <Tab disabled label="Output" />
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
        </Stack>
        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
          <MonacoEditor
            language='json'
            value={formData}
            theme='vs-dark'
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
        </Box>
      </>
    );
}
