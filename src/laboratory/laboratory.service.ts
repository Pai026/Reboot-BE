import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { LaboratoryRepository } from './laboratory.repository';
const ObjectId = require('mongodb').ObjectID;
import * as bcrypt from 'bcryptjs';


@Injectable()
export class LaboratoryService {
    private logger = new Logger('Laboratory Service');
   
    constructor(
      
      @InjectRepository(LaboratoryRepository)
      @InjectRepository(UserRepository)
      private readonly laboratoryRepository: LaboratoryRepository,
      private readonly userRepository: UserRepository,
      private readonly userService:UserService,
      private readonly jwtService: JwtService,
      ) {}
  
    async getAllFacility(): Promise<any> {
      const facility = await this.laboratoryRepository.find();
      return facility;
    }
  
    
    /* async getRestaurant(user: User): Promise<any> {
      if (await this.validateUser(user)) {
        const restaurant = await this.restaurantRepository.find({
          ownerID: user.id,
        });
        if (restaurant) {
          const ActiveRestaurants = restaurant.filter(
            obj => obj.status === 'ACTIVE',
          );
          const { ...results } = ActiveRestaurants;
          return {
            success: true,
            message: 'restaurants retrieved',
            data: results,
          };
        } else {
          return {
            success: false,
            message: 'No restaurants exist',
          };
        }
      } else {
        throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  
    async getRestaurantById(user: User, id): Promise<any> {
      try {
        const restaurant = await this.restaurantRepository.findOne(ObjectId(id));
        if (restaurant.status === 'ACTIVE') {
          return restaurant;
        } else {
          throw new NotFoundException('No Such Restaurant');
        }
      } catch (e) {}
    } */
  
    async addLaboratory(data: any, user: User ): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
        //  console.log(user.id);

        if (user) {
          // console.log(user.id);
          data.facilityID = user.id;
          return this.laboratoryRepository.createLaboratory(data, user.id ,  this.userRepository);
        } else {
          throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
        }
      } catch (e) {
        return e;
      }
    }

    async addbed(data: any, user: User, id): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
         console.log(ObjectId(id))
        //  console.log(user.id);
        const facility = await this.laboratoryRepository.findOne(ObjectId(id));
        console.log(facility)
        if (facility) {
          
          return this.laboratoryRepository.addBed(data, facility );
        } else {
          throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
        }
      } catch (e) {
        return e;
      }
    }

    async addOximeter(data: any, user: User, id): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
         console.log(ObjectId(id))
        //  console.log(user.id);
        const facility = await this.laboratoryRepository.findOne(ObjectId(user.id));
        console.log(facility)
        if (facility) {
          
          return this.laboratoryRepository.addBed(data, facility );
        } else {
          throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
        }
      } catch (e) {
        return e;
      }
    }

    async adddoctor(data: any, user: User, id): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
         console.log(ObjectId(id))
        //  console.log(user.id);
        const facility = await this.laboratoryRepository.findOne(ObjectId(id));
        console.log(facility)
        if (facility) {
          
          return this.laboratoryRepository.addDoctor(data, facility );
        } else {
          throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
        }
      } catch (e) {
        return e;
      }
    }
  
    async addpatient(data: any, user: User ,  id): Promise<any> {
        try {
          // console.log(user);
           console.log(data);
          //  console.log(user.id);
  
          if (user) {
            // console.log(user.id);
           
            return this.laboratoryRepository.createPatient(data, id, this.userRepository,this.userService);
          } else {
            throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
          }
        } catch (e) {
          return e;
        }
      }
    
    async getFacilityById(user: User, id): Promise<any> {
        try {
          const facility = await this.laboratoryRepository.findOne(ObjectId(id));
          if (facility) {
            return facility;
          } else {
            throw new NotFoundException('No Such facility');
          }
        } catch (e) {}
      }
   
      async getPatientById(user: User, id): Promise<any> {
        try {
          const patient = await this.userRepository.findOne(ObjectId(id));
          if (patient) {
            return patient;
          } else {
            throw new NotFoundException('No Such Patient');
          }
        } catch (e) {}
      }

      async validateUser(userName: string, password: string): Promise<any> {
        try {
          console.log(userName)
          const user = await this.laboratoryRepository.findOne({
            userName
          });
          console.log(user);
          if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
              return user;
            } else {
              return null;
            }
          }
        } catch (e) {
          console.log(e);
          return {
            success: false,
            message: 'Something went wrong..! Login failed.',
          };
        }
      }

    async login(data:any)
    {
        const user = await this.validateUser(data.userName, data.password);
        console.log(user)
        if (user) {
          const { userName, id, type } = user;
          const payload = { userName, id, type  };
          return {
            success: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
          };
        } else {
          throw new UnauthorizedException({
            detail: 'invalid username or password',
          });
        }
      }
    
    async getUserByMobile(num:number):Promise<any>{
      console.log(num)
      const user = await this.userRepository.findOne({phoneNumber:num})
      console.log(user)
      if(user) {
        return user
      }
      else
      {
        throw new NotFoundException({detail:"User with this mobile number not found"})
      }

    }

}
