import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
    @ApiProperty({
        example: 'New business proposal',
        description: 'Application title',
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    title!: string;

    @ApiProperty({
        example: 'Description of the application',
        description: 'Detailed description',
    })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({
        example: '+77066362306',
        description: 'Contact phone number (unique)',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[1-9]\d{1,14}$/, {
        message: 'Phone number must be in valid international format',
    })
    contactPhone!: string;
}
