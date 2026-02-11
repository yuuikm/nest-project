import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ChangeStateDto } from './dto/change-state.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';
import { ApplicationState } from './enums/application-state.enum';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
    ) { }

    async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
        const existingApplication = await this.applicationRepository.findOne({
            where: { contactPhone: createApplicationDto.contactPhone },
        });

        if (existingApplication) {
            throw new ConflictException('Phone number already exists');
        }

        const application = this.applicationRepository.create({
            ...createApplicationDto,
            state: ApplicationState.NEW,
        });

        return this.applicationRepository.save(application);
    }

    async findAll(query: QueryApplicationsDto) {
        const { page = 1, limit = 10, state, search, sortBy = 'createdAt', sortOrder = 'DESC' } = query;

        const queryBuilder = this.applicationRepository.createQueryBuilder('application');

        if (state) {
            queryBuilder.andWhere('application.state = :state', { state });
        }

        if (search) {
            queryBuilder.andWhere(
                '(application.title ILIKE :search OR application.description ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        queryBuilder
            .orderBy(`application.${sortBy}`, sortOrder)
            .skip((page - 1) * limit)
            .take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string): Promise<Application> {
        const application = await this.applicationRepository.findOne({
            where: { id },
        });

        if (!application) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }

        return application;
    }

    async update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
        const application = await this.findOne(id);

        if (updateApplicationDto.contactPhone && updateApplicationDto.contactPhone !== application.contactPhone) {
            const existingApplication = await this.applicationRepository.findOne({
                where: { contactPhone: updateApplicationDto.contactPhone },
            });

            if (existingApplication) {
                throw new ConflictException('Phone number already exists');
            }
        }

        Object.assign(application, updateApplicationDto);

        return this.applicationRepository.save(application);
    }

    async changeState(id: string, changeStateDto: ChangeStateDto): Promise<Application> {
        const application = await this.findOne(id);

        if (application.state === changeStateDto.state) {
            throw new BadRequestException('New state cannot be the same as current state');
        }

        if (application.state === ApplicationState.WON || application.state === ApplicationState.LOST) {
            throw new BadRequestException('Cannot change state of a finalized application');
        }

        application.state = changeStateDto.state;

        return this.applicationRepository.save(application);
    }

    async remove(id: string): Promise<void> {
        const application = await this.findOne(id);
        await this.applicationRepository.remove(application);
    }
}
