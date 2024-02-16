import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length } from 'class-validator'

export class CreatePartcipantAuthDto {
    @ApiProperty({ example: 'publicId', description: 'The public id of sectret Santa event parcipant', required: true })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @Length(36)
    publicId: string;
}