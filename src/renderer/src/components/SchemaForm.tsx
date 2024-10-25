import { Box, Stack } from "@mui/material";
import { Form } from "@rjsf/mui";
import validator from '@rjsf/validator-ajv8';
import { toJson, useGlobalContext } from "../GlobalContext";

export const SchemaForm = () => {
    const { schema, formData, setFormData } = useGlobalContext();

    return (
        <Box sx={{
            px: 3,
            overflowY: 'auto',
            height: 'calc(100vh - 100px)',
            '.unsupported-field': {
                'code': {
                padding: '2px 4px',
                fontSize: '90%',
                color: '#c7254e',
                backgroundColor: '#f9f2f4',
                borderRadius: 1,
                },
            },
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
              <Stack direction="row" gap={2}>
                  {/* <Button type='submit' variant="contained">Save</Button> */}
                  {/* <Button type='button'>Cancel</Button> */}
              </Stack>
            </Form>
        </Box>
    );
}
