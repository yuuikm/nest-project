import { IsOptional, IsEnum, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationState } from '../enums/application-state.enum';

export class QueryApplicationsDto {
    @ApiPropertyOptional({ example: 1, description: 'Page num' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, description: 'Items per page' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({
        enum: ApplicationState,
        description: 'Filter by state',
    })
    @IsOptional()
    @IsEnum(ApplicationState)
    state?: ApplicationState;

    @ApiPropertyOptional({ example: 'proposal', description: 'Search in title and description' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        example: 'createdAt',
        description: 'Sort field',
        enum: ['createdAt', 'updatedAt', 'title'],
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        example: 'DESC',
        description: 'Sort direction',
        enum: ['ASC', 'DESC'],
    })
    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
