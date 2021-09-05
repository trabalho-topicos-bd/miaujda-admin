export interface PetFormData {
    name: string;
    species: number;
    breed: string;
    gender: number;
    age: number;
    size: number;
    castrated: boolean;
    adopted: boolean;
    images: string[] | File[];
}

export type PetFormUpdateData = {
    [key in keyof PetFormData]: PetFormData[key];
};

export interface PetData extends PetFormData {
    id: number;
}
