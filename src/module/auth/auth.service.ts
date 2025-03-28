import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import * as argon from 'argon2';
import { User } from 'src/interfaces/user.interface';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(signInDto: SignInDto) {
        const {email, password} = signInDto;
        const user = await this.userService.findOne(email);
        if (user && await argon.verify(user.password, password) ) {
            const {password, ...result} = user;
            return <User>result;
        }
        return null;
    }

    signIn(user: User) {
        const token = this.jwtService.sign({sub: user.id, role: user.role, email: user.email});
        return {access_token: token};
    }

    signUp(signUpDto: SignUpDto) {
        return this.userService.create(signUpDto);
    }

    async getUser(email: string) {
        return this.userService.findOne(email);
    }
}
