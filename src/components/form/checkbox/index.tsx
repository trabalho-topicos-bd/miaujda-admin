import React from 'react';
import { FieldError } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error: FieldError;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (props, ref): JSX.Element => {
        const { title, error, ...rest } = props;

        return (
            <div className="field-component">
                <label htmlFor={rest.id}>{title}</label>
                <label className="checkbox" htmlFor={rest.id}>
                    <input {...rest} type="checkbox" ref={ref} />
                    <span />
                </label>
                {error && <span id="error">{error.message}</span>}
            </div>
        );
    },
);
