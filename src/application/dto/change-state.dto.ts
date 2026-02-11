import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationState } from '../enums/application-state.enum';

export class ChangeStateDto {
    @ApiProperty({
        enum: ApplicationState,
        example: ApplicationState.IN_PROGRESS,
        description: 'New state for the application',
    })
    @IsEnum(ApplicationState)
    state!: ApplicationState;
}
