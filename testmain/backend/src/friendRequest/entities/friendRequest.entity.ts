
import {User} from '../../user/entities/user.entity'


export class FriendRequest {
  requestpk: number ;
myid: number ;
friendid: number ;
friendname: string ;
response: string ;
friend?: User ;
}
