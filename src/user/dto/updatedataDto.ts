// dtos/update-user.dto.ts
import { AtLeastOneField } from 'src/auth/atLeastOneField';
import { IsNotEmpty, IsOptional, IsString} from 'class-validator';

@AtLeastOneField(['email', 'name', 'phoneNo', 'address', 'age', 'city']) // 👈 ensures at least one property is present
export class UpdateUserDto {


    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    phoneNo?: string

    @IsString()
    @IsOptional()
    address?: string


    @IsString()
    @IsOptional()
    age?: string;

    @IsOptional()
    @IsString()
    city?: string;
}
