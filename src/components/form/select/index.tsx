import React from 'react';
import { FieldError } from 'react-hook-form';

export interface OptionData {
    value: number | string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    options: OptionData[];
    error: FieldError;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props, ref): JSX.Element => {
        const { title, options, error, ...rest } = props;

        return (
            <div className="field-component">
                <label htmlFor={rest.id}>{title}</label>
                <select {...rest} ref={ref}>
                    <option disabled>Selecione um item</option>
                    {options.map((option) => (
                        <option
                            key={`option-${option.value}`}
                            value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <span id="error">{error.message}</span>}
            </div>
        );
    },
);
