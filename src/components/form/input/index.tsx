import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error: FieldError;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (props, ref): JSX.Element => {
        const { title, error, ...rest } = props;

        return (
            <div className="field-component">
                <label htmlFor={rest.id}>{title}</label>
                <input {...rest} ref={ref} />
                {error && <span id="error">{error.message}</span>}
            </div>
        );
    },
);
