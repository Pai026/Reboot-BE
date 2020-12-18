import { EntityRepository, MongoRepository } from 'typeorm';
import { Consultation } from './entities/Consultation.entity';


@EntityRepository(Consultation)
export class ConsultationRepository extends MongoRepository<Consultation> {}
