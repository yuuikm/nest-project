import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { ApplicationState } from '../enums/application-state.enum';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    @Index()
    contactPhone!: string;

    @Column({
        type: 'enum',
        enum: ApplicationState,
        default: ApplicationState.NEW,
    })
    @Index()
    state!: ApplicationState;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
