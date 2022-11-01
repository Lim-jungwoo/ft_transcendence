





export class CreateUserDto {
  id: number;
email: string;
username: string;
nickname: string;
avatar?: string;
tfacode?: string;
tfatime?: Date;
lasttokentime?: Date;
rtoken?: string;
}
