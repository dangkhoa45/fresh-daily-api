import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, Users } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const createUser = await new this.userModel(createUserDto);

    return createUser.save();
  }

  async findAllUsers(): Promise<Users[]> {
    const UserData = await this.userModel.find().exec();
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }

  async findUserById(id: string): Promise<Users> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found `);
    }
    return existingUser;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    // if (!existingUser) {
    //   throw new NotFoundException(`User #${email} not found `);
    // }
    return existingUser;
  }

  async removeUser(id: string) {
    const existingUser = await this.userModel.findByIdAndRemove(id);
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }
}
