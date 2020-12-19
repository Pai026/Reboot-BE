import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationRepository } from './consultation.repository';
import { UpdateConsultationDto } from './dto';
const ObjectId = require('mongodb').ObjectID;



@Injectable()
export class ConsultationService {
    private logger = new Logger()

    constructor(
        @InjectRepository(ConsultationRepository)
        private readonly consultationRepository:ConsultationRepository,

    ){}

    async createConsultation(data:any):Promise<any>{
        const newConsultation = await this.consultationRepository.save(data);
        const { ...result } = newConsultation;
        return {
          success: true,
          message: 'Success',
          data: result,
        };
    }


    async getUserConsultations(user:any):Promise<any>{
        console.log(user.id)
        const consultation = await this.consultationRepository.find({patientId:user.id})
        console.log(consultation)
        if(consultation.length>0)
        {
            return consultation
        }
        else
        {
            return "No consultation"
        }
    }

    async getSpecificUserConsultations(id:any):Promise<any>{
        const consultation = await this.consultationRepository.findOne(ObjectId(id))
        if(consultation)
        {
            return consultation
        }
        else
        {
            return 'No Such Consultation'
        }
    }


    async updateConsultation(id:any,data:UpdateConsultationDto):Promise<any>{
        const consultation = await this.consultationRepository.findOne(ObjectId(id))
        if(data.symptom){
            consultation.symptom=data.symptom
        }
        if(data.advice){
            consultation.advice = data.advice
        }
        if(data.category){
            consultation.category = data.category
        }
        if(data.examinationDetail){
            consultation.examinationDetail = data.examinationDetail
        }
        if(data.prescription){
            consultation.prescription = data.prescription
        }
        if(data.treatmentSummary){
            consultation.treatmentSummary=data.treatmentSummary
        }
        if(data.decision){
            consultation.decision=data.decision
        }
        if(data.verifiedBy){
            consultation.verifiedBy = data.verifiedBy
        }
        await this.consultationRepository.save(consultation)
        return {
            success:true,
            message:'updated form'
        }
    }
    async retrieveConsultation():Promise<any>{
        const consultations = await this.consultationRepository.find()
        if(consultations.length>0){
            return {
                sucess:"true",
                message:"Retrieved Consulation",
                data:consultations
            }
        }
        else{
            return {
                success:false,
                message:'No consulation to be retrieved'
            }
        }
    }
}
