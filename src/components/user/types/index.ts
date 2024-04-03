import { IAddress, IUser } from '@/types/User';

export type UploadAddress = Omit<IAddress, '_id' | 'isPrimary' | 'isDefault'>;

export type UploadProfile = Pick<IUser, 'fullname' | 'email' | 'username' >;
