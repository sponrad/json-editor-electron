import { Box, Button, Stack, Tab } from "@mui/material";
import MonacoEditor from '@monaco-editor/react';
import { useRef } from "react";
import type monaco from 'monaco-editor';
import { useGlobalContext } from "../GlobalContext";

export const SchemaEditor = () => {
    const schemaEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { setSchema, schema, formData, setFormData } = useGlobalContext();

    return (<>
      <Stack
        direction="row"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}>
        <Tab disabled label="Schema" />
        {/*
        <Button
          onClick={() => {
            schemaEditorRef?.current?.getAction('editor.action.formatDocument')?.run();
          }}
        >
          Auto-Format
        </Button>
        */}
        <Button disabled>
          Open
        </Button>
        <Button disabled>
          Save
        </Button>
      </Stack>
      <Box sx={{height: '100%'}}>
        <MonacoEditor
          onMount={(editor) => {schemaEditorRef.current = editor;}}
          language='json'
          defaultValue={schema}
          theme='vs-dark'
          onChange={(newSchema) => {
            if (newSchema) {
              // stringify+parse lets json schema errors stay in the editor for fixing
              // rather than hard crashing the Form / App
              setSchema(JSON.stringify(JSON.parse(newSchema)))

              // remove all form data fields that are not in the newSchema
              // TODO move out somewhere nicer
              const parsedFormData = JSON.parse(formData);
              const formDataKeys = Object.keys(parsedFormData);
              const schemaKeys = Object.keys(JSON.parse(newSchema)?.properties);
              const dataKeysNotInSchema = formDataKeys.filter(formDataKey => !schemaKeys.includes(formDataKey));
              dataKeysNotInSchema.forEach(deleteKey => delete parsedFormData[deleteKey]);
              setFormData(JSON.stringify(parsedFormData, null, 2));
            }
          }}
          height="100%"
          options={{
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
          }}
        />
      </Box>
    </>);
};
