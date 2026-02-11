import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ChangeStateDto } from './dto/change-state.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new application' })
    @ApiResponse({ status: 201, description: 'Application created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 409, description: 'Phone number already exists' })
    create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationService.create(createApplicationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all applications with pagination and filters' })
    @ApiResponse({ status: 200, description: 'List of applications' })
    findAll(@Query() query: QueryApplicationsDto) {
        return this.applicationService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get application by ID' })
    @ApiParam({ name: 'id', description: 'Application UUID' })
    @ApiResponse({ status: 200, description: 'Application found' })
    @ApiResponse({ status: 404, description: 'Application not found' })
    findOne(@Param('id') id: string) {
        return this.applicationService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update application data' })
    @ApiParam({ name: 'id', description: 'Application UUID' })
    @ApiResponse({ status: 200, description: 'Application updated successfully' })
    @ApiResponse({ status: 404, description: 'Application not found' })
    @ApiResponse({ status: 409, description: 'Phone number already exists' })
    update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
        return this.applicationService.update(id, updateApplicationDto);
    }

    @Patch(':id/state')
    @ApiOperation({ summary: 'Change application state' })
    @ApiParam({ name: 'id', description: 'Application UUID' })
    @ApiResponse({ status: 200, description: 'State changed successfully' })
    @ApiResponse({ status: 400, description: 'Invalid state transition' })
    @ApiResponse({ status: 404, description: 'Application not found' })
    changeState(@Param('id') id: string, @Body() changeStateDto: ChangeStateDto) {
        return this.applicationService.changeState(id, changeStateDto);
    }
}
