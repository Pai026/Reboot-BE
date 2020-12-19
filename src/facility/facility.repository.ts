import { EntityRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from 'src/user/entities/User.entity';
import { Facility } from './entity/facility.entity';
import { UserRepository } from 'src/user/user.repository';
const ObjectId = require('mongodb').ObjectID;
import * as bcrypt from 'bcryptjs';
import { Patient } from './entity/patient.entity';
import { UserService } from 'src/user/user.service';

@EntityRepository(Facility)
export class FacilityRepository extends MongoRepository<Facility> {
  async createFacility(facilityregisterDto: any, id , userRepository: UserRepository): Promise<any> {
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
    const facility = new Facility();
    facility.userName = facilityName;
    facility.address = address;
    facility.state = state;
    facility.district = district;
    facility.facilityID = id;
    facility.localBody = localBody;
    facility.ward = ward;
    facility.contact = contact;
    facility.pincode = pincode;
    facility.oxygenCapacity = oxygenCapacity;
    facility.type = "facility";
    facility.latitude = latitude;
    facility.longitude = longitude;
    facility.bed = {};
    facility.doctors = {};
    facility.password = await bcrypt.hash(facilityName, 10);
    await this.save(facility);
    console.log(facility);

    return facility;
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

    const patient = new Patient();
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
      response.status='patient'
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
      user.status = 'patient'
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

async addBed(addbeddto: any, facility ): Promise<any> {
  const {
    bedType,
    totalCapacity,
    currentlyOccupied,
  } = addbeddto;
 
    console.log(facility)
   facility.bed["bedId"] = new ObjectID();
   facility.bed["bedType"] = bedType;
   facility.bed["currentlyOccupied"] = currentlyOccupied;
   await this.save(facility);
   return facility;
}


async addDoctor(adddoctordto: any, facility ): Promise<any> {
  const {
    specialisation,
    count,
  } = adddoctordto;
 
    console.log(facility)
   facility.doctors["specializationId"] = new ObjectID();
   facility.doctors["specialisation"] = specialisation;
   facility.doctors["count"] = count;
   await this.save(facility);
   return facility;
  
}
}
