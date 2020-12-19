import {
    Injectable,
    Logger,
    UnauthorizedException,
    HttpException,
    HttpStatus,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { UserRepository } from 'src/user/user.repository';
  import { User } from 'src/user/entities/User.entity';
  import { ObjectID } from 'typeorm';
  import { IsMongoId } from 'class-validator';
import { FacilityRepository } from './facility.repository';
import { UserService } from 'src/user/user.service';
  const ObjectId = require('mongodb').ObjectID;
  import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { addPulseMonitorDto } from './dto/addPulseMonitoring';


  @Injectable()
  export class FacilityService {
    private logger = new Logger('Facility Service');
   
    constructor(
      
      @InjectRepository(FacilityRepository)
      @InjectRepository(UserRepository)
      private readonly facilityRepository: FacilityRepository,
      private readonly userRepository: UserRepository,
      private readonly userService:UserService,
      private readonly jwtService: JwtService,
      ) {}
  
    async getAllFacility(): Promise<any> {
      const facility = await this.facilityRepository.find();
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
  
    async addfacility(data: any, user: User ): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
        //  console.log(user.id);

        if (user) {
          // console.log(user.id);
          data.facilityID = user.id;
          return this.facilityRepository.createFacility(data, user.id ,  this.userRepository);
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
        const facility = await this.facilityRepository.findOne(ObjectId(id));
        console.log(facility)
        if (facility) {
          
          return this.facilityRepository.addBed(data, facility );
        } else {
          throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
        }
      } catch (e) {
        return e;
      }
    }

    async addOximeter(data: addPulseMonitorDto, user: User, id): Promise<any> {
      try {
        // console.log(user);
         console.log(data);
         console.log(ObjectId(id))
        //  console.log(user.id);
        const facility = await this.facilityRepository.findOne({id:ObjectId(user.id),type:'facility'});
        console.log(facility)
        if (facility) {
          const user= await this.userRepository.findOne(ObjectId(id))
          user["spo2"]=data.spo2
          user["pulseRate"]=data.pulseRate
          await this.userRepository.save(user)
          return {
            success:true,
            message:"entered details"
          }
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
        const facility = await this.facilityRepository.findOne(ObjectId(id));
        console.log(facility)
        if (facility) {
          
          return this.facilityRepository.addDoctor(data, facility );
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
           
            return this.facilityRepository.createPatient(data, id, this.userRepository,this.userService);
          } else {
            throw new HttpException('Action Forbidden', HttpStatus.FORBIDDEN);
          }
        } catch (e) {
          return e;
        }
      }
    
    async getFacilityById(user: User, id): Promise<any> {
        try {
          const facility = await this.facilityRepository.findOne(ObjectId(id));
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
          const user = await this.facilityRepository.findOne({
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
    }
  