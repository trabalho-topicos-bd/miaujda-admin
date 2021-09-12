import { PetData } from './pet';

export interface FeatureFormData {
    id_pet: number;
    experience: number;
    cost: number;
    love: number;
    peace: number;
    intelligence: number;
    loyalty: number;
    spare_time: number;
    space_to_explore: number;
    trainable: number;
    cuteness: number;
}

export type FeatureFormUpdateData = {
    [key in keyof FeatureFormData]: FeatureFormData[key];
};

export interface FeatureData extends Omit<FeatureFormData, 'id_pet'> {
    id: number;
    pet: PetData;
}
