
import {History} from '../../history/entities/history.entity'
import {FriendRequest} from '../../friendRequest/entities/friendRequest.entity'


export class User {
  id: number ;
email: string ;
username: string ;
nickname: string ;
avatar: string  | null;
tfa: boolean ;
tfacode: string  | null;
tfatime: Date  | null;
lasttokentime: Date  | null;
rtoken: string  | null;
historys?: History[] ;
status: string ;
friends?: User[] ;
friendsrelation?: User[] ;
friendsrequests?: FriendRequest[] ;
}
