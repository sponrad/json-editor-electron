import { createContext, useContext, useMemo, useState } from 'react';
import { numbersAndWidgets } from './sampleSchemas';

 /*
    only adding this since I intend to not have everything in App.tsx forever lol
  */

interface IGlobalContextProps {
  schema: string;
  setSchema: (newSchema: string) => void;
  formValues: string;
  setFormValues: (newFormValues: string) => void;
}

const toJson = (val: unknown) => JSON.stringify(val, null, 2);

const GlobalContext = createContext<IGlobalContextProps>({} as IGlobalContextProps);
GlobalContext.displayName = 'Global Context';

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [schema, setSchema] = useState<string>(toJson(numbersAndWidgets));
  const [formValues, setFormValues] = useState<string>('');

  const value = useMemo<IGlobalContextProps>(
    () => ({
      schema,
      setSchema,
      formValues,
      setFormValues,
    }),
    [schema, formValues],
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = (): IGlobalContextProps => {
  return useContext(GlobalContext);
};
