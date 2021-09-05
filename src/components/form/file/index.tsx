import React from 'react';
import { FieldError } from 'react-hook-form';
import { BiCamera } from 'react-icons/bi';

interface FileProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error: FieldError;
}

export const File = React.forwardRef<HTMLInputElement, FileProps>(
    (props, ref): JSX.Element => {
        const { title, error, ...rest } = props;

        return (
            <div className="field-component">
                <label htmlFor={rest.id}>{title}</label>
                <div className="file">
                    <label htmlFor={rest.id}>
                        <input {...rest} ref={ref} />
                        <button type="button">
                            <BiCamera size="16px" />
                            Escolher
                        </button>
                    </label>
                </div>
                {error && <span id="error">{error.message}</span>}
            </div>
        );
    },
);
