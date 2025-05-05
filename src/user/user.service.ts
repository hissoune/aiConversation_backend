import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private usersRepository: Repository<User>,) {}

  create(createUserDto:any) {
    
    return this.usersRepository.save(createUserDto);
  }
  async login(createUserDto:any) {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findOneBy({ email, password });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

 async findAll() {
    const promises: Promise<User[]>[] = [];

     for (let i = 0; i < 100000; i++) {
      promises.push(this.usersRepository.find({where:{name:"2"}}));
     }
    return await Promise.all(promises)
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
  
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
  
    return this.usersRepository.save(user);
  }
  

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
