import React, { useCallback, useMemo } from 'react';
import { PetData } from '../../../../types/pet';
import { genders, sizes, species } from '../../../../utils/constants';

interface PetItemProps {
    item: PetData;
    isSelected?: boolean;
    setSelected?: React.Dispatch<React.SetStateAction<PetData | null>>;
    header?: boolean;
}

export const PetItem = (props: PetItemProps): JSX.Element => {
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
                <h4>{header ? 'Nome' : item.name}</h4>
                <span>
                    {header
                        ? 'Espécie'
                        : species.find((el) => el.value === item.species).label}
                </span>
                <span>{header ? 'Raça' : item.breed}</span>
                <span>
                    {header
                        ? 'Gênero'
                        : genders.find((el) => el.value === item.gender).label}
                </span>
                <span>{header ? 'Idade' : `${item.age} meses`}</span>
                <span>
                    {header
                        ? 'Porte'
                        : sizes.find((el) => el.value === item.size).label}
                </span>
                <span>
                    {header ? 'Castrado' : item.castrated ? 'SIM' : 'NÃO'}
                </span>
                <span>{header ? 'Adotado' : item.adopted ? 'SIM' : 'NÃO'}</span>
            </button>
        </li>
    );
};
