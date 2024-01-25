import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function BasicDateField({formData, setFormData}) {
    // console.log(formData)
    const handleChange = (dob) => {
        // console.log(dob);
        setFormData({ ...formData, dob: dob.$d });
      }

      
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
        name="dob"
        // value={formData.dob || ''}
        onChange={handleChange}
        label="DOB"
        className="mt-1 block w-full" 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}