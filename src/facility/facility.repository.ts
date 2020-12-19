import { EntityRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from 'src/user/entities/User.entity';
import { Facility } from './entity/facility.entity';
import { UserRepository } from 'src/user/user.repository';
const ObjectId = require('mongodb').ObjectID;
import * as bcrypt from 'bcryptjs';
import { Patient } from './entity/patient.entity';

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
  
  async createPatient(patientregisterDto: any, id , userRepository: UserRepository): Promise<any> {
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
        patient.password = await bcrypt.hash(userName, 10);
        await userRepository.save(patient);
        console.log(patient);

        return patient;
    }
    else
    {
      user.status = 'patient'
      await userRepository.save(user);
    }
    
    patient.userName = userName;
    patient.address = address;
    patient.type = "user";
    patient.state = state;
    patient.district = district;
    patient.facilityID = id;
    patient.localBody = localBody;
    patient.ward = ward;
    patient.phoneNumber = contact;
    patient.diseaseStatus = diseaseStatus;
    patient.testType = testType;
    patient.dateofSample = dateofSample;
    patient.dateOfResult = dateOfResult;
    patient.dob = dob;
    patient.gender = gender;
    patient.bloodGroup = bloodGroup;
    patient.medicalHistory = medicalHistory;
    patient.nationality = nationality;
    patient.ongingMedication = ongingMedication;
    patient.NoOfAgedDependants = NoOfAgedDependants;
    patient.allergies = allergies;
    patient.travelHistory = travelHistory;
    patient.status = 'patient'
    
  
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

}
