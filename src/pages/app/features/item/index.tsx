import React, { useCallback, useMemo } from 'react';
import { FeatureData } from '../../../../types/feature';

interface FeatureItemProps {
    item: FeatureData;
    isSelected?: boolean;
    setSelected?: React.Dispatch<React.SetStateAction<FeatureData | null>>;
    header?: boolean;
}

export const FeatureItem = (props: FeatureItemProps): JSX.Element => {
    const { item, isSelected, setSelected, header = false } = props;

    const buttonClasses = useMemo(
        () => `unstyled ${isSelected ? 'selected' : ''}`,
        [isSelected],
    );

    const handleClick = useCallback(() => {
        if (!header) {
            setSelected(isSelected ? null : item);
        }
    }, [header, isSelected, item, setSelected]);

    return (
        <li>
            <button
                className={buttonClasses}
                type="button"
                onClick={handleClick}>
                <h4>{header ? 'Nome' : item.pet.name}</h4>
                <span>{header ? 'Exp.' : item.experience}</span>
                <span>{header ? 'Custo' : item.cost}</span>
                <span>{header ? 'Carinho' : item.love}</span>
                <span>{header ? 'Sossego' : item.peace}</span>
                <span>{header ? 'Intelig.' : item.intelligence}</span>
                <span>{header ? 'Lealdade' : item.loyalty}</span>
                <span>{header ? 'T. livre' : item.spare_time}</span>
                <span>{header ? 'Espaço' : item.space_to_explore}</span>
                <span>{header ? 'Treinável' : item.trainable}</span>
                <span>{header ? 'Fofura' : item.cuteness}</span>
            </button>
        </li>
    );
};
