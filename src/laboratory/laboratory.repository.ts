import { EntityRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from 'src/user/entities/User.entity';
import { UserRepository } from 'src/user/user.repository';
const ObjectId = require('mongodb').ObjectID;
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { Laboratory } from './entity/laboratory.entity';

@EntityRepository(Laboratory)
export class LaboratoryRepository extends MongoRepository<Laboratory> {
  async createLaboratory(facilityregisterDto: any, id , userRepository: UserRepository): Promise<any> {
    const {
        facilityType,
        facilityName,
      address,
      state,
      district,
      localBody,
      ward,
      contact,
      pincode,
      oxygenCapacity,
      latitude,
      longitude,
      bed,
      doctors
    } = facilityregisterDto;
    console.log(facilityName)
    const laboratory = new Laboratory();
    laboratory.userName = facilityName;
    laboratory.address = address;
    laboratory.state = state;
    laboratory.district = district;
    laboratory.laboratoryID = id;
    laboratory.localBody = localBody;
    laboratory.ward = ward;
    laboratory.contact = contact;
    laboratory.pincode = pincode;
    laboratory.oxygenCapacity = oxygenCapacity;
    laboratory.type = "laboratory";
    laboratory.latitude = latitude;
    laboratory.longitude = longitude;
    laboratory.bed = {};
    laboratory.doctors = {};
    laboratory.password = await bcrypt.hash(facilityName, 10);
    await this.save(laboratory);
    console.log(laboratory);

    return laboratory;
  }
  
  async createPatient(patientregisterDto: any, id , userRepository: UserRepository, userService:UserService): Promise<any> {
    const {
       
      userName,
      address,
      diseaseStatus,
      testType,
      dateofSample,
      dateOfResult,
      dob,
      gender,
      nationality,
      bloodGroup,
      medicalHistory,
      ongingMedication,
      NoOfAgedDependants,
      allergies,
      travelHistory,
      state,
      district,
      localBody,
      ward,
      contact,
      
   
    } = patientregisterDto;

    const user = await userRepository.findOne({ phoneNumber:contact,dob:dob})
    if(!user)
    {
      const data={
        'userName':userName,
        'dob':dob,
        'password':userName,
        'confirm':userName,
        'phoneNumber':contact,
        'state':state,
        'district':district,
        'ward':ward,
        'localBody':localBody,
        'address':address
      }
      const response = await userService.register(data)
      response.status='positive'
      if(response.success==true)
      {
        
       const curuser =  response.data
        curuser["patientHistory"]=
        {
          "diseaseStatus" : diseaseStatus,
          "testType" : testType,
          "dateofSample": dateofSample,
          "facilityId": id,

          "dateOfResult": dateOfResult,
          "dob": dob,
          "gender": gender,
          "bloodGroup": bloodGroup,
          "medicalHistory": medicalHistory,
          "nationality": nationality,
          "ongingMedication": ongingMedication,
          "NoOfAgedDependants": NoOfAgedDependants,
          "allergies": allergies,
          "travelHistory": travelHistory,
        }
        await userRepository.save(curuser);
        return curuser
      }
    }
    else
    {
      user.status = 'positive'
      user["patientHistory"]=
      {
        "diseaseStatus" : diseaseStatus,
          "testType" : testType,
          "dateofSample": dateofSample,
          "dateOfResult": dateOfResult,
          "dob": dob,
          "facilityId": id,
          "gender": gender,
          "bloodGroup": bloodGroup,
          "medicalHistory": medicalHistory,
          "nationality": nationality,
          "ongingMedication": ongingMedication,
          "NoOfAgedDependants": NoOfAgedDependants,
          "allergies": allergies,
          "travelHistory": travelHistory,
      }
      await userRepository.save(user);
      return user
    }
}

async addBed(addbeddto: any, laboratory ): Promise<any> {
  const {
    bedType,
    totalCapacity,
    currentlyOccupied,
  } = addbeddto;
 
    console.log(laboratory)
   laboratory.bed["bedId"] = new ObjectID();
   laboratory.bed["bedType"] = bedType;
   laboratory.bed["currentlyOccupied"] = currentlyOccupied;
   await this.save(laboratory);
   return laboratory;
}


async addDoctor(adddoctordto: any, laboratory ): Promise<any> {
  const {
    specialisation,
    count,
  } = adddoctordto;
 
    console.log(laboratory)
   laboratory.doctors["specializationId"] = new ObjectID();
   laboratory.doctors["specialisation"] = specialisation;
   laboratory.doctors["count"] = count;
   await this.save(laboratory);
   return laboratory;
  
}
}
