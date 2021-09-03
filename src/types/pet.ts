export interface PetFormData {
    name: string;
    species: number;
    breed: string;
    gender: number;
    age: number;
    adopted: boolean;
    images: string[];
}

export type PetFormUpdateData = {
    [key in keyof PetFormData]: PetFormData[key];
};

export interface PetData extends PetFormData {
    id: number;
}
