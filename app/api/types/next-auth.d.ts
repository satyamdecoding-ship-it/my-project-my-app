import 'next-auth'
import { DefaultSession } from 'next-auth';


declare module'next-auth'{
    interface User{
        _id?:string
        isVerified:boolean;
        isAcceptingMessages?:boolean;
        username?:string
    }
    interface Session{
        user:{
            _id?: string;
            isVerified: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
            name?: string | null;
            email?: string | null;
        } & DefaultSession['user']
    }
    declare module 'next-auth/jwt'{
        interface jwt{
        _id?:string
        isVerified:boolean;
        isAcceptingMessages?:boolean;
        username?:string
        }
    }
}