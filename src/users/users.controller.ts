import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUsers = await this.usersService.createUser(createUserDto);

      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'User has been created successfully', newUsers });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAllUser(@Res() response) {
    try {
      const UserData = await this.usersService.findAllUsers();
      return response
        .status(HttpStatus.OK)
        .json({ message: 'All User data found successfully', UserData });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findUserById(@Res() response, @Param('id') id: string) {
    try {
      const existingUser = await this.usersService.findUserById(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User found successfully', existingUser });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put(':id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(
        id,
        updateUserDto,
      );
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User has been successfully update', existingUser });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async removeUser(@Res() response, @Param('id') id: string) {
    try {
      const existingUser = await this.usersService.removeUser(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User delete successfully', existingUser });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
