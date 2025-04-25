import { Space, Button, Tabs } from "antd";
import MonacoEditor from '@monaco-editor/react';
import { useRef } from "react";
import type monaco from 'monaco-editor';
import { toJson, useGlobalContext } from "../GlobalContext";

export const SchemaEditor = () => {
    const schemaEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { setSchema, schema, formData, setFormData } = useGlobalContext();

    return (<>
      <Space
        style={{
        width: '100%',
        borderBottom: '1px solid #434343',
        padding: '8px',
              }}>
        <Tabs
          items={[{ key: '1', label: 'Schema', disabled: true }]}
        />
        <Button disabled>
          Open
        </Button>
        <Button disabled>
          Save
        </Button>
      </Space>
      <div style={{ height: '100%' }}>
        <MonacoEditor
          onMount={(editor) => {schemaEditorRef.current = editor;}}
          language='json'
          defaultValue={schema}
          onChange={(newSchema) => {
            if (newSchema) {
              // stringify+parse lets json schema errors stay in the editor for fixing
              // rather than hard crashing the Form / App
              setSchema(toJson(JSON.parse(newSchema)))

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
      </div>
    </>);
};
