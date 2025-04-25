import { Space } from "antd";
import { Form } from "@rjsf/antd";
import validator from '@rjsf/validator-ajv8';
import { toJson, useGlobalContext } from "../GlobalContext";

export const SchemaForm = () => {
    const { schema, formData, setFormData } = useGlobalContext();

    return (
      <div style={{
        padding: '0 5px',
        overflowY: 'auto',
        height: 'calc(100vh - 100px)',
      }}>
        <Form
          schema={JSON.parse(schema)}
          validator={validator}
          formData={formData ? JSON.parse(formData) : undefined}
          onChange={(onSubmit, id) => {
            setFormData(toJson(onSubmit.formData));
            console.log(
              onSubmit,
              id,
            );
          }}
          onSubmit={()=> {alert('submit')}}
        >
          <Space>
            {/* <Button type='submit' variant="contained">Save</Button> */}
            {/* <Button type='button'>Cancel</Button> */}
          </Space>
        </Form>
      </div>
    );
}
