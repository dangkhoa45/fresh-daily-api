import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongodb';

export type UserDocument = Document & Users;

@Schema()
export class Users {
  @ApiProperty({ example: 'john_doe' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: 'password123' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'John' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: '1990-01-01' })
  @Prop({ required: true })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
