import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error: FieldError;
    loading?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (props, ref): JSX.Element => {
        const { title, error, loading = false, ...rest } = props;

        return (
            <div className="field-component">
                <label htmlFor={rest.id}>{title}</label>
                <div>
                    <input {...rest} ref={ref} />
                    {loading && (
                        <CircularProgress
                            id="field-loading"
                            color="inherit"
                            size={20}
                        />
                    )}
                </div>
                {error && <span id="error">{error.message}</span>}
            </div>
        );
    },
);
